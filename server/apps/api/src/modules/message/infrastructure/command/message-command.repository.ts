import { BaseCommandRepo } from '@libs/base';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from '../../domain';

@Injectable()
export class MessageCommandRepository extends BaseCommandRepo<Message> {
  protected readonly relations: string[] = [];

  constructor(@InjectRepository(Message) private readonly commandRepository: Repository<Message>) {
    super(commandRepository);
  }
}
