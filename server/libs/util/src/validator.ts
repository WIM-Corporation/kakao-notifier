import { ArgumentInvalidException } from '@libs/exception';
import bcrypt from 'bcryptjs';
import { has, isArray } from 'lodash';

export class Validator {
  static async compareHash(value: Optional<string>, hash: Optional<string>): Promise<boolean> {
    if (!value || !hash) {
      return Promise.resolve(false);
    }

    return bcrypt.compare(value, hash);
  }

  static isJson(value: string): boolean {
    try {
      JSON.parse(value);
    } catch (e) {
      return false;
    }
    return true;
  }

  static isBusinessRegistrationNumber(value: string): boolean {
    const valueMap = value
      .replace(/-/gi, '')
      .split('')
      .map((item) => parseInt(item, 10));

    if (valueMap.length === 10) {
      const multiply = [1, 3, 7, 1, 3, 7, 1, 3, 5];
      let checkSum = 0;

      for (let i = 0; i < multiply.length; i += 1) {
        checkSum += multiply[i] * valueMap[i];
      }

      checkSum += parseInt(((multiply[8] * valueMap[8]) / 10).toString(), 10);
      return Math.floor(valueMap[9]) === 10 - (checkSum % 10);
    }

    return false;
  }

  static hasElementArray(value?: any): value is any[] {
    return isArray(value) && !!value.length;
  }

  static isEmpty(value: unknown): boolean {
    if (typeof value === 'number' || typeof value === 'boolean') {
      return false;
    }
    if (typeof value === 'undefined' || value === null) {
      return true;
    }
    if (value instanceof Date) {
      return false;
    }
    if (value instanceof Object && !Object.keys(value).length) {
      return true;
    }
    if (Array.isArray(value)) {
      if (value.length === 0) {
        return true;
      }
      if (value.every((item) => this.isEmpty(item))) {
        return true;
      }
    }
    if (value === '') {
      return true;
    }

    return false;
  }

  static compareLength(a: any[], b: any[]): void {
    if (a.length !== b.length) throw new ArgumentInvalidException('배열의 개수가 일치하지 않습니다.');
  }

  static hasMultipleKeys(object: object, keys: string[]) {
    return keys.every(has.bind(null, object));
  }
}
