import { faker } from '@faker-js/faker';
import { AuthService } from '@api/modules/auth';
import { SignupUserDto, TokenInjectedUserDto, UserService } from '@api/modules/user';
import { Public } from '@libs/decorator';
import { Body, Controller, Get, HttpCode, HttpStatus, Post, Query, NotFoundException, ForbiddenException } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags, ApiOkResponse } from '@nestjs/swagger';
import { FcmMessage } from '@wim-backend/firebase';
import { DataBindingToken } from '../application';

@ApiTags('oauth - fake')
@Controller({ path: 'oauth/fake', version: ['1'] })
export class FakeController {
  constructor(private readonly authService: AuthService, private readonly userService: UserService) {}

  @Public()
  @ApiOperation({ summary: 'fake login' })
  @ApiCreatedResponse({ type: DataBindingToken })
  @HttpCode(HttpStatus.CREATED)
  @Get('login')
  async fakeLoginWithSignup(): Promise<DataBindingToken> {
    const fakeUser = new SignupUserDto({ displayName: faker.name.fullName(), avatar: faker.internet.avatar() });
    const userDto = await this.userService.signup(fakeUser);
    const payload = TokenInjectedUserDto.from(userDto);
    const jwtToken = await this.authService.signJwt(payload);
    return new DataBindingToken(jwtToken, payload);
  }
}
