import { ArgumentInvalidException } from '@libs/exception/argument-invalid.exception';
import { isDate } from 'lodash';
import { ValueTransformer } from 'typeorm';

export class DatetimeToTimestampTransformer implements ValueTransformer {
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  to(dateValue: number | string | Date) {
    const date = new Date(dateValue);
    if (dateValue && !isDate(date)) throw new ArgumentInvalidException('invalid date value');
    return dateValue && date;
  }

  from(databaseValue: string): number | undefined {
    if (databaseValue) return +new Date(databaseValue);
  }
}
