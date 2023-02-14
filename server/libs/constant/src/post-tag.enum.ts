/* eslint-disable @typescript-eslint/naming-convention */
import { Enum, EnumType } from 'ts-jenum';

export type EPostTagProps = 'ANSWER' | 'SOLVING';

@Enum('code')
export class EPostTag extends EnumType<EPostTag>() {
  static readonly QUESTION: EPostTag = new EPostTag('ANSWER');
  static readonly SOLVING: EPostTag = new EPostTag('SOLVING');

  private constructor(private readonly _code: EPostTagProps) {
    super();
  }

  get code(): EPostTagProps {
    return this._code;
  }

  equals(code: string | EPostTag | undefined): boolean {
    if (!code) return false;
    if (typeof code === 'string') return this.code === code;
    return this.code === code.code;
  }
}
