/* eslint-disable @typescript-eslint/naming-convention */
import { Enum, EnumType } from 'ts-jenum';

type EGenderProps = 'F' | 'M';

@Enum('code') // (1)
export class EGender extends EnumType<EGender>() {
  static readonly FEMALE: EGender = new EGender('F', '여성');
  static readonly MALE: EGender = new EGender('M', '남성');

  private constructor(private readonly _code: string, private readonly _gender: string) {
    super();
  }

  get code(): string {
    return this._code;
  }

  get gender(): string {
    return this._gender;
  }

  equals(code: EGenderProps): boolean {
    return this.code === code;
  }

  static pick(...props: EGenderProps[]): EGender[] {
    return this.values().filter((e) => props.map((v) => v.toString()).includes(e.code.toString()));
  }

  static omit(...props: EGenderProps[]): EGender[] {
    return this.values().filter((e) => !props.map((v) => v.toString()).includes(e.code.toString()));
  }

  static asString(): string[] {
    return this.values().map((v) => v.code.toString());
  }
}
