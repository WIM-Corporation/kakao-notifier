/* eslint-disable @typescript-eslint/naming-convention */
import { BullModuleOptions } from '@nestjs/bull';
import { Enum, EnumType } from 'ts-jenum';

export type EFcmJobProps = 'CREATE_FCM';

@Enum('code')
export class EFcmJob extends EnumType<EFcmJob>() {
  static readonly CREATE_FCM: EFcmJob = new EFcmJob('CREATE_FCM');

  protected constructor(private readonly _code: EFcmJobProps) {
    super();
  }

  get code(): EFcmJobProps {
    return this._code;
  }

  equals(code: string): boolean {
    return this.code === code;
  }

  static asBullModuleOptions(): BullModuleOptions[] {
    return this.values().map((v) => ({ name: v.code }));
  }
}
