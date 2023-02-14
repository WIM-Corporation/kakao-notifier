/* eslint-disable @typescript-eslint/naming-convention */
import { Enum, EnumType } from 'ts-jenum';

export type EPostTypeProps = 'PERSONNEL_CONTENT' | 'QUESTION' | 'ANSWER';

@Enum('code')
export class EPostType extends EnumType<EPostType>() {
  static readonly PERSONNEL_CONTENT: EPostType = new EPostType('PERSONNEL_CONTENT', '일반컨텐츠');
  static readonly QUESTION: EPostType = new EPostType('QUESTION', '질문');
  static readonly ANSWER: EPostType = new EPostType('ANSWER', '답변');

  protected constructor(private readonly _code: EPostTypeProps, private readonly _desc: string) {
    super();
  }

  get code(): EPostTypeProps {
    return this._code;
  }

  equals(code: string | EPostType | undefined): boolean {
    if (!code) return false;
    if (typeof code === 'string') return this.code === code;
    return this.code === code.code;
  }

  static pick(...props: EPostTypeProps[]): EPostType[] {
    return this.values().filter((e) => props.map((v) => v.toString()).includes(e.code.toString()));
  }

  static omit(...props: EPostTypeProps[]): EPostType[] {
    return this.values().filter((e) => !props.map((v) => v.toString()).includes(e.code.toString()));
  }

  static asString(): string[] {
    return this.values().map((v) => v.code.toString());
  }
}
