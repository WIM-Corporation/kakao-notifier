import { ERole, ERoleProps } from '@libs/constant';
import { StringField, StringFieldOptional } from '@wim-backend/api-property';
import { User } from '../../domain';

export class UserDto {
  @StringField()
  id!: string;

  @StringField()
  displayName!: string;

  @StringField({ enum: ERole.asString() })
  role!: ERoleProps;

  @StringFieldOptional()
  avatar?: string;

  static from(user: User): UserDto {
    const dto = new UserDto();
    dto.id = user.id;
    dto.displayName = user.displayName;
    dto.role = typeof user.role === 'string' ? user.role : user.role?.code;
    dto.avatar = user.avatar;
    return dto;
  }
}
