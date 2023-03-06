import 'reflect-metadata';
import { ClassSerializerInterceptor, Logger as NestLogger, ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { initializeTransactionalContext } from 'typeorm-transactional';
import { LoggingInterceptor } from '@libs/interceptor';
import { AppModule, setNestApp } from '.';

async function bootstrap(): Promise<string> {
  initializeTransactionalContext();
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    bufferLogs: true,
    abortOnError: true,
  });

  process.on('SIGTERM', async () => {
    await app.close();
    process.exit(0);
  });

  process.on('SIGINT', async () => {
    await app.close();
    process.exit(0);
  });

  app.enableVersioning({ type: VersioningType.URI });
  app.setGlobalPrefix('/api');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      // forbidNonWhitelisted: false,
      validateCustomDecorators: true,
      disableErrorMessages: false,
      transform: true,
    }),
  );
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)), await app.resolve(LoggingInterceptor));

  setNestApp(app);

  try {
    console.log(process.env.PORT);
    await app.listen(process.env.PORT || 5000);
    return app.getUrl();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

(async (): Promise<void> => {
  try {
    const url = await bootstrap();
    NestLogger.log(url, 'Bootstrap');
  } catch (error) {
    NestLogger.error(error, 'Bootstrap');
  }
})();
