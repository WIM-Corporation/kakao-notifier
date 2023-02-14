/* eslint-disable @typescript-eslint/naming-convention */
import { Enum, EnumType } from 'ts-jenum';

export type EOrderItemProps = 'BASIC' | 'BASIC_PLUS' | 'PREMIUM';
type ItemType = 'POINT' | 'LICENSE';

@Enum('code')
export class EOrderItem extends EnumType<EOrderItem>() {
  // static readonly BASIC: EOrderItem = new EOrderItem('BASIC', '베이직', 100, 30000, 'POINT');
  // static readonly BASIC_PLUS: EOrderItem = new EOrderItem('BASIC_PLUS', '베이직 플러스', 200, 66000, 'POINT');
  // static readonly PREMIUM: EOrderItem = new EOrderItem('PREMIUM', '프리미엄 월 이용권', 50, 0, 'LICENSE');
  static readonly BASIC: EOrderItem = new EOrderItem('BASIC', '베이직', 33000, 30000, 'POINT');
  static readonly BASIC_PLUS: EOrderItem = new EOrderItem('BASIC_PLUS', '베이직 플러스', 66000, 66000, 'POINT');
  static readonly PREMIUM: EOrderItem = new EOrderItem('PREMIUM', '프리미엄 월 이용권', 5500, 0, 'LICENSE');

  private constructor(
    private readonly _code: EOrderItemProps,
    private readonly _name: string,
    private readonly _price: number,
    private readonly _chargedCash: number,
    private readonly _type: ItemType,
  ) {
    super();
  }

  get code(): EOrderItemProps {
    return this._code;
  }

  get name(): string {
    return this._name;
  }

  get price(): number {
    return this._price;
  }

  get chargedCash(): number {
    return this._chargedCash;
  }

  equals(code: string | EOrderItem): boolean {
    if (typeof code === 'string') return this.code === code;
    return this === code;
  }

  isPoint(): boolean {
    return this._type === 'POINT';
  }

  isLicense(): boolean {
    return this._type === 'LICENSE';
  }

  static pick(...props: EOrderItemProps[]): EOrderItem[] {
    return this.values().filter((e) => props.map((v) => v.toString()).includes(e.code.toString()));
  }

  static omit(...props: EOrderItemProps[]): EOrderItem[] {
    return this.values().filter((e) => !props.map((v) => v.toString()).includes(e.code.toString()));
  }

  static asString(): string[] {
    return this.values().map((v) => v.code.toString());
  }
}
