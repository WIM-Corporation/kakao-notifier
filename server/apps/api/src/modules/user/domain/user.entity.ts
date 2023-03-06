import { BaseEntity } from '@libs/base';
import { DatetimeToTimestampTransformer } from '@libs/transformer';
import { KakaoTokenPayload } from '@wim-backend/kakao';
import dayjs from 'dayjs';
import { Column, Entity, Index, PrimaryColumn } from 'typeorm';
import { SignUpUserDto } from '../application';

@Index(['displayName', 'avatar', 'deletedAt'])
@Entity('user')
export class User extends BaseEntity {
  @PrimaryColumn({ type: 'bigint' })
  override id!: string;

  @Column('varchar', { length: 30 })
  displayName!: string;

  @Column('varchar', { nullable: true, length: 500 })
  avatar!: string | null;

  @Column('varchar', { nullable: true })
  accessToken!: string | null;

  @Column({ type: 'datetime', width: 6, transformer: new DatetimeToTimestampTransformer() })
  expiresAt!: number | null;

  @Column('varchar', { nullable: true })
  refreshToken!: string | null;

  @Column({ type: 'datetime', width: 6, transformer: new DatetimeToTimestampTransformer() })
  refreshTokenExpiresAt!: number | null;

  @Column('varchar', { nullable: true })
  scope!: string | null;

  @Column({ type: 'datetime', width: 6, transformer: new DatetimeToTimestampTransformer() })
  connectedAt!: number | null;

  validate(): void {}

  static from({ id, displayName, avatar }: SignUpUserDto): User {
    const user = new User();
    user.id = id;
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
    this.accessToken = token.access_token;
    this.expiresAt = day.add(token.expires_in, 'second').toDate().getTime();
    this.refreshToken = token.refresh_token;
    this.refreshTokenExpiresAt = day.add(token.refresh_token_expires_in, 'second').toDate().getTime();
    this.scope = token.scope ?? null;
    this.connectedAt = +now;
  }
}
