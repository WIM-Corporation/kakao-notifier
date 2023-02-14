import { ConfigService } from '@libs/config';
import { RolesGuard } from '@libs/guard';
import { AuthUserInterceptor, LoggingInterceptor } from '@libs/interceptor';
import { CustomLogger as Logger, LoggerMiddleware, RequestContext } from '@libs/middleware';
import { HttpModule } from '@nestjs/axios';
import { Global, Module } from '@nestjs/common';
import { HealthModule } from '@libs/modules/health';
import { MetricsModule } from '@libs/modules/metrics';
import { PrometheusModule } from '@libs/modules/prometheus';
import { JwtModule } from '@nestjs/jwt';

const guards = [RolesGuard];
const loggers = [Logger, LoggerMiddleware];
const contexts = [RequestContext];
const interceptors = [AuthUserInterceptor, LoggingInterceptor];

@Global()
@Module({
  imports: [JwtModule.register({}), HealthModule, PrometheusModule, MetricsModule, HttpModule],
  providers: [ConfigService, ...guards, ...loggers, ...contexts, ...interceptors],
  exports: [HttpModule, ConfigService, ...guards, ...loggers, ...contexts, ...interceptors],
})
export class BaseModule {}
