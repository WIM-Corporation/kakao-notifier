import { ERole } from '@libs/constant';
import { ApiOffsetPageOkResponse, Auth, ReqUser } from '@libs/decorator';
import { OffsetPageDto } from '@libs/meta';
import { Controller, Get, HttpCode, HttpStatus, Param, Query } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CheckAvailableDisplayNameDto, SearchUserDto, UserService, UserThumbnailDto } from '../application';

@ApiTags('user')
@Controller({ path: 'users', version: ['1'] })
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: '유저검색, 사용자, 관리자' })
  @ApiOffsetPageOkResponse({ type: UserThumbnailDto })
  @HttpCode(HttpStatus.OK)
  @Auth([ERole.USER, ERole.ADMIN])
  @Get()
  async searchUsers(@ReqUser() user: Payload, @Query() searchUserDto: SearchUserDto): Promise<OffsetPageDto<any> | any> {}

  @ApiOperation({ summary: '닉네임 중복확인, 공용' })
  @ApiOkResponse({ type: Boolean })
  @HttpCode(HttpStatus.OK)
  @Auth([], { public: true })
  @Get('duplicate')
  async checkAvailableDisplayName(@Query() checkAvailableDisplayNameDto: CheckAvailableDisplayNameDto): Promise<boolean> {
    return this.userService.isDuplicatedDisplayName(checkAvailableDisplayNameDto.displayName);
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
