import { BasePublisher } from '@libs/base';
import { InjectQueue } from '@nestjs/bull';
import { Injectable, Logger } from '@nestjs/common';
import { FcmMessage } from '@wim-backend/firebase';
import { Queue } from 'bull';
import { compact, uniq } from 'lodash';
import { EMessageQueue } from '../queue.enum';
import { EFcmJob } from './job.enum';

@Injectable()
export class FcmPublisher extends BasePublisher {
  private readonly logger: Logger = new Logger(FcmPublisher.name);
  constructor(@InjectQueue(EMessageQueue.FCM_NOTIFICATION.code) private readonly queue: Queue) {
    super();
  }

  async add(data: FcmMessage): Promise<void> {
    data.receiverToken = uniq(compact(data.receiverToken));
    if (!data.receiverToken.length) {
      this.logger.warn('fcm 수신자 토큰이 없습니다.');
      return;
    }
    await this.queue.add(EFcmJob.CREATE_FCM.code, data, { ...super.backOffOption, attempts: 10 });
  }
}
