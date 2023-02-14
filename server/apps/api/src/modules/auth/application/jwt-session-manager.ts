import { JwtToken } from '@api/modules/auth';
import { TokenInjectedUserDto, UserDto } from '@api/modules/user';
import { ConfigService } from '@libs/config';
import { RedisClient } from '@libs/modules/redis';
import { SessionTime } from '@libs/util/session-time';
import { ForbiddenException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { isInteger } from 'lodash';

@Injectable()
export class JwtSessionManager {
  private readonly accessSecret: string;
  private readonly refreshSecret: string;

  constructor(private readonly redis: RedisClient, private readonly configService: ConfigService, private readonly jwtService: JwtService) {
    this.accessSecret = configService.get('jwtAccessSecret');
    this.refreshSecret = configService.get('jwtRefreshSecret');

    if (!this.accessSecret) throw new Error('accessSecret 값이 적절하지 않습니다.');
    if (!isInteger(SessionTime.accessTokenExpireTime())) throw new Error('accessTokenExpireTime 값이 적절하지 않습니다.');
    if (!this.refreshSecret) throw new Error('refreshSecret 값이 적절하지 않습니다.');
    if (!isInteger(SessionTime.refreshTokenExpireTime())) throw new Error('refreshTokenExpireTime 값이 적절하지 않습니다.');
  }

  /**
   * @description
   * 로그인 하며 jwt를 캐시한다.
   */
  async sign(payload: TokenInjectedUserDto): Promise<JwtToken> {
    const { id: userId } = payload;
    try {
      const [accessToken, refreshToken] = await Promise.all([
        this.jwtService.signAsync({ userId: payload.id }, { secret: this.accessSecret, expiresIn: SessionTime.accessTokenExpireTime() }),
        this.jwtService.signAsync({ userId }, { secret: this.refreshSecret, expiresIn: SessionTime.refreshTokenExpireTime() }),
      ]);

      type Token = TokenInjectedUserDto & { accessToken: string };
      await this.redis.manager.set<Token>(this.accessKey(userId), { accessToken, ...payload }, { ttl: SessionTime.accessTokenExpireTime() });
      await this.redis.manager.set<string>(this.refreshKey(userId), refreshToken, { ttl: SessionTime.refreshTokenExpireTime() });

      return new JwtToken(accessToken, refreshToken);
    } catch (error) {
      throw new UnauthorizedException('jwt sign failed.');
    }
  }

  /**
   * 토큰 세션정보를 모두 제거한다
   */
  async signout(userId: string): Promise<void> {
    await this.redis.unlink(this.accessKey(userId), this.refreshKey(userId));
  }

  /**
   * @description
   * 리프레시 토큰을 사용해 토큰을 재발급한다. 기존 토큰은 폐기한다.
   */
  async refresh(refreshToken: string, user: UserDto): Promise<JwtToken> {
    const cachedRefreshToken = await this.redis.manager.get<string>(this.refreshKey(user.id));
    if (!cachedRefreshToken) throw new UnauthorizedException('존재하지 않는 refresh token 입니다.');
    if (cachedRefreshToken !== refreshToken) throw new UnauthorizedException('refresh token 정보가 일치하지 않습니다.');

    if (!user) throw new NotFoundException('회원 정보를 찾을 수 없습니다.');

    try {
      return this.sign(TokenInjectedUserDto.from(user));
    } catch (error) {
      throw new UnauthorizedException('토큰 리프레시 실패');
    }
  }

  async validate(accessToken: string, userId: string): Promise<TokenInjectedUserDto> {
    const payload = await this.redis.manager.get<TokenInjectedUserDto & { accessToken: string }>(this.accessKey(userId));
    if (!payload || payload.accessToken !== accessToken) throw new ForbiddenException('세션이 만료되었습니다.');
    return payload;
  }

  private accessKey(userId: string): string {
    return `session:access:users:${userId}`;
  }

  private refreshKey(userId: string): string {
    return `session:refresh:users:${userId}`;
  }
}
