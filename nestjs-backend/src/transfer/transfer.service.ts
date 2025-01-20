import { Injectable, NotFoundException } from "@nestjs/common";
import { Transfer, User } from "@prisma/client";
import { PrismaService } from "src/prisma.service";
import { CreateTransfer } from "./transfer.dto";
import { Pagination } from "src/common/common.response";

@Injectable()
export class TransferService {
  constructor(private prisma: PrismaService) {}

  async getAllTransfer(userId: number, page: number, queryFilters:any): Promise<Transfer[]> {
    const skip: number = (page - 1) * 10
    const take: number = 10

    return this.prisma.transfer.findMany({
      where: {
        AND: [
          { ...queryFilters },
          {
            OR: [
              { fromUserId: Number(userId) },
              { toUserId: Number(userId) }
            ]
          },
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
      orderBy: { createdAt: 'desc' },
      skip: skip,
      take: take
    })
  }

  async getAllTransferPagination(userId: number, page: number, queryFilters:any): Promise<Pagination> {
    const countTransfer: number = await this.prisma.transfer.count({
      where: {
        AND: [
          { ...queryFilters },
          {
            OR: [
              { fromUserId: Number(userId) },
              { toUserId: Number(userId) }
            ]
          },
        ]
      },
    })

    return {
      page: Number(page),
      totalPage: Math.ceil(countTransfer / 10)
    }
  }
  
  async getTopTransferUser(userId: number, page: number): Promise<Transfer[]> {
    const skip: number = (page - 1) * 10
    const take: number = 10

    const transferCredit: Transfer[] = await this.prisma.transfer.findMany({
      where: { fromUserId: userId },
      include: {
        fromUser: {
          select: { username: true }
        },
        toUser: {
          select: { username: true }
        }
      },
      orderBy: { amount: 'desc' },
      skip: skip,
      take: take,
    })
  
    if(transferCredit.length < take){
      let debitSkip: number = 0

      if(transferCredit.length === 0){
        const transferCreditNum: number = await this.prisma.transfer.count({
          where: { fromUserId: userId }
        })

        debitSkip = skip - transferCreditNum
      }

      const debitTake: number = 10 - transferCredit.length

      const transferDebit: Transfer[] = await this.prisma.transfer.findMany({
        where: { toUserId: userId },
        include: {
          fromUser: {
            select: { username: true }
          },
          toUser: {
            select: { username: true }
          }
        },
        orderBy: { amount: 'asc' },
        skip: debitSkip,
        take: debitTake,
      })

      return transferCredit.concat(transferDebit)
    }

    return transferCredit
  }

  async createTransfers(user: User, postData: CreateTransfer[]): Promise<Transfer[]> {
    const dateNow = new Date()

    const transferProcess: Transfer[] = await Promise.all(
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

        const currentTargetUserBalance = await this.prisma.user.findUnique({
          where: { id: Number(toUser.id) },
          select: { balance: true }
        })

        const updateTargetBalance: User = await this.prisma.user.update({
          where: { id: Number(toUser.id) },
          data: { balance: Number(currentTargetUserBalance.balance + createTransfer.amount) }
        })

        return updateTransfer
      })
    )
  
    const currentUserBalance = await this.prisma.user.findUnique({
      where: { id: Number(user.id) },
      select: { balance: true }
    })

    const sumTransferAmount: number = transferProcess.reduce((n, {amount}) => n + amount, 0)
    const updateBalance: User = await this.prisma.user.update({
      where: { id: Number(user.id) },
      data: { balance: Number(currentUserBalance.balance - sumTransferAmount) }
    })

    return transferProcess
  }

  async getTransferTopUsers(userId: number): Promise<any> {
    // Return the list of top 10 users by value of transfers.
    // The transfer value should consider only outbound transfers done by a *particular user* (debits).
    // The transfer value per user should be the total aggregated value.

    const groupedUsers = await this.prisma.transfer.groupBy({
      by: ['fromUserId'],
      where: { toUserId: Number(userId) },
      _sum: { amount: true },
      orderBy: {
          _sum: { amount: 'desc' }
      },
      take: 10,
    })

    return Promise.all(
      groupedUsers.map(async (group) => {
        const user = await this.prisma.user.findUnique({
          where: { id: Number(group.fromUserId) },
          select: { username: true },
        });
    
        return {
          fromUserId: group.fromUserId,
          fromUser: { username: user.username },
          amount: group._sum.amount,
        };
      })
    );
  }
}