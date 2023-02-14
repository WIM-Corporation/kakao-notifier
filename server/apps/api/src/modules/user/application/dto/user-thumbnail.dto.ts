import { ERole } from '@libs/constant';
import { StringField, URLFieldOptional } from '@wim-backend/api-property';
import { User } from '../../domain';

export class UserThumbnailDto {
  @StringField()
  id!: string;

  @URLFieldOptional()
  avatar?: string;

  @StringField()
  displayName!: string;

  @StringField({ enum: ERole.asString() })
  role!: string;

  static from(user: User): UserThumbnailDto {
    const dto = new UserThumbnailDto();
    dto.id = user.id;
    dto.avatar = user.avatar;
    dto.displayName = user.displayName;
    dto.role = user.role.code;
    return dto;
  }
}
