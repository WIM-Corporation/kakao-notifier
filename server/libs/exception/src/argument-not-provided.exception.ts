import { InternalServerErrorException } from '@nestjs/common';

export class ArgumentNotProvidedException extends InternalServerErrorException {
  constructor(error?: string) {
    super('인자가 제공되지 않았습니다.', error);
  }
}
