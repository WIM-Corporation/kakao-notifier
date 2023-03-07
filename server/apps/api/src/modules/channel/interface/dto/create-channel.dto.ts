import { StringField } from '@wim-backend/api-property';

export class CreateChannelDto {
  @StringField({ maxLength: 20 })
  readonly name!: string;
}
