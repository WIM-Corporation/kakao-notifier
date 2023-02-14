import { ERole } from '@libs/constant';
import { DisplaynameFieldOptional, StringFieldOptional } from '@wim-backend/api-property';
import { User } from '../../domain';

export class SignupUserDto {
  @DisplaynameFieldOptional({ minLength: 2, maxLength: 8, regexp: /^([a-zA-Z0-9가-힣\x20]){2,20}$/ })
  displayName!: string;

  @StringFieldOptional()
  avatar?: string;

  constructor({ displayName, avatar }: { displayName: string; avatar?: string }) {
    this.displayName = displayName;
    this.avatar = avatar;
  }

  toUser(): User {
    return User.create({ displayName: this.displayName, role: ERole.USER, avatar: this.avatar });
  }
}
