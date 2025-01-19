import { Body, ClassSerializerInterceptor, Controller, Get, HttpStatus, Post, Request, Res, UseGuards, UseInterceptors, ValidationPipe } from "@nestjs/common";
import { User } from "@prisma/client";
import { Response } from "express";
import { apiResponse } from "src/common/common.controller";
import { UserService } from "./user.service";
import { UserApiTokenResponse, UserBalanceResponse, UserResponse } from "./user.response";
import { ApiResponseDto } from "src/common/common.response";
import { AuthService } from "src/auth/auth.service";
import { UserLogin, UserTopupBalance } from "./user.dto";

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @UseInterceptors(ClassSerializerInterceptor)
    @Post('regsiter')
    async registerUser(@Body() postData: User, @Res({ passthrough: true }) response: Response): Promise<ApiResponseDto<UserResponse>> {
        try {
            const user: User = await this.userService.registerUser(postData)
    
            const data: UserResponse = new UserResponse(user)
            return apiResponse(HttpStatus.OK, 'success register user', data)
        } catch (error) {
            console.log(error);
            response.status(HttpStatus.INTERNAL_SERVER_ERROR)
            return apiResponse(HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    @UseInterceptors(ClassSerializerInterceptor)
    @Post('login')
    async loginUser(@Body() postData: UserLogin, @Res({ passthrough: true }) response: Response): Promise<ApiResponseDto<UserApiTokenResponse>> {
        try {
            const user: User = await this.userService.loginUser(postData.username, postData.password)
    
            const data: UserApiTokenResponse = new UserApiTokenResponse(user)
            return apiResponse(HttpStatus.OK, 'success login user', data)
        } catch (error) {
            console.log(error);
            response.status(HttpStatus.INTERNAL_SERVER_ERROR)
            return apiResponse(HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    @UseGuards(AuthService)
    @UseInterceptors(ClassSerializerInterceptor)
    @Get('balance')
    async getUserBalance(@Request() request, @Res({ passthrough: true }) response: Response): Promise<ApiResponseDto<UserBalanceResponse>> {
        try{
            const user: User = await this.userService.getUser(request.user.id)
            const data: UserBalanceResponse = new UserBalanceResponse(user)

            return apiResponse(HttpStatus.OK, 'success user balance', data)
        } catch (error) {
            console.log(error);
            response.status(HttpStatus.INTERNAL_SERVER_ERROR)
            return apiResponse(HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    @UseGuards(AuthService)
    @UseInterceptors(ClassSerializerInterceptor)
    @Post('balance')
    async postUserTopupBalance(@Body(new ValidationPipe) postData: UserTopupBalance, @Request() request, @Res({ passthrough: true }) response: Response): Promise<ApiResponseDto<UserBalanceResponse>> {
        try{
            const user: User = await this.userService.userTopupBalance(request.user.id, postData.amount)
            const data: UserBalanceResponse = new UserBalanceResponse(user)

            return apiResponse(HttpStatus.OK, 'success topup balance', data)
        } catch (error) {
            console.log(error);
            response.status(HttpStatus.INTERNAL_SERVER_ERROR)
            return apiResponse(HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}