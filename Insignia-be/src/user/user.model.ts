import { Prisma } from "@prisma/client";

export class User implements Prisma.UserCreateInput {
    id: number | null;
    username: string;
    password: string;
    balance: number;
    apiToken: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
}