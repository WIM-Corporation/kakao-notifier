import { BaseCommandRepo } from '@libs/base';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Channel } from '../../domain';

@Injectable()
export class ChannelCommandRepository extends BaseCommandRepo<Channel> {
  protected readonly relations: string[] = [];

  constructor(@InjectRepository(Channel) private readonly commandRepository: Repository<Channel>) {
    super(commandRepository);
  }
}
