import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { PrismaService } from "src/prisma.service";
import { UserValidator } from "./user.validator";

@Module({
    controllers: [UserController],
    providers: [UserService, PrismaService, UserValidator]
})
export class UserModule {}