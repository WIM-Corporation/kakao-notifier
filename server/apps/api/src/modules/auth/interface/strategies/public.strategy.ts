import { TokenInjectedUserDto } from '@api/modules/user';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport';

@Injectable()
export class PublicStrategy extends PassportStrategy(Strategy, 'isPublic') {
  override authenticate(): void {
    // success 리턴한다고 요청을 바로 끝내버리는게 아님. role guard 까지 진행되고, user 객체에 더미 데이터를 심어주는 역할을 함
    return this.success(
      new TokenInjectedUserDto({
        [Symbol.for('isPublic')]: true,
        id: '',
        displayName: '',
        avatar: '',
      }),
    );
  }
}
