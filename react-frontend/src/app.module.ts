import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { LoggerMiddleware } from './common/logger.middleware';
import { UserModule } from './user/user.module';
import { UserController } from './user/user.controller';
import { TransferModule } from './Transfer/Transfer.module';

@Module({
  imports: [UserModule, TransferModule],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes(UserController, TransferModule)
  }
}
