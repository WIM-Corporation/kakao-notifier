import { UserService } from '@api/modules/user';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import type { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtSessionManager, JwtToken } from '../../application';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor(private readonly config: ConfigService, private readonly jwtSessionManager: JwtSessionManager, private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.get('jwtRefreshSecret'),
      passReqToCallback: true,
    });
  }

  async validate(req: Request, { userId }: { exp: number; iat: number; userId: string }): Promise<JwtToken> {
    const refreshToken = req.headers.authorization?.replace('Bearer', '').trim();
    if (!refreshToken) throw new BadRequestException('refreshToken is empty.');
    const user = await this.userService.findById(userId);
    if (!user) throw new NotFoundException('사용자 정보를 찾을 수 없습니다.');
    return this.jwtSessionManager.refresh(refreshToken);
  }
}
