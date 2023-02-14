import { OffsetPageOptionsDto } from '@libs/meta';
import { StringFieldOptional } from '@wim-backend/api-property';

export class SearchUserDto extends OffsetPageOptionsDto {
  @StringFieldOptional()
  readonly displayName?: string;
}
