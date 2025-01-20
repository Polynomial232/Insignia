import { Body, ClassSerializerInterceptor, Controller, Get, HttpStatus, Param, Post, Query, Request, Res, UseGuards, UseInterceptors, ValidationPipe } from "@nestjs/common";
import { TransferService } from "./Transfer.service";
import { Transfer } from "@prisma/client";
import { ApiResponseDto, Pagination, Validator } from "src/common/common.response";
import { apiResponse } from "src/common/common.controller";
import { TransferResponse, TransferTopUsersResponse } from "./Transfer.response";
import { AuthService } from "src/auth/auth.service";
import { Response } from "express";
import { CreateTransfer, TransactionDto } from "./transfer.dto";
import { TransferValidator } from "./transfer.validator";
import { transferQueryFilter } from "./transfer.utils";

@Controller('transfer')
export class TransferController {
    constructor(private readonly TransferService: TransferService, private readonly transferValidator: TransferValidator) {}

    @UseGuards(AuthService)
    @UseInterceptors(ClassSerializerInterceptor)
    @Post()
    async createTransfer(@Request() request, @Body(new ValidationPipe()) postData: CreateTransfer[], @Res({ passthrough: true }) response: Response): Promise<ApiResponseDto<TransferResponse[]>> {
        try{
            const validate: Validator = await this.transferValidator.createTransferValidator(request.user, postData)

            if(!validate.status) return apiResponse(validate.statusCode, validate.message)

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
            const userTransfers: Transfer[] = await this.TransferService.getTopTransferUser(request.user.id, 1)
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

    @UseGuards(AuthService)
    @UseInterceptors(ClassSerializerInterceptor)
    @Get('transaction')
    async getTransaction(@Request() request, @Query() queryParam: TransactionDto, @Res({ passthrough: true }) response: Response): Promise<ApiResponseDto<TransferResponse[]>> {
        try{
            const queryFilters = transferQueryFilter(queryParam)
            const userTransfers: Transfer[] = await this.TransferService.getAllTransfer(request.user.id, queryParam.page, queryFilters)
            const pagination: Pagination = await this.TransferService.getAllTransferPagination(request.user.id, queryParam.page, queryFilters)
            const data: TransferResponse[] = userTransfers.map(userTransfer => new TransferResponse({
                userId: request.user.id,
                ...userTransfer,
            }))

            return apiResponse(HttpStatus.OK, 'success get top transaction user', data, pagination)
        } catch (error) {
            console.log(error);
            response.status(HttpStatus.INTERNAL_SERVER_ERROR)
            return apiResponse(HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}