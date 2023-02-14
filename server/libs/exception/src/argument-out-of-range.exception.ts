import { InternalServerErrorException } from '@nestjs/common';

export class ArgumentOutOfRangeException extends InternalServerErrorException {
  constructor(error?: string) {
    super('초과된 인자입니다.', error);
  }
}
