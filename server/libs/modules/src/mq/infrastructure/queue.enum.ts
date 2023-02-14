/* eslint-disable @typescript-eslint/naming-convention */
import { BullModuleOptions } from '@nestjs/bull';
import { Enum, EnumType } from 'ts-jenum';

export type EMessageQueueProps = 'FCM_NOTIFICATION';

@Enum('code')
export class EMessageQueue extends EnumType<EMessageQueue>() {
  static readonly FCM_NOTIFICATION: EMessageQueue = new EMessageQueue('FCM_NOTIFICATION');

  protected constructor(private readonly _code: EMessageQueueProps) {
    super();
  }

  get code(): EMessageQueueProps {
    return this._code;
  }

  static pick(...props: EMessageQueueProps[]): EMessageQueue[] {
    return this.values().filter((e) => props.map((v) => v.toString()).includes(e.code.toString()));
  }

  static omit(...props: EMessageQueueProps[]): EMessageQueue[] {
    return this.values().filter((e) => !props.map((v) => v.toString()).includes(e.code.toString()));
  }

  static asString(): string[] {
    return this.values().map((v) => v.code.toString());
  }

  static asBullModuleOptions(): BullModuleOptions[] {
    return this.values().map((v) => ({ name: v.code }));
  }

  equals(code: string): boolean {
    return this.code === code;
  }
}
