import { IsNumber } from "class-validator";

export class CreateTransfer {
  username: string;

  @IsNumber()
  amount: number;

  description: string | null;
}

export class TransactionDto {
  page: number;
  transaction_code: string | null;
  username: string | null;
}