import ms from 'ms';
import { msToSecond } from './utils';

export class SessionTime {
  static accessTokenExpireTime(): number {
    return msToSecond(ms('1 days'));
  }

  static refreshTokenExpireTime(): number {
    return msToSecond(ms('1 weeks'));
  }
}
