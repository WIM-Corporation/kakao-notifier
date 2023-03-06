import { TokenInjectedUserDto } from '@api/modules/user/application/dto';
import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { Request } from 'express';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtSessionManager } from '../../application';

@Injectable()
export class JwtAccessStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private readonly config: ConfigService, private readonly jwtSessionManager: JwtSessionManager) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.get('jwtAccessSecret'),
      passReqToCallback: true,
    });
  }

  async validate(req: Request): Promise<TokenInjectedUserDto> {
    const accessToken = req.headers.authorization?.replace('Bearer', '').trim();
    if (!accessToken) throw new BadRequestException('accessToken is empty.');
    return this.jwtSessionManager.validate(accessToken);
  }
}
