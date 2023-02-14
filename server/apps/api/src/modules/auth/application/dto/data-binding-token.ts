import { TokenInjectedUserDto } from '@api/modules/user';
import { JsonField } from '@wim-backend/api-property';
import { JwtToken } from './jwt-token';

export class DataBindingToken extends JwtToken {
  @JsonField({ type: TokenInjectedUserDto })
  bindingDataSet!: TokenInjectedUserDto;

  constructor(token: JwtToken, data: TokenInjectedUserDto) {
    super(token.accessToken, token.refreshToken);
    this.bindingDataSet = data;
  }
}
