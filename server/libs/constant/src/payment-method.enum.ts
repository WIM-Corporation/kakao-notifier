/* eslint-disable @typescript-eslint/naming-convention */
import { Enum, EnumType } from 'ts-jenum';

export type EPaymentMethodProps = 'CARD' | 'TRANS' | 'VBANK' | 'PHONE';

@Enum('code')
export class EPaymentMethod extends EnumType<EPaymentMethod>() {
  static readonly CARD: EPaymentMethod = new EPaymentMethod('CARD', '카드결제');
  static readonly TRANS: EPaymentMethod = new EPaymentMethod('TRANS', '실시간 계좌이체');
  // static readonly VBANK: EPaymentMethod = new EPaymentMethod('VBANK', '가상계좌');
  // static readonly PHONE: EPaymentMethod = new EPaymentMethod('PHONE', '휴대폰결제');

  protected constructor(private readonly _code: EPaymentMethodProps, private readonly _name: string) {
    super();
  }

  get code(): EPaymentMethodProps {
    return this._code;
  }

  get name(): string {
    return this._name;
  }

  equals(code: string | EPaymentMethod): boolean {
    if (typeof code === 'string') return this.code === code;
    return this === code;
  }

  static pick(...props: EPaymentMethodProps[]): EPaymentMethod[] {
    return this.values().filter((e) => props.map((v) => v.toString()).includes(e.code.toString()));
  }

  static omit(...props: EPaymentMethodProps[]): EPaymentMethod[] {
    return this.values().filter((e) => !props.map((v) => v.toString()).includes(e.code.toString()));
  }

  static asString(): string[] {
    return this.values().map((v) => v.code.toString());
  }
}
