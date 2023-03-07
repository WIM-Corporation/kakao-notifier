import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChannelService } from './application';
import { Channel } from './domain';
import { ChannelCommandRepository, ChannelQueryRepository } from './infrastructure';
import { ChannelController } from './interface';

@Module({
  imports: [TypeOrmModule.forFeature([Channel])],
  controllers: [ChannelController],
  providers: [ChannelService, ChannelQueryRepository, ChannelCommandRepository],
  exports: [ChannelService],
})
export class ChannelModule {}
