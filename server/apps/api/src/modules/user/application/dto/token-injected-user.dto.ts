import { StringField, StringFieldOptional } from '@wim-backend/api-property';
import { UserDto } from '../..';

export class TokenInjectedUserDto {
  @StringField()
  readonly id!: string;

  @StringField()
  readonly displayName!: string;

  @StringField({ nullable: true })
  readonly avatar!: string | null;

  constructor({ id, displayName, avatar }: TokenInjectedUserDto) {
    this.id = id;
    this.displayName = displayName;
    this.avatar = avatar;
  }

  static from({ id, displayName, avatar }: UserDto): TokenInjectedUserDto {
    return new TokenInjectedUserDto({ id, displayName, avatar });
  }
}
