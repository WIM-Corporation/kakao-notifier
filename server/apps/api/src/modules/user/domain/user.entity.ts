import { BaseEntity } from '@libs/base';
import { DatetimeToTimestampTransformer } from '@libs/transformer';
import { ForbiddenException } from '@nestjs/common';
import { KakaoTokenPayload } from '@wim-backend/kakao';
import dayjs from 'dayjs';
import { Column, Entity, Index, PrimaryColumn } from 'typeorm';
import { v4 } from 'uuid';
import { SignUpUserDto } from '../application';

@Index(['displayName', 'avatar', 'deletedAt'])
@Index(['apiKey', 'deletedAt'])
@Entity('user')
export class User extends BaseEntity {
  @PrimaryColumn({ type: 'bigint' })
  override id!: string;

  @Column('uuid', { unique: true })
  apiKey!: string;

  @Column('varchar', { length: 30 })
  displayName!: string;

  @Column('varchar', { nullable: true, length: 500 })
  avatar!: string | null;

  @Column('varchar', { name: 'access_token', nullable: true })
  _accessToken!: string | null;

  @Column({ type: 'datetime', width: 6, transformer: new DatetimeToTimestampTransformer() })
  expiresAt!: number | null;

  @Column('varchar', { nullable: true })
  refreshToken!: string | null;

  @Column({ type: 'datetime', width: 6, transformer: new DatetimeToTimestampTransformer() })
  refreshTokenExpiresAt!: number | null;

  @Column('varchar', { nullable: true })
  scope!: string | null;

  validate(): void {}

  static from({ id, displayName, avatar }: SignUpUserDto): User {
    const user = new User();
    user.id = id;
    user.apiKey = v4();
    user.displayName = displayName;
    user.avatar = avatar ?? null;
    return user;
  }

  static of(payload: SignUpUserDto, token: KakaoTokenPayload): User {
    const user = User.from(payload);
    user.login(token);
    return user;
  }

  login(token: KakaoTokenPayload, now: Date = new Date()): void {
    const day = dayjs(now);
    this._accessToken = token.access_token;
    this.expiresAt = day.add(token.expires_in, 'second').toDate().getTime();
    this.refreshToken = token.refresh_token;
    this.refreshTokenExpiresAt = day.add(token.refresh_token_expires_in, 'second').toDate().getTime();
    this.scope = token.scope ?? null;
  }

  get accessToken(): string {
    if (!this._accessToken) throw new ForbiddenException('Access token is not exist.');
    if (!this.checkActiveAccessToken()) throw new ForbiddenException('Access token is expired. Please refresh token.');
    return this._accessToken;
  }

  private checkActiveAccessToken(now = new Date()): boolean {
    return !!this.expiresAt && +this.expiresAt > +now;
  }
}
