import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './application';
import { UserCommandRepository, UserQueryRepository } from './infrastructure';
import { UserController } from './interface';
import { User } from './domain';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService, UserQueryRepository, UserCommandRepository],
  exports: [UserService, UserQueryRepository, UserCommandRepository],
})
export class UserModule {}
