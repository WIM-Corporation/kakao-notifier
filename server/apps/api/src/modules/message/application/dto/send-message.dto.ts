import { StringField, JsonField, JsonFieldOptional } from '@wim-backend/api-property';
import { Commerce, Feed, Location, List, Text } from '@wim-backend/kakao';
import { MessageType } from '../../domain';

export class SendMessageDto {
  @StringField()
  apiKey!: string;

  @StringField()
  channelId!: string;

  @StringField({ enum: MessageType })
  type!: MessageType;

  @StringField({ description: 'type에 맞는 템플릿을 stringify 해서 입력해주세요.' })
  templateObject!: string;

  @JsonFieldOptional({ type: Feed, description: 'Feed Schema 참고용, 입력 X' })
  feedObject: undefined = undefined;

  @JsonFieldOptional({ type: Commerce, description: 'Commerce Schema 참고용, 입력 X' })
  commerceObject: undefined = undefined;

  @JsonFieldOptional({ type: List, description: 'List Schema 참고용, 입력 X' })
  listObject: undefined = undefined;

  @JsonFieldOptional({ type: Location, description: 'Location Schema 참고용, 입력 X' })
  locationObject: undefined = undefined;

  @JsonFieldOptional({ type: Text, description: 'Text Schema 참고용, 입력 X' })
  textObject: undefined = undefined;
}
