/* eslint-disable @typescript-eslint/naming-convention */
import { Enum, EnumType } from 'ts-jenum';

export type EMemberStatusProps = 'APPROVED' | 'REFUSED' | 'WITHDREW' | 'PENDING';

@Enum('code')
export class EMemberStatus extends EnumType<EMemberStatus>() {
  static readonly PENDING: EMemberStatus = new EMemberStatus('PENDING', '대기');
  static readonly APPROVED: EMemberStatus = new EMemberStatus('APPROVED', '허용됨');
  static readonly REFUSED: EMemberStatus = new EMemberStatus('REFUSED', '거절됨');
  static readonly WITHDREW: EMemberStatus = new EMemberStatus('WITHDREW', '탈퇴됨');

  protected constructor(private readonly _code: EMemberStatusProps, private readonly _name: string) {
    super();
  }

  get code(): EMemberStatusProps {
    return this._code;
  }

  get name(): string {
    return this._name;
  }

  static pick(...props: EMemberStatusProps[]): EMemberStatus[] {
    return this.values().filter((e) => props.map((v) => v.toString()).includes(e.code.toString()));
  }

  static omit(...props: EMemberStatusProps[]): EMemberStatus[] {
    return this.values().filter((e) => !props.map((v) => v.toString()).includes(e.code.toString()));
  }

  static asString(): string[] {
    return this.values().map((v) => v.code.toString());
  }

  equals(code: string | EMemberStatus): boolean {
    if (typeof code === 'string') {
      return code === this.code;
    }
    return this === code;
  }
}
