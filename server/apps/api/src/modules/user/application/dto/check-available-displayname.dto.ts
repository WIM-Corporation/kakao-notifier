import { DisplaynameField } from '@wim-backend/api-property';

export class CheckAvailableDisplayNameDto {
  @DisplaynameField({ minLength: 2, maxLength: 8, regexp: /^([a-zA-Z0-9가-힣\x20]){2,20}$/ })
  readonly displayName!: string;
}
