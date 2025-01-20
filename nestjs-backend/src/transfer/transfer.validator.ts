import { Injectable, NotFoundException } from "@nestjs/common";
import { Transfer, User } from "@prisma/client";
import { PrismaService } from "src/prisma.service";
import { CreateTransfer } from "./transfer.dto";
import { Validator } from "src/common/common.response";

@Injectable()
export class TransferValidator {
  constructor(private prisma: PrismaService) {}

  async createTransferValidator(user: User, postData: CreateTransfer[]): Promise<Validator> {
    const userData: User = await this.prisma.user.findUnique({
        where: { id: Number(user.id) }
    })
    const balance: number = userData.balance
    const sumTransferAmount: number = postData.reduce((n, {amount}) => n + amount, 0)

    if(sumTransferAmount > balance){
        return {
            status: false,
            statusCode: 400,
            message: 'Insufficient balance'
        }
    }

    const targetUsernames: Array<string> = Object.values(postData).map((val) => { return val.username })

    const targetUsers = await this.prisma.user.findMany({
        where: {
            username: { in: targetUsernames }
        },
        select: { username: true }
    })

    const existsUsernames: Array<string> = targetUsers.map(({ username }) => { return username })
    const usernameDifference: Array<string> = targetUsernames.filter(x => !existsUsernames.includes(x));

    if(usernameDifference.length > 0){
        return {
            status: false,
            statusCode: 404,
            message: 'Destination user not found for username: ' + usernameDifference.toString()
        }        
    }

    return {
        status: true,
        statusCode: 200,
        message: ''
    }
  }
}