import { BaseQueryRepo } from '@libs/base';
import { OffsetPageMetaDto } from '@libs/meta';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Channel } from '../../domain';
import { GetChannelsDto } from './dto';

@Injectable()
export class ChannelQueryRepository extends BaseQueryRepo<Channel> {
  protected readonly relations: string[] = [];

  constructor(@InjectRepository(Channel) private readonly queryRepository: Repository<Channel>) {
    super(queryRepository);
  }

  async getChannels(userId: string, getChannelsDto: GetChannelsDto): Promise<[Channel[], OffsetPageMetaDto]> {
    const { page, take, skip, name } = getChannelsDto;
    const qb = this.queryRepository
      .createQueryBuilder('channel')
      .where('channel.createdBy = :userId', { userId })
      .orderBy('channel.createdAt', 'DESC')
      .offset(skip)
      .limit(take);

    if (name) {
      qb.andWhere('channel.name LIKE :name', { name: `${name}%` });
    }

    const [channels, count] = await qb.getManyAndCount();
    return [channels, new OffsetPageMetaDto({ itemCount: count, pageOptionsDto: { take, page } })];
  }
}
