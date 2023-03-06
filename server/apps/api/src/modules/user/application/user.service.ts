import { ConflictException, ForbiddenException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { KakaoTokenPayload, KakaoUserPayload } from '@wim-backend/kakao';
import { User } from '../domain';
import { UserCommandRepository, UserQueryRepository } from '../infrastructure';
import { SignUpUserDto, UserDto } from './dto';

@Injectable()
export class UserService {
  private readonly logger: Logger = new Logger(UserService.name);

  constructor(private readonly query: UserQueryRepository, private readonly command: UserCommandRepository) {}

  async findById(id: string): Promise<User | null> {
    return await this.query.findById(id);
  }

  async checkDuplicate(id: string): Promise<boolean> {
    return this.query.exists({ where: { id } });
  }

  async signUpAndLogIn(myInfo: KakaoUserPayload, token: KakaoTokenPayload): Promise<User> {
    const duplicated = await this.checkDuplicate(myInfo.id);
    if (duplicated) throw new ConflictException('이미 가입한 회원입니다.');
    const user = User.from(SignUpUserDto.from(myInfo));
    return await this.logIn(user, token, myInfo.connected_at);
  }

  async logIn(user: User, token: KakaoTokenPayload, connectedAt: Date): Promise<User> {
    user.login(token, connectedAt);
    return await this.command.save(user);
  }
}
