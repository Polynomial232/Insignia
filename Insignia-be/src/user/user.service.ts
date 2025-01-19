import { PrismaService } from "src/prisma.service";
import { User } from "./user.model"
import { Injectable } from "@nestjs/common";
import { v4 as uuidv4 } from "uuid";

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async registerUser(data: User): Promise<User> {
    const apiToken: string = uuidv4();

    return this.prisma.user.create({
      data: {
        ...data,
        apiToken: String(apiToken)
      },
    })
  }

  async loginUser(username: string, password: string): Promise<User> {
    return this.prisma.user.findUnique({
      where: {
        username: String(username),
        password: String(password),
      }
    })
  }

  async getUser(id: number): Promise<User> {
    return this.prisma.user.findUnique({
      where: { id: Number(id) }
    })
  }

  async userTopupBalance(id: number, amount: number): Promise<User> {
    const prevUserBalance = await this.prisma.user.findUnique({
      where: { id: Number(id) },
      select: { balance: true }
    })

    return this.prisma.user.update({
      where: { id: Number(id) },
      data: { balance: Number(prevUserBalance.balance + amount) }
    })
  }
}