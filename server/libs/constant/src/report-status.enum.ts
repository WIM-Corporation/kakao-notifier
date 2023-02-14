/* eslint-disable @typescript-eslint/naming-convention */
import { Enum, EnumType } from 'ts-jenum';

export type EReportStatusProps = 'PENDING' | 'APPROVED' | 'REFUSED';

@Enum('code')
export class EReportStatus extends EnumType<EReportStatus>() {
  static readonly PENDING: EReportStatus = new EReportStatus('PENDING', '처리전');
  static readonly APPROVED: EReportStatus = new EReportStatus('APPROVED', '승인');
  static readonly REFUSED: EReportStatus = new EReportStatus('REFUSED', '반려');

  private constructor(private readonly _code: EReportStatusProps, private readonly _name: string) {
    super();
  }

  get code(): EReportStatusProps {
    return this._code;
  }

  get name(): string {
    return this._name;
  }

  static asString(): string[] {
    return this.values().map((v) => v.code);
  }

  equals(code: EReportStatusProps): boolean {
    return this._code === code;
  }
}
