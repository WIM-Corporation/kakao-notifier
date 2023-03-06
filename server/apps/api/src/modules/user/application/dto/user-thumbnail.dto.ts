import { StringField } from '@wim-backend/api-property';
import { User } from '../../domain';

export class UserThumbnailDto {
  @StringField()
  id!: string;

  @StringField({ nullable: true })
  avatar!: string | null;

  @StringField()
  displayName!: string;

  static from(user: User): UserThumbnailDto {
    const dto = new UserThumbnailDto();
    dto.id = user.id;
    dto.avatar = user.avatar;
    dto.displayName = user.displayName;
    return dto;
  }
}
