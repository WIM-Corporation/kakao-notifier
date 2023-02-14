import { StringField } from '@wim-backend/api-property';

export class ForceLoginDto {
  @StringField()
  email!: string;
}
