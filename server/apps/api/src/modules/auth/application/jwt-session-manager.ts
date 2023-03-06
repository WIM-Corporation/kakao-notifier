import { JwtToken } from '@api/modules/auth';
import { TokenInjectedUserDto, UserDto } from '@api/modules/user';
import { ConfigService } from '@libs/config';
import { SessionTime } from '@libs/util/session-time';
import { ForbiddenException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { isInteger } from 'lodash';

@Injectable()
export class JwtSessionManager {
  private readonly accessSecret: string;
  private readonly refreshSecret: string;

  constructor(private readonly configService: ConfigService, private readonly jwtService: JwtService) {
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
    const { id, displayName, avatar } = payload;
    try {
      const accessToken = await this.jwtService.signAsync(
        { id, displayName, avatar },
        { secret: this.accessSecret, expiresIn: SessionTime.accessTokenExpireTime() },
      );
      const refreshToken = await this.jwtService.signAsync({ accessToken }, { secret: this.refreshSecret, expiresIn: SessionTime.refreshTokenExpireTime() });

      return new JwtToken(accessToken, refreshToken);
    } catch (error) {
      throw new UnauthorizedException('jwt sign failed.');
    }
  }

  /**
   * @description
   * 리프레시 토큰을 사용해 토큰을 재발급한다. 기존 토큰은 폐기한다.
   */
  async refresh(refreshToken: string): Promise<JwtToken> {
    try {
      const { accessToken } = await this.jwtService.verifyAsync<{ accessToken: string }>(refreshToken, { secret: this.refreshSecret });
      const payload = await this.jwtService.verifyAsync<TokenInjectedUserDto>(accessToken, { secret: this.accessSecret });
      return this.sign(new TokenInjectedUserDto(payload));
    } catch (error) {
      throw new UnauthorizedException('토큰 리프레시 실패');
    }
  }

  async validate(accessToken: string): Promise<TokenInjectedUserDto> {
    try {
      return await this.jwtService.verifyAsync(accessToken);
    } catch (error) {
      throw new UnauthorizedException('jwt verify failed.');
    }
  }

  private accessKey(userId: string): string {
    return `session:access:users:${userId}`;
  }

  private refreshKey(userId: string): string {
    return `session:refresh:users:${userId}`;
  }
}
