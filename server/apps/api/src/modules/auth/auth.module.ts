import { JwtRefreshGuard } from '@libs/guard';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService, JwtSessionManager } from './application';
import { AuthController, AuthSerializer, JwtAccessStrategy, JwtRefreshStrategy, PublicStrategy } from './interface';

@Module({
  imports: [JwtModule.register({})],
  controllers: [AuthController],
  providers: [JwtRefreshGuard, JwtSessionManager, AuthService, AuthSerializer, JwtAccessStrategy, JwtRefreshStrategy, PublicStrategy],
  exports: [JwtSessionManager, AuthService, JwtModule],
})
export class AuthModule {}
