import { IsNumber } from "class-validator"

export class UserTopupBalance {
    @IsNumber()
    amount: number;
}

export class UserLogin {
    username: string
    password: string
}