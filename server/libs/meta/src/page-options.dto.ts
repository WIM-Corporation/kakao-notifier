// eslint-disable-next-line max-classes-per-file
import { EnumFieldOptional, NumberFieldOptional, StringFieldOptional } from '@wim-backend/api-property';
import { IOrder, IQSearch } from '.';

export enum EOrder {
  ASC = 'ASC',
  DESC = 'DESC',
}

export class OffsetPageOptionsDto<T extends Array<string> = any, U extends string = any> implements IQSearch, IOrder {
  @EnumFieldOptional(() => EOrder, { default: EOrder.ASC })
  readonly order: EOrder = EOrder.DESC;

  @StringFieldOptional()
  readonly orderColumnName!: U;

  @NumberFieldOptional({ minimum: 1, default: 1, int: true })
  readonly page: number = 1;

  @NumberFieldOptional({ minimum: 1, maximum: 30, default: 20, int: true })
  readonly take: number = 20;

  @StringFieldOptional({ isArray: true })
  readonly qColumnNames?: T;

  @StringFieldOptional()
  readonly q?: string;

  get skip(): number {
    return (this.page - 1) * this.take;
  }
}

export class CursorPageOptionsProps<T extends Array<string> = any> implements IQSearch {
  readonly order?: EOrder;
  // readonly orderColumnName!: U;
  readonly qColumnNames?: T;
  readonly q?: string;
  readonly cursorName?: string;
  readonly cursor?: string;
  readonly take?: number;
}

export class CursorPageOptionsDto<T extends Array<string> = any> implements IQSearch {
  @EnumFieldOptional(() => EOrder, { default: EOrder.ASC })
  readonly order: EOrder = EOrder.DESC;

  @StringFieldOptional({ isArray: true })
  readonly qColumnNames?: T;

  @StringFieldOptional()
  readonly q?: string;

  @StringFieldOptional({ description: '커서 컬럼명' })
  readonly cursorName: string = 'id';

  @StringFieldOptional({ description: '커서 아이디 값' })
  readonly cursor?: string;

  @NumberFieldOptional({ minimum: 1, maximum: 30, default: 20, int: true })
  readonly take: number = 20;

  constructor(props: CursorPageOptionsProps) {
    if (props?.qColumnNames) this.qColumnNames = props.qColumnNames;
    if (props?.q) this.q = props.q;
    if (props?.cursorName) this.cursorName = props.cursorName;
    if (props?.cursor) this.cursor = props.cursor;
    if (props?.take) this.take = props.take;
  }
}
