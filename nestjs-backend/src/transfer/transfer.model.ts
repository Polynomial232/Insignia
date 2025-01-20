import { Prisma } from "@prisma/client";

export class Transfer implements Prisma.TransferCreateInput {
  id: number | null;
  transferCode: string | null;
  fromUserId: number;
  toUserId: number;
  amount: number;
  description: string | null;
  createdAt: Date | null;
  updatedAt: Date | null;
  deletedAt: Date | null;

  fromUser: Prisma.UserCreateNestedOneWithoutTransfersFromInput;
  toUser: Prisma.UserCreateNestedOneWithoutTransfersToInput;
}