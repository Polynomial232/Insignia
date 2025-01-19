import { Injectable, NotFoundException } from "@nestjs/common";
import { Transfer, User } from "@prisma/client";
import { PrismaService } from "src/prisma.service";
import { CreateTransfer } from "./transfer.dto";

@Injectable()
export class TransferService {
  constructor(private prisma: PrismaService) {}

  async getAllTransfer(userId: number, orderBy: any, page: number): Promise<Transfer[]> {
    const skip: number = (page - 1) * 10
    const take: number = 10

    return this.prisma.transfer.findMany({
      orderBy: orderBy,
      where: {
        OR: [
          { fromUserId: Number(userId) },
          { toUserId: Number(userId) }
        ]
      },
      include: {
        fromUser: {
          select: { username: true }
        },
        toUser: {
          select: { username: true }
        }
      },
      skip: skip,
      take: take
    })
  }

  async createTransfers(user: User, postData: CreateTransfer[]): Promise<Transfer[]> {
    const dateNow = new Date()

    return Promise.all(
      postData.map(async (post: CreateTransfer) => {
        const toUser: User = await this.prisma.user.findUnique({
          where: { username:String(post.username) }
        })
    
        const data = {
          fromUserId: Number(user.id),
          toUserId: Number(toUser.id),
          amount: Number(post.amount),
        }
    
        const createTransfer: Transfer = await this.prisma.transfer.create({ data })

        const updateTransfer: Transfer = await this.prisma.transfer.update({
          where: { id: Number(createTransfer.id) },
          data: { transferCode: String(`TRF${dateNow.getDate()}${String(createTransfer.id).padStart(4, '0')}`) },
          include: {
            fromUser: {
              select: { username: true } 
            },
            toUser: {
              select: { username: true } 
            }
          }
        })

        const currentUserBalance = await this.prisma.user.findUnique({
          where: { id: Number(user.id) },
          select: { balance: true }
        })

        const updateBalance: User = await this.prisma.user.update({
          where: { id: Number(user.id) },
          data: { balance: Number(currentUserBalance.balance - createTransfer.amount) }
        })

        const currentTargetUserBalance = await this.prisma.user.findUnique({
          where: { id: Number(toUser.id) },
          select: { balance: true }
        })

        const updateTargetBalance: User = await this.prisma.user.update({
          where: { id: Number(toUser.id) },
          data: { balance: Number(currentTargetUserBalance.balance + createTransfer.amount) }
        })

        return updateTransfer
      }))
  }

  async getTransferTopUsers(userId: number): Promise<any> {
    const groupedUsers = await this.prisma.transfer.groupBy({
      by: ['toUserId'],
      where: {
        OR: [
          { fromUserId: Number(userId) },
          { toUserId: Number(userId) }
        ]
      },
      _sum: { amount: true },
      orderBy: {
          _sum: { amount: 'desc' }
      },
    })

    return Promise.all(
      groupedUsers.map(async (group) => {
        const user = await this.prisma.user.findUnique({
          where: { id: Number(group.toUserId) },
          select: { username: true },
        });
    
        return {
          toUserId: group.toUserId,
          toUser: { username: user.username },
          amount: group._sum.amount,
        };
      })
    );
  }
}