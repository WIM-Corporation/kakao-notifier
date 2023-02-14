/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable no-extend-native */
/* eslint-disable @typescript-eslint/naming-convention,sonarjs/cognitive-complexity */

import { VIRTUAL_COLUMN_KEY } from '@libs/decorator';
import { CursorPageMetaDto, CursorPageOptionsDto, OffsetPageMetaDto, OffsetPageOptionsDto } from '@libs/meta';
import { HttpException, HttpStatus } from '@nestjs/common';
import { castArray } from 'lodash';
import 'source-map-support/register';
import { Brackets, SelectQueryBuilder } from 'typeorm';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Array<T> {
    isEmpty<T>(this: T[]): boolean;
    notNull<T>(this: T[], message?: string): void;
  }

  interface Set<T> {
    toArray<T>(): T[];
  }

  interface String {
    toJson(): Record<string, unknown>;
  }
}

Array.prototype.isEmpty = function (): boolean {
  return this.length === 0;
};

Array.prototype.notNull = function (message?: string): void {
  if (this.length === 0) {
    throw new HttpException(message || 'array not null exception', HttpStatus.INTERNAL_SERVER_ERROR);
  }
};

Set.prototype.toArray = function <T>(): T[] {
  return [...this.values()];
};

declare module 'typeorm' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface QueryBuilder<Entity> {
    searchByString(q: string, columnNames: string[], alias?: string): this;
  }

  interface SelectQueryBuilder<Entity> {
    offsetPaginate(
      this: SelectQueryBuilder<Entity>,
      pageOptionsDto: OffsetPageOptionsDto,
      options?: Partial<{ takeAll: boolean }>,
    ): Promise<[Entity[], OffsetPageMetaDto]>;
    cursorPaginate(
      this: SelectQueryBuilder<Entity>,
      pageOptionsDto: CursorPageOptionsDto,
      options?: Partial<{ takeAll: boolean }>,
    ): Promise<[Entity[], CursorPageMetaDto]>;
    // paginateRaw<RawDTO>(
    //   this: SelectQueryBuilder<Entity>,
    //   pageOptionsDto: OffsetPageOptionsDto,
    //   options?: Partial<{ takeAll: boolean }>,
    // ): Promise<[RawDTO[], OffsetPageMetaDto]>;

    getMany(this: SelectQueryBuilder<Entity>): Promise<Entity[]>;
    // getOne(this: SelectQueryBuilder<Entity>): Promise<Entity>;
    // findOne(this: SelectQueryBuilder<Entity>): Promise<Entity | undefined>;
  }
}

SelectQueryBuilder.prototype.searchByString = function (q: string, columnNames: string[], alias: string = '') {
  if (!q) {
    return this;
  }

  this.andWhere(
    new Brackets((qb) => {
      for (const item of columnNames) {
        qb.orWhere(`${alias ? alias.concat('.') : alias}${item} LIKE :q`, { q: `%${q}%` });
      }
    }),
  );

  return this;
};

SelectQueryBuilder.prototype.offsetPaginate = async function (pageOptionsDto: OffsetPageOptionsDto, options?: Partial<{ takeAll: boolean }>) {
  const alias = this.expressionMap.mainAlias;

  if (!options?.takeAll) {
    this.skip(pageOptionsDto.skip).take(pageOptionsDto.take);
  }

  if (pageOptionsDto?.q && pageOptionsDto.qColumnNames?.length) {
    this.searchByString(pageOptionsDto.q, castArray(pageOptionsDto.qColumnNames), alias?.name);
  }

  if (pageOptionsDto?.order && pageOptionsDto?.orderColumnName) {
    const key = alias?.name ? `${alias.name}.${pageOptionsDto?.orderColumnName}` : pageOptionsDto?.orderColumnName;
    this.orderBy({ [key]: pageOptionsDto.order });
  }

  const [itemCount, entities] = await Promise.all([this.getCount(), this.getMany()]);
  const pageMetaDto = new OffsetPageMetaDto({ itemCount, pageOptionsDto });
  return [entities, pageMetaDto];
};

SelectQueryBuilder.prototype.cursorPaginate = async function (pageOptionsDto: CursorPageOptionsDto, options?: Partial<{ takeAll: boolean }>) {
  const alias = this.expressionMap.mainAlias;

  if (!options?.takeAll) {
    this.take(pageOptionsDto.take);
  }

  if (pageOptionsDto.cursorName && pageOptionsDto.cursor) {
    /**
     * ASC -> where id > :cursor
     * DESC -> where id < :cursor
     */
    const key = alias?.name ? `${alias.name}.${pageOptionsDto.cursorName}` : pageOptionsDto.cursorName;
    const op = pageOptionsDto.order === 'ASC' ? '>' : '<';
    this.andWhere(`${key} ${op} :cursor`, { cursor: pageOptionsDto.cursor });
  }

  if (pageOptionsDto?.q && pageOptionsDto.qColumnNames?.length) {
    this.searchByString(pageOptionsDto.q, castArray(pageOptionsDto.qColumnNames), alias?.name);
  }

  if (pageOptionsDto?.order && pageOptionsDto.cursorName) {
    const key = alias?.name ? `${alias.name}.${pageOptionsDto?.cursorName}` : pageOptionsDto?.cursorName;
    this.orderBy({ [key]: pageOptionsDto.order });
  }

  const entities = await this.getMany();
  const pageMetaDto = new CursorPageMetaDto({ pageOptionsDto });
  return [entities, pageMetaDto];
};

// SelectQueryBuilder.prototype.paginateRaw = async function (pageOptionsDto: OffsetPageOptionsDto, options?: Partial<{ takeAll: boolean }>) {
//   const alias = this.expressionMap.mainAlias;

//   if (!options?.takeAll) {
//     this.offset(pageOptionsDto.skip).limit(pageOptionsDto.take);
//   }

//   if (pageOptionsDto?.q && pageOptionsDto.qColumnNames?.length) {
//     this.searchByString(pageOptionsDto.q, castArray(pageOptionsDto.qColumnNames), alias?.name);
//   }

//   if (pageOptionsDto?.order && pageOptionsDto?.orderColumnName) {
//     const key = alias?.name ? `${alias.name}.${pageOptionsDto?.orderColumnName}` : pageOptionsDto?.orderColumnName;
//     this.orderBy({ [key]: pageOptionsDto.order });
//   }

//   const [itemCount, raws] = await Promise.all([this.getCount(), this.getRawMany()]);
//   const pageMetaDto = new OffsetPageMetaDto({ itemCount, pageOptionsDto });
//   return [raws, pageMetaDto];
// };

SelectQueryBuilder.prototype.getMany = async function () {
  const { entities, raw } = await this.getRawAndEntities();

  const items = entities.map((entity, index) => {
    const metaInfo = Reflect.getMetadata(VIRTUAL_COLUMN_KEY, entity) ?? {};
    const item = raw[index];

    for (const [propertyKey, name] of Object.entries<string>(metaInfo)) {
      entity[propertyKey] = item[name];
    }

    return entity;
  });

  return [...items];
};
