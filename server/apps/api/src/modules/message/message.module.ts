import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChannelModule } from '../channel';
import { MessageService } from './application';
import { Message } from './domain';
import { MessageCommandRepository, MessageQueryRepository } from './infrastructure';
import { MessageController } from './interface';

@Module({
  imports: [TypeOrmModule.forFeature([Message]), ChannelModule],
  controllers: [MessageController],
  providers: [MessageService, MessageQueryRepository, MessageCommandRepository],
  exports: [MessageService],
})
export class MessageModule {}
