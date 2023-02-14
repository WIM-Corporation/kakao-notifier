import { JobOptions } from 'bull';

export abstract class BasePublisher {
  protected backOffOption: JobOptions = {
    attempts: 5,
    backoff: {
      type: 'exponential',
      delay: 1000,
    },
  };

  constructor(options?: JobOptions) {
    this.backOffOption = { ...this.backOffOption, ...options };
  }
}
