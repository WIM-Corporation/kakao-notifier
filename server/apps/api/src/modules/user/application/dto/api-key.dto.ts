import { JsonField, StringField } from '@wim-backend/api-property';
import { User, UserDto } from '../..';

export class ApiKeyDto {
  @StringField()
  apiKey!: string;

  @JsonField({ type: UserDto })
  user!: UserDto;

  static from(user: User): ApiKeyDto {
    const dto = new ApiKeyDto();
    dto.apiKey = user.apiKey;
    dto.user = UserDto.from(user);
    return dto;
  }
}
