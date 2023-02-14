import { ConfigService } from '@libs/config';
import { CacheModule, CacheModuleOptions, Global, Module, Provider } from '@nestjs/common';
import { ConfigService as NestConfigService } from '@nestjs/config';
import { StoreConfig } from 'cache-manager';
import * as redisStore from 'cache-manager-ioredis';
import { RedisClient } from './redis-client';

@Global()
@Module({
  imports: [
    CacheModule.registerAsync({
      useFactory: (configService: NestConfigService) => ({
        ...(configService.get('redis') as CacheModuleOptions<StoreConfig>),
        store: redisStore,
      }),
      inject: [NestConfigService],
    }),
  ],
  providers: [RedisClient, ConfigService],
  exports: [RedisClient, CacheModule],
})
export class RedisModule {}
