/* eslint-disable @typescript-eslint/naming-convention */
import { Enum, EnumType } from 'ts-jenum';

export type EOrderProps = 'ASC' | 'DESC';

@Enum('code')
export class EOrder extends EnumType<EOrder>() {
  static readonly ASC: EOrder = new EOrder('ASC');
  static readonly DESC: EOrder = new EOrder('DESC');

  private constructor(private readonly _code: EOrderProps) {
    super();
  }

  get code(): EOrderProps {
    return this._code;
  }

  static asString(): string[] {
    return this.values().map((v) => v.code);
  }
}
