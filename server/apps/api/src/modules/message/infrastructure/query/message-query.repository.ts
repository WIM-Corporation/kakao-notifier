import { BaseQueryRepo } from '@libs/base';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from '../../domain';

@Injectable()
export class MessageQueryRepository extends BaseQueryRepo<Message> {
  protected readonly relations: string[] = [];

  constructor(@InjectRepository(Message) private readonly queryRepository: Repository<Message>) {
    super(queryRepository);
  }
}
