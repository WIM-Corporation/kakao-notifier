import { BaseCommandRepo } from '@libs/base';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../domain/user.entity';

@Injectable()
export class UserCommandRepository extends BaseCommandRepo<User> {
  constructor(@InjectRepository(User) private readonly commandRepository: Repository<User>) {
    super(commandRepository);
  }
}
