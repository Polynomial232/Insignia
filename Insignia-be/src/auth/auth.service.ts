import { CanActivate, ExecutionContext, HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common";
import { User } from "@prisma/client";
import { PrismaService } from "src/prisma.service";

@Injectable()
export class AuthService implements CanActivate {
    constructor(private prisma: PrismaService) {}

    async canActivate(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest()
        const authorization = request.headers.authorization
        const token = authorization?.split('Bearer ')[1]
        const user: User = await this.prisma.user.findUnique({
            where: {
                apiToken:String(token)
            }
        })

        if(!user) throw new UnauthorizedException('User token not valid')

        request.user = user
        return true
    }
}