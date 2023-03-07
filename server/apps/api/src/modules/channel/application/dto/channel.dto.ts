import { User, UserDto } from '@api/modules/user';
import { JsonField, StringField } from '@wim-backend/api-property';
import { Channel } from '../../domain/channel.entity';

export class ChannelDto {
  @StringField()
  id!: string;

  @StringField()
  name!: string;

  @JsonField({ type: UserDto })
  createdBy!: UserDto;

  static of(channel: Channel, user: User): ChannelDto {
    const dto = new ChannelDto();
    dto.id = channel.id;
    dto.name = channel.name;
    dto.createdBy = UserDto.from(user);
    return dto;
  }
}
