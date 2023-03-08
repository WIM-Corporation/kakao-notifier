import { Auth, ReqUser } from '@libs/decorator';
import { Controller, Get, HttpCode, HttpStatus, Param, Query } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserService, UserProfileDto } from '../application';

@ApiTags('user')
@Controller({ path: 'users', version: ['1'] })
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: '프로필 조회' })
  @ApiOkResponse({ type: UserProfileDto })
  @HttpCode(HttpStatus.OK)
  @Auth()
  @Get('me')
  async getMyProfile(@ReqUser() user: Payload): Promise<UserProfileDto> {
    return await this.userService.getProfile(user.id);
  }
}
