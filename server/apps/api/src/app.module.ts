import { AuthModule } from '@api/modules/auth';
import { configuration } from '@libs/config';
import { HttpExceptionsFilter } from '@libs/filter';
import { ThrottlerBehindProxyGuard } from '@libs/guard';
import { LoggerMiddleware } from '@libs/middleware';
import { BaseModule } from '@libs/modules/base';
import { UserModule } from '@api/modules/user';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { ThrottlerModule } from '@nestjs/throttler';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';
import '@libs/util/expand-prototype';
import { DataSource } from 'typeorm';
import { addTransactionalDataSource } from 'typeorm-transactional';
import { TypeOrmPoolFactory } from '@libs/pool-manager';
import { KakaoModule, KakaoModuleOptions } from '@wim-backend/kakao';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      envFilePath: '.env',
    }),

    TypeOrmModule.forRootAsync({
      useFactory: (poolFactory: TypeOrmPoolFactory) => {
        return {
          ...poolFactory.createTypeOrmOptions(),
          pool: poolFactory.createPool(),
        };
      },
      dataSourceFactory: async (options): Promise<DataSource> => {
        if (!options) {
          throw new Error('Invalid options passed');
        }
        return addTransactionalDataSource(await new DataSource(options).initialize());
      },

      inject: [TypeOrmPoolFactory],
    }),

    ThrottlerModule.forRoot(),

    KakaoModule.forRootAsync({
      useFactory: (configService: ConfigService) =>
        ({
          restApiKey: configService.get('kakao.restApiKey'),
          redirectUri: configService.get('kakao.redirectUri'),
        } as KakaoModuleOptions),
      inject: [ConfigService],
    }),

    ServeStaticModule.forRoot({
      rootPath: `${__dirname}/../public`,
      renderPath: '/',
    }),

    BaseModule,
    AuthModule,
    UserModule,
  ],
  providers: [
    { provide: APP_FILTER, useClass: HttpExceptionsFilter },
    { provide: APP_GUARD, useClass: ThrottlerBehindProxyGuard },
  ],
})
export class AppModule implements NestModule {
  // Global Middleware, Inbound logging
  public configure(consumer: MiddlewareConsumer): void {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
