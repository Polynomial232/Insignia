import { Body, ClassSerializerInterceptor, Controller, Get, HttpStatus, Post, Request, Res, UseGuards, UseInterceptors, ValidationPipe } from "@nestjs/common";
import { TransferService } from "./Transfer.service";
import { Transfer } from "@prisma/client";
import { ApiResponseDto } from "src/common/common.response";
import { apiResponse } from "src/common/common.controller";
import { TransferResponse, TransferTopUsersResponse } from "./Transfer.response";
import { AuthService } from "src/auth/auth.service";
import { Response } from "express";
import { CreateTransfer } from "./transfer.dto";

@Controller('transfer')
export class TransferController {
    constructor(private readonly TransferService: TransferService) {}

    @UseGuards(AuthService)
    @UseInterceptors(ClassSerializerInterceptor)
    @Post()
    async createTransfer(@Request() request, @Body(new ValidationPipe()) postData: CreateTransfer[], @Res({ passthrough: true }) response: Response): Promise<ApiResponseDto<TransferResponse[]>> {
        try{
            const userTransfers: Transfer[] = await this.TransferService.createTransfers(request.user, postData)
            const data: TransferResponse[] = userTransfers.map(userTransfer => new TransferResponse(userTransfer))

            return apiResponse(HttpStatus.OK, 'success transfer', data)
        } catch (error) {
            console.log(error);
            response.status(HttpStatus.INTERNAL_SERVER_ERROR)
            return apiResponse(HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    @UseGuards(AuthService)
    @UseInterceptors(ClassSerializerInterceptor)
    @Get('top_transactions_per_user')
    async getTopTransactionUser(@Request() request, @Res({ passthrough: true }) response: Response): Promise<ApiResponseDto<TransferResponse[]>> {
        try{
            const userTransfers: Transfer[] = await this.TransferService.getAllTransfer(request.user.id, { amount: 'desc' }, 1)
            const data: TransferResponse[] = userTransfers.map(userTransfer => new TransferResponse({
                userId: request.user.id,
                ...userTransfer,
            }))

            return apiResponse(HttpStatus.OK, 'success get top transaction user', data)
        } catch (error) {
            console.log(error);
            response.status(HttpStatus.INTERNAL_SERVER_ERROR)
            return apiResponse(HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    @UseGuards(AuthService)
    @UseInterceptors(ClassSerializerInterceptor)
    @Get('top_users')
    async getTopUsers(@Request() request, @Res({ passthrough: true }) response: Response): Promise<ApiResponseDto<TransferTopUsersResponse[]>> {
        try{
            const topUsers: Transfer[] = await this.TransferService.getTransferTopUsers(request.user.id)
            const data: TransferTopUsersResponse[] = topUsers.map(transfer => new TransferTopUsersResponse(transfer))

            return apiResponse(HttpStatus.OK, 'success get user top transaction', data)
        } catch (error) {
            console.log(error);
            response.status(HttpStatus.INTERNAL_SERVER_ERROR)
            return apiResponse(HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}