import { PrismaService } from "src/prisma.service";
import { User } from "./user.model"
import { Injectable } from "@nestjs/common";
import { Validator } from "src/common/common.response";
import { UserLogin } from "./user.dto";
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserValidator {
  constructor(private prisma: PrismaService) {}

  async registerUserValidator(data: User): Promise<Validator> {
    const validateUsername: User = await this.prisma.user.findUnique({
      where: { username: String(data.username) }
    })

    if(validateUsername){
      return {
        status: false,
        statusCode: 409,
        message: 'Username already exists'
      }
    }

    return {
      status: true,
      statusCode: 200,
      message: ''
    }
  }

  async loginUserValidator(data: UserLogin): Promise<Validator> {
    const user: User = await this.prisma.user.findUnique({
      where: { username: String(data.username) }
    })
  
    if(!user){
      return {
        status: false,
        statusCode: 404,
        message: 'Login Failed Please Check'
      }
    }

    const isMatch: boolean = await bcrypt.compare(data.password, user.password)

    if(!isMatch){
      return {
        status: false,
        statusCode: 404,
        message: 'Login Failed Please Check'
      }
    }

    return {
      status: true,
      statusCode: 200,
      message: ''
    }
  }
}