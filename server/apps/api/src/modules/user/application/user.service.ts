import { ConflictException, ForbiddenException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { User } from '../domain';
import { UserCommandRepository, UserQueryRepository } from '../infrastructure';
import { SignupUserDto, UserDto } from './dto';

@Injectable()
export class UserService {
  private readonly logger: Logger = new Logger(UserService.name);

  constructor(private readonly query: UserQueryRepository, private readonly command: UserCommandRepository) {}

  async findById(id: string): Promise<UserDto | undefined> {
    const user = await this.query.findById(id);
    return user ? UserDto.from(user) : undefined;
  }

  async isDuplicatedDisplayName(displayName: string): Promise<boolean> {
    return this.query.exists({ where: { displayName } });
  }

  async getProfile(id: string): Promise<UserDto> {
    const user = await this.query.getById(id);
    return UserDto.from(user);
  }

  async signup(signupUserDto: SignupUserDto): Promise<UserDto> {
    const user = signupUserDto.toUser();
    const duplicated = await this.isDuplicatedDisplayName(user.displayName);
    if (duplicated) throw new ConflictException('이미 사용중인 닉네임입니다.');
    await this.command.save(user);
    return UserDto.from(user);
  }
}
