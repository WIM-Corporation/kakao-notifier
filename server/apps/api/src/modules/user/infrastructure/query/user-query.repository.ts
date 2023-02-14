import { BaseQueryRepo } from '@libs/base';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindManyOptions } from 'typeorm';
import { User } from '../../domain';

@Injectable()
export class UserQueryRepository extends BaseQueryRepo<User> {
  protected readonly relations: string[] = [];

  constructor(@InjectRepository(User) private readonly queryRepository: Repository<User>) {
    super(queryRepository);
  }

  async exists(condition: FindManyOptions<User>): Promise<boolean> {
    return this.repository.exist(condition);
  }
}
