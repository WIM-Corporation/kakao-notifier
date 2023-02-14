import { ApiProperty } from '@nestjs/swagger';

import { CursorPageMetaDto, OffsetPageMetaDto } from './page-meta.dto';

export class OffsetPageDto<T> {
  @ApiProperty({ isArray: true })
  readonly data: T[];

  @ApiProperty()
  readonly meta: OffsetPageMetaDto;

  constructor(data: T[], meta: OffsetPageMetaDto) {
    this.data = data;
    this.meta = meta;
  }
}

export class CursorPageDto<T> {
  @ApiProperty({ isArray: true })
  readonly data: T[];

  @ApiProperty()
  readonly meta: CursorPageMetaDto;

  constructor(data: T[], meta: CursorPageMetaDto) {
    this.data = data;
    this.meta = meta;
  }
}
