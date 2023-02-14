/* eslint-disable @typescript-eslint/naming-convention */
import { Enum, EnumType } from 'ts-jenum';

export type EReportTypeProps = 'POST' | 'COMMENT' | 'NOTE' | 'ANSWER_CANCEL';

@Enum('code')
export class EReportType extends EnumType<EReportType>() {
  static readonly POST: EReportType = new EReportType('POST', '컨텐츠 신고');
  static readonly COMMENT: EReportType = new EReportType('COMMENT', '댓글 신고');
  static readonly NOTE: EReportType = new EReportType('NOTE', '쪽지 신고');
  static readonly ANSWER_CANCEL: EReportType = new EReportType('ANSWER_CANCEL', '질문 답변 취소 신고');

  private constructor(private readonly _code: EReportTypeProps, private readonly _name: string) {
    super();
  }

  get code(): EReportTypeProps {
    return this._code;
  }

  get name(): string {
    return this._name;
  }

  static asString(): string[] {
    return this.values().map((v) => v.code);
  }

  equals(code: EReportTypeProps | EReportType): boolean {
    if (typeof code === 'string') {
      return this._code === code;
    }
    return this._code === code.code;
  }
}
