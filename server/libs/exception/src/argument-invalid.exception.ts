import { InternalServerErrorException } from '@nestjs/common';

export class ArgumentInvalidException extends InternalServerErrorException {
  constructor(error?: string) {
    super('잘못된 인자가 제공되었습니다.', error);
  }
}
