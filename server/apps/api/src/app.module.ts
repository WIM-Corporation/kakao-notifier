import { AuthModule } from '@api/modules/auth';
import { configuration } from '@libs/config';
import { HttpExceptionsFilter } from '@libs/filter';
import { ThrottlerBehindProxyGuard } from '@libs/guard';
import { LoggerMiddleware } from '@libs/middleware';
import { BaseModule } from '@libs/modules/base';
import { RedisClient, RedisModule } from '@libs/modules/redis';
import { UserModule } from '@api/modules/user';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { ThrottlerModule } from '@nestjs/throttler';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ThrottlerStorageRedisService } from 'nestjs-throttler-storage-redis';
import { SlackModule } from '@wim-backend/slack';
import { ServeStaticModule } from '@nestjs/serve-static';
import '@libs/util/expand-prototype';
import { DataSource, DataSourceOptions } from 'typeorm';
import { addTransactionalDataSource } from 'typeorm-transactional';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      envFilePath: '.env',
    }),

    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        ...configService.get<TypeOrmModuleOptions>('db'),
      }),
      dataSourceFactory: async (options: DataSourceOptions) => {
        if (!options) {
          throw new Error('Invalid options passed');
        }
        return addTransactionalDataSource(new DataSource(options));
      },
      inject: [ConfigService],
    }),

    // FirebaseModule.forRootAsync({
    //   useFactory: (configService: ConfigService) => ({
    //     ...(configService.get('firebase') as FirebaseModuleOptions),
    //   }),
    //   inject: [ConfigService],
    // }),

    ThrottlerModule.forRootAsync({
      inject: [ConfigService, RedisClient],
      useFactory: (configService: ConfigService, redisClient: RedisClient) => ({
        ttl: +configService.get('throttle.ttl'),
        limit: +configService.get('throttle.limit'),
        storage: new ThrottlerStorageRedisService(redisClient),
      }),
    }),

    SlackModule.forRoot({}),

    ServeStaticModule.forRoot({
      rootPath: `${__dirname}/../public`,
      renderPath: '/',
    }),

    BaseModule,
    RedisModule,
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
