import { ConfigService } from '@libs/config';
import { AuthUserInterceptor, LoggingInterceptor } from '@libs/interceptor';
import { CustomLogger as Logger, LoggerMiddleware, RequestContext } from '@libs/middleware';
import { HttpModule } from '@nestjs/axios';
import { Global, Module } from '@nestjs/common';
import { HealthModule } from '@libs/modules/health';
import { MetricsModule } from '@libs/modules/metrics';
import { PrometheusModule } from '@libs/modules/prometheus';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmPoolFactory } from '@libs/pool-manager';

const loggers = [Logger, LoggerMiddleware];
const contexts = [RequestContext];
const interceptors = [AuthUserInterceptor, LoggingInterceptor];

@Global()
@Module({
  imports: [JwtModule.register({}), HealthModule, PrometheusModule, MetricsModule, HttpModule],
  providers: [ConfigService, TypeOrmPoolFactory, ...loggers, ...contexts, ...interceptors],
  exports: [HttpModule, ConfigService, TypeOrmPoolFactory, ...loggers, ...contexts, ...interceptors],
})
export class BaseModule {}
