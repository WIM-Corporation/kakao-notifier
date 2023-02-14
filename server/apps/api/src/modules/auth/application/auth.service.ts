import { TokenInjectedUserDto, UserService } from '@api/modules/user';
import { Injectable, Logger } from '@nestjs/common';
import { JwtToken } from './dto';
import { JwtSessionManager } from './jwt-session-manager';

@Injectable()
export class AuthService {
  private readonly logger: Logger = new Logger(AuthService.name);
  constructor(private readonly userService: UserService, private readonly jwtSessionManager: JwtSessionManager) {}

  async signJwt(payload: TokenInjectedUserDto): Promise<JwtToken> {
    return this.jwtSessionManager.sign(payload);
  }
}
