import { Module } from "@nestjs/common";
import { TransferController } from "./Transfer.controller";
import { TransferService } from "./Transfer.service";
import { PrismaService } from "src/prisma.service";

@Module({
    controllers: [TransferController],
    providers: [TransferService, PrismaService]
})
export class TransferModule {}