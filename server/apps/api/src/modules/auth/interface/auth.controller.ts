import { ERole } from '@libs/constant';
import { Auth, Public, ReqUser } from '@libs/decorator';
import { JwtRefreshGuard } from '@libs/guard';
import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService, JwtSessionManager, JwtToken } from '../application';

@ApiTags('oauth')
@Controller({ path: 'oauth', version: ['1'] })
export class AuthController {
  constructor(private readonly authService: AuthService, private readonly jwtSessionManager: JwtSessionManager) {}

  // @Public()
  // @ApiOperation({ summary: '회원가입' })
  // @ApiCreatedResponse({ type: UserDto })
  // @HttpCode(HttpStatus.CREATED)
  // @Post('signup')
  // async signup(@Body() signupUserDto: SignupUserDto): Promise<UserDto> {}

  @ApiOperation({ summary: 'refresh' })
  @ApiBearerAuth('jwt')
  @ApiOkResponse({ type: JwtToken })
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtRefreshGuard)
  @Post('refresh')
  refresh(@ReqUser() token: JwtToken): JwtToken {
    return token;
  }

  @ApiOperation({ summary: '로그아웃' })
  @ApiOkResponse()
  @HttpCode(HttpStatus.OK)
  @Auth([ERole.USER, ERole.ADMIN])
  @Post('signout')
  async signout(@ReqUser() user: Payload): Promise<void> {
    await this.jwtSessionManager.signout(user.id);
  }
}
