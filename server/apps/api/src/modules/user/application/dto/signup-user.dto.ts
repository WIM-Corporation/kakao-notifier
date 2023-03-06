import { StringField, StringFieldOptional } from '@wim-backend/api-property';
import { KakaoUserPayload } from '@wim-backend/kakao';

export class SignUpUserDto {
  @StringField()
  id!: string;

  @StringField()
  displayName!: string;

  @StringFieldOptional()
  avatar?: string;

  static from(kakaoUser: KakaoUserPayload): SignUpUserDto {
    const dto = new SignUpUserDto();
    dto.id = kakaoUser.id;
    dto.displayName = kakaoUser.properties.nickname;
    dto.avatar = kakaoUser.properties.profile_image;
    return dto;
  }
}
