import { ConflictException, ForbiddenException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { KakaoTokenPayload, KakaoUserPayload } from '@wim-backend/kakao';
import { FindOneOptions } from 'typeorm';
import { User } from '../domain';
import { UserCommandRepository, UserQueryRepository } from '../infrastructure';
import { ApiKeyDto, SignUpUserDto, UserDto, UserProfileDto } from './dto';

@Injectable()
export class UserService {
  private readonly logger: Logger = new Logger(UserService.name);

  constructor(private readonly query: UserQueryRepository, private readonly command: UserCommandRepository) {}

  async findOne(options: FindOneOptions<User>): Promise<User | null> {
    return await this.query.findOne(options);
  }

  async findById(id: string): Promise<User | null> {
    return await this.query.findById(id);
  }

  async getById(id: string): Promise<User> {
    return await this.query.getById(id);
  }

  async checkDuplicate(id: string): Promise<boolean> {
    return this.query.exists({ where: { id } });
  }

  async signUpAndLogIn(myInfo: KakaoUserPayload, token: KakaoTokenPayload): Promise<User> {
    const duplicated = await this.checkDuplicate(myInfo.id);
    if (duplicated) throw new ConflictException('이미 가입한 회원입니다.');
    const user = User.from(SignUpUserDto.from(myInfo));
    return await this.logIn(user, token);
  }

  async logIn(user: User, token: KakaoTokenPayload): Promise<User> {
    user.login(token);
    return await this.command.save(user);
  }

  async getApiKey(apiKey: string): Promise<ApiKeyDto> {
    const user = await this.query.getOne({ where: { apiKey } });
    return ApiKeyDto.from(user);
  }

  async getProfile(id: string): Promise<UserProfileDto> {
    const user = await this.query.getById(id);
    return UserProfileDto.from(user);
  }
}
