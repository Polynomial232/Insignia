import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class UserResponse {
  createdAt: Date;

  @Expose()
  username: string;

  @Expose()
  balance: number;

  @Expose()
  get created_at(): string {
    return this.createdAt.toISOString()
  }

  constructor(partial: Partial<UserResponse>) {
    Object.assign(this, partial)
  }
}

@Exclude()
export class UserBalanceResponse {
  @Expose()
  balance: number;

  constructor(partial: Partial<UserResponse>) {
    Object.assign(this, partial)
  }
}

@Exclude()
export class UserApiTokenResponse {
  apiToken: string;
  
  @Expose()
  get api_token(): string {
    return this.apiToken
  }

  constructor(partial: Partial<UserResponse>) {
    Object.assign(this, partial)
  }
}