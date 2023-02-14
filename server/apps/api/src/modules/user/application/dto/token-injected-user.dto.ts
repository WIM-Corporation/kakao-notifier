import { ERole, ERoleProps } from '@libs/constant';
import { StringField, StringFieldOptional } from '@wim-backend/api-property';
import { UserDto } from '../..';

export class TokenInjectedUserDto {
  @StringField()
  readonly id!: string;

  @StringField()
  readonly displayName!: string;

  @StringField({ enum: ERole.asString() })
  readonly role!: ERoleProps;

  @StringFieldOptional()
  readonly avatar?: string;

  constructor({ id, displayName, role, avatar }: TokenInjectedUserDto) {
    this.id = id;
    this.displayName = displayName;
    this.role = role;
    this.avatar = avatar;
  }

  static from({ id, displayName, role, avatar }: UserDto): TokenInjectedUserDto {
    return new TokenInjectedUserDto({ id, displayName, role, avatar });
  }
}
