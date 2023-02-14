import { BullModule } from '@nestjs/bull';
import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EMessageQueue, FcmPublisher } from './infrastructure';

@Global()
@Module({
  imports: [
    BullModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        redis: {
          host: configService.get('redis.host'),
          port: +configService.get('redis.port'),
          password: configService.get('redis.password'),
          db: configService.get('redis.db'),
        },
      }),
      inject: [ConfigService],
    }),

    BullModule.registerQueue(...EMessageQueue.asBullModuleOptions()),
  ],
  providers: [FcmPublisher],
  exports: [FcmPublisher],
})
export class MqModule {}
