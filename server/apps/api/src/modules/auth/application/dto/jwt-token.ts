import { StringField } from '@wim-backend/api-property';

export class JwtToken {
  constructor(_accessToken: string, _refreshToken: string) {
    this.accessToken = _accessToken;
    this.refreshToken = _refreshToken;
  }

  @StringField()
  readonly accessToken: string;

  @StringField()
  readonly refreshToken: string;
}
