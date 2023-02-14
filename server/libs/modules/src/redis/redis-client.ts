import { ConfigService } from '@nestjs/config';
import { CACHE_MANAGER, Inject, Injectable, Logger } from '@nestjs/common';
import { Cache } from 'cache-manager';
import Redis, { RedisOptions } from 'ioredis';

@Injectable()
export class RedisClient extends Redis {
  constructor(
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
    private readonly configService: ConfigService,
  ) {
    super({ ...(configService.get('redis') as unknown as RedisOptions) });
  }

  get manager(): Cache {
    return this.cacheManager;
  }
}
