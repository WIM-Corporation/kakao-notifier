import { StringField, StringFieldOptional } from '@wim-backend/api-property';
import { User } from '../../domain';

export class UserDto {
  @StringField()
  id!: string;

  @StringField()
  displayName!: string;

  @StringField({ nullable: true })
  avatar!: string | null;

  static from(user: User): UserDto {
    const dto = new UserDto();
    dto.id = user.id;
    dto.displayName = user.displayName;
    dto.avatar = user.avatar;
    return dto;
  }
}
