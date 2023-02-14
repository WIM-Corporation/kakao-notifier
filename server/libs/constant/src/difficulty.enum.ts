/* eslint-disable @typescript-eslint/naming-convention */
import { Enum, EnumType } from 'ts-jenum';

export type EDifficultyProps = 'LOW' | 'MIDDLE' | 'HIGH' | 'HIGHEST';

@Enum('code')
export class EDifficulty extends EnumType<EDifficulty>() {
  static readonly LOW: EDifficulty = new EDifficulty('LOW', '(하)', 1);
  static readonly MIDDLE: EDifficulty = new EDifficulty('MIDDLE', '(중)', 2);
  static readonly HIGH: EDifficulty = new EDifficulty('HIGH', '(상)', 3);
  static readonly HIGHEST: EDifficulty = new EDifficulty('HIGHEST', '(최상)', 4);

  private constructor(private readonly _code: EDifficultyProps, private readonly _name: string, private readonly _sort: number) {
    super();
  }

  get code(): EDifficultyProps {
    return this._code;
  }

  get name(): string {
    return this._name;
  }

  /** 피드에서 정렬을 위한 값 */
  get sort(): number {
    return this._sort;
  }

  static pick(...props: EDifficultyProps[]): EDifficulty[] {
    return this.values().filter((e) => props.map((v) => v.toString()).includes(e.code));
  }

  static omit(...props: EDifficultyProps[]): EDifficulty[] {
    return this.values().filter((e) => !props.map((v) => v.toString()).includes(e.code));
  }

  static asString(): string[] {
    return this.values().map((v) => v.code.toString());
  }
}
