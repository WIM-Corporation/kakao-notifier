import { BadRequestException, Query, Res } from '@nestjs/common';
import { Body, Controller, Get, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { KakaoAuthService, KakaoFriendService } from '@wim-backend/kakao';
import { AuthService, JwtToken } from '../application';
import { UserService } from '@api/modules/user';
import { KakaoAuthorizePayload, KakaoTokenPayload } from '@wim-backend/kakao';

@ApiTags('oauth')
@Controller({ path: 'oauth', version: ['1'] })
export class AuthController {
  constructor(private readonly authService: AuthService, private readonly kakaoAuthService: KakaoAuthService, private readonly userService: UserService) {}

  @ApiOperation({ summary: 'login' })
  @HttpCode(HttpStatus.FOUND)
  @Get('kakao')
  login(@Res() res: Response): void {
    res.redirect(this.kakaoAuthService.authorize());
  }

  @ApiOperation({ summary: 'callback' })
  @ApiOkResponse({ type: JwtToken })
  @HttpCode(HttpStatus.OK)
  @Get('kakao/callback')
  async callback(@Query() { code, error, error_description, state }: KakaoAuthorizePayload): Promise<JwtToken> {
    if (!code) {
      throw new BadRequestException(`code: ${code}, error: ${error}, error_description: ${error_description}, state: ${state}`);
    }
    const token = await this.kakaoAuthService.getToken(code);
    const myInfo = await this.kakaoAuthService.requestMe(token.access_token);

    return await this.authService.signIn(myInfo, token);
  }

  // @ApiOperation({})
  // @HttpCode(HttpStatus.OK)
  // @Get('test')
  // async test(): Promise<any> {
  //   return this.kakaoAuthService.requestMe('TrLGz_KdyaS05SUrOLPd8C2xyTqnZh4WpG1fUurtCj11mwAAAYa2KHiw');
  // return await this.kakaoAuthService.requestMe('TrLGz_KdyaS05SUrOLPd8C2xyTqnZh4WpG1fUurtCj11mwAAAYa2KHiw');
  // return await this.kakaoFriendService.getFriends(
  //   { offset: 0, limit: 100, order: 'asc', friend_order: 'nickname' },
  //   '7IJGGtn0fCak-dytn2ItDel8tQE-Mk5yaQ968L9hCj10mQAAAYa2JxX8',
  // );
  // }

  // @ApiOperation({ summary: 'refresh' })
  // @ApiBearerAuth('jwt')
  // @ApiOkResponse({ type: JwtToken })
  // @HttpCode(HttpStatus.OK)
  // @UseGuards(JwtRefreshGuard)
  // @Post('refresh')
  // refresh(@ReqUser() token: JwtToken): JwtToken {
  //   return token;
  // }

  // @ApiOperation({ summary: '로그아웃' })
  // @ApiOkResponse()
  // @HttpCode(HttpStatus.OK)
  // @Auth([ERole.USER, ERole.ADMIN])
  // @Post('signout')
  // async signout(@ReqUser() user: Payload): Promise<void> {
  //   await this.jwtSessionManager.signout(user.id);
  // }
}
