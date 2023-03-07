import { StringField } from '@wim-backend/api-property';
import { User } from '../../domain/user.entity';

export class UserProfileDto {
  @StringField()
  id!: string;

  @StringField()
  displayName!: string;

  @StringField({ nullable: true })
  avatar!: string | null;

  @StringField()
  apiKey!: string;

  static from(user: User): UserProfileDto {
    const dto = new UserProfileDto();
    dto.id = user.id;
    dto.displayName = user.displayName;
    dto.avatar = user.avatar;
    dto.apiKey = user.apiKey;
    return dto;
  }
}
