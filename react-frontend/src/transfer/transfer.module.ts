import { Module } from "@nestjs/common";
import { TransferController } from "./Transfer.controller";
import { TransferService } from "./Transfer.service";
import { PrismaService } from "src/prisma.service";
import { TransferValidator } from "./transfer.validator";

@Module({
    controllers: [TransferController],
    providers: [TransferService, PrismaService, TransferValidator]
})
export class TransferModule {}