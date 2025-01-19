import { IsNumber } from "class-validator";

export class CreateTransfer {
  username: string;

  @IsNumber()
  amount: number;

  description: string | null;
}
