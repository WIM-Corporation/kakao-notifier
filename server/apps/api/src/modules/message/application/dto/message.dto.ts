import { ApiProperty } from '@nestjs/swagger';
import { StringField } from '@wim-backend/api-property';
import { MemoTemplate } from '@wim-backend/kakao/dist/memo/interface/common';
import { Message, MessageType } from '../../domain';

export class MessageDto {
  @StringField()
  channelId!: string;

  @StringField({ enum: MessageType })
  type!: MessageType;

  @ApiProperty()
  content!: MemoTemplate;

  static from(message: Message): MessageDto {
    const messageDto = new MessageDto();
    messageDto.channelId = message.channelId;
    messageDto.type = message.type;
    messageDto.content = message.content;
    return messageDto;
  }
}
