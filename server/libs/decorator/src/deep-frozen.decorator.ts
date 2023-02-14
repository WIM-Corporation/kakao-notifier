/* eslint-disable @typescript-eslint/ban-types */
import { deepFreeze } from '@libs/util';

export function DeepFrozen(target: Function): void {
  deepFreeze(target);
  deepFreeze(target.prototype);
}
