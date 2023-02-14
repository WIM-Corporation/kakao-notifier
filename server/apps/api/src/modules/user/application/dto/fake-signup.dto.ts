import { ERole } from '@libs/constant';
import { StringField } from '@wim-backend/api-property';

export class FakeSignupDto {
  @StringField({ enum: ERole.values().map((v) => v.code) })
  role!: string;
}
