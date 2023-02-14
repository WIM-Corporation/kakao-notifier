import { ApiProperty } from '@nestjs/swagger';
import { NumberField, StringFieldOptional } from '@wim-backend/api-property';

import type { CursorPageOptionsDto, OffsetPageOptionsDto } from './page-options.dto';

interface IOffsetPageMetaDtoParameters {
  pageOptionsDto: OffsetPageOptionsDto | Pick<OffsetPageOptionsDto, 'page' | 'take'>;
  itemCount: number;
}

interface ICursorPageMetaDtoParameters {
  pageOptionsDto: CursorPageOptionsDto;
  // itemCount: number;
}

export class OffsetPageMetaDto {
  @ApiProperty()
  readonly page: number;

  @ApiProperty()
  readonly take: number;

  @ApiProperty()
  readonly itemCount: number;

  @ApiProperty()
  readonly pageCount: number;

  @ApiProperty()
  readonly hasPreviousPage: boolean;

  @ApiProperty()
  readonly hasNextPage: boolean;

  constructor({ pageOptionsDto, itemCount }: IOffsetPageMetaDtoParameters) {
    this.page = pageOptionsDto.page;
    this.take = pageOptionsDto.take;
    this.itemCount = itemCount;
    this.pageCount = Math.ceil(this.itemCount / this.take);
    this.hasPreviousPage = this.page > 1;
    this.hasNextPage = this.page < this.pageCount;
  }
}

export class CursorPageMetaDto {
  @StringFieldOptional()
  readonly cursor?: string;

  @NumberField()
  readonly take: number;

  // 전체 카운트가 찍혀버리는데, page 값이 필요한 것도 아니니 불필요 함
  // @NumberField()
  // readonly itemCount: number;

  constructor({ pageOptionsDto }: ICursorPageMetaDtoParameters) {
    this.cursor = pageOptionsDto?.cursor;
    this.take = pageOptionsDto.take;
    // this.itemCount = itemCount;
  }
}
