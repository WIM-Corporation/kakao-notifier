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

  // @ApiOperation({ summary: '프로필 조회, 학생, 튜터, 관리자' })
  // @ApiOkResponse({ type: UserProfileDto })
  // @HttpCode(HttpStatus.OK)
  // @Auth([ERole.STUDENT, ERole.TUTOR, ERole.ADMIN])
  // @Get('profile/:userId')
  // async getProfile(@Param('userId') userId: string): Promise<UserProfileDto> {
  //   return this.userService.getProfile(userId);
  // }

  // @ApiOperation({ summary: 'fcm 토큰 갱신, 학생, 튜터, 관리자' })
  // @ApiAcceptedResponse()
  // @HttpCode(HttpStatus.ACCEPTED)
  // @Auth([ERole.STUDENT, ERole.TUTOR, ERole.ADMIN])
  // @Patch('token')
  // async updateFcmToken(@ReqUser() user: Payload, @Body() updateFcmTokenDto: UpdateFcmTokenDto): Promise<void> {
  //   updateFcmTokenDto.id = user.id;
  //   await this.userService.updateFcmToken(updateFcmTokenDto);
  // }
}
