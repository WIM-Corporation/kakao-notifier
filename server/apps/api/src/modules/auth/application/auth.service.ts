import { TokenInjectedUserDto, UserDto, UserService } from '@api/modules/user';
import { Injectable, Logger } from '@nestjs/common';
import { KakaoTokenPayload, KakaoUserPayload } from '@wim-backend/kakao';
import { JwtToken } from './dto';
import { JwtSessionManager } from './jwt-session-manager';

@Injectable()
export class AuthService {
  private readonly logger: Logger = new Logger(AuthService.name);
  constructor(private readonly userService: UserService, private readonly jwtSessionManager: JwtSessionManager) {}

  async signJwt(payload: TokenInjectedUserDto): Promise<JwtToken> {
    return this.jwtSessionManager.sign(payload);
  }

  async signIn(myInfo: KakaoUserPayload, token: KakaoTokenPayload): Promise<JwtToken> {
    const user = await this.userService.findById(myInfo.id);
    if (!user) {
      const signedUser = await this.userService.signUpAndLogIn(myInfo, token);
      return this.signJwt(TokenInjectedUserDto.from(UserDto.from(signedUser)));
    }
    await this.userService.logIn(user, token, myInfo.connected_at);
    return this.signJwt(TokenInjectedUserDto.from(UserDto.from(user)));
  }
}
