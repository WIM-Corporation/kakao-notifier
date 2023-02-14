/* eslint-disable @typescript-eslint/naming-convention */
import { Enum, EnumType } from 'ts-jenum';

type EInquiryStatusProps = 'WAITING' | 'PROCESS' | 'COMPLETE';

@Enum('code')
export class EInquiryStatus extends EnumType<EInquiryStatus>() {
  static readonly WAITING: EInquiryStatus = new EInquiryStatus('WAITING', '접수');
  static readonly PROCESS: EInquiryStatus = new EInquiryStatus('PROCESS', '확인중');
  static readonly COMPLETE: EInquiryStatus = new EInquiryStatus('COMPLETE', '답변완료');

  protected constructor(private readonly _code: EInquiryStatusProps, private readonly _name: string) {
    super();
  }

  get code(): EInquiryStatusProps {
    return this._code;
  }

  get name(): string {
    return this._name;
  }

  equals(code: string): boolean {
    return this.code === code;
  }

  static pick(...props: EInquiryStatusProps[]): EInquiryStatus[] {
    return this.values().filter((e) => props.map((v) => v.toString()).includes(e.code.toString()));
  }

  static omit(...props: EInquiryStatusProps[]): EInquiryStatus[] {
    return this.values().filter((e) => !props.map((v) => v.toString()).includes(e.code.toString()));
  }

  static asString(): string[] {
    return this.values().map((v) => v.code.toString());
  }
}
