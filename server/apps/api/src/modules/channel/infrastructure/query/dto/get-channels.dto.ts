import { OffsetPageOptionsDto } from '@libs/meta';
import { StringFieldOptional } from '@wim-backend/api-property';

export class GetChannelsDto extends OffsetPageOptionsDto {
  @StringFieldOptional()
  readonly name!: string;
}
