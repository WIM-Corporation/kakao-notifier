import { UserService } from '@api/modules/user';
import { OffsetPageDto } from '@libs/meta';
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Channel } from '../domain';
import { ChannelCommandRepository, ChannelQueryRepository, GetChannelsDto } from '../infrastructure';
import { ChannelDto } from './dto';

@Injectable()
export class ChannelService {
  private readonly logger: Logger = new Logger(ChannelService.name);
  constructor(private readonly userService: UserService, private readonly query: ChannelQueryRepository, private readonly command: ChannelCommandRepository) {}

  async getChannels(userId: string, getChannelsDto: GetChannelsDto): Promise<OffsetPageDto<ChannelDto>> {
    const user = await this.userService.getById(userId);

    const [channels, meta] = await this.query.getChannels(userId, getChannelsDto);
    return new OffsetPageDto(
      channels.map((channel) => ChannelDto.of(channel, user)),
      meta,
    );
  }

  async createChannel({ createdBy, name }: { createdBy: string; name: string }): Promise<ChannelDto> {
    const user = await this.userService.getById(createdBy);

    const channel = Channel.from({ createdBy, name });
    await this.command.save(channel);
    return ChannelDto.of(channel, user);
  }

  async updateChannel(id: string, { userId, name }: { userId: string; name: string }): Promise<ChannelDto> {
    const user = await this.userService.getById(userId);

    const channel = await this.query.getById(id);
    channel.fixName({ userId, name });
    await this.command.save(channel);
    return ChannelDto.of(channel, user);
  }

  async deleteChannel(id: string, userId: string): Promise<any> {
    const channel = await this.query.getById(id);
    channel.delete(userId);
    await this.command.save(channel);
  }

  async checkChannelOwner(id: string, userId: string): Promise<boolean> {
    const channel = await this.query.getById(id);
    return channel.createdBy === userId;
  }
}
