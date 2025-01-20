import { User } from "@prisma/client";
import { Exclude, Expose } from "class-transformer";
var moment = require('moment')

@Exclude()
export class TransferResponse {
    userId: number;
    toUserId: number;
    fromUserId: number;
    transferCode: string;
    createdAt: Date;
    toUser: User;
    fromUser: User;

    private _amount: number;

    @Expose()
    get username(): string {
        return this.userId === this.toUserId ? this.fromUser.username : this.toUser.username;
    }
    
    @Expose()
    get amount(): number {
        // if particular user transfer to user = debit (-)
        // if user to particular user = credit (+)
        return this.userId === this.toUserId ? -this._amount : this._amount;
    }

    @Expose()
    get transfer_code(): string {
        return this.transferCode
    }

    @Expose()
    get transfer_date(): string {
        return moment(this.createdAt).format('DD MMM YYYY, hh:mm:ss')
        // return this.createdAt.toISOString()
    }

    constructor(partial: Partial<TransferResponse>) {
        Object.assign(this, partial);
        this._amount = partial.amount
    }

    set amount(value: number) {
        this._amount = value;
    }
}

@Exclude()
export class TransferTopUsersResponse {
    userId: number;
    toUserId: number;
    fromUserId: number;
    toUser: User;
    fromUser: User;

    private _amount: number;

    @Expose()
    get username(): string {
        return this.userId === this.toUserId ? this.fromUser.username : this.toUser.username;
    }
    
    @Expose()
    get amount(): number {
        // if particular user transfer to user = debit (-)
        // if user to particular user = credit (+)
        return this.userId === this.toUserId ? -this._amount : this._amount;
    }

    constructor(partial: Partial<TransferResponse>) {
        Object.assign(this, partial);
        this._amount = partial.amount
    }

    set amount(value: number) {
        this._amount = value;
    }
}
