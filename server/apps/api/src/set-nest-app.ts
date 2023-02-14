import { INestApplication } from '@nestjs/common';
import compression from 'compression';
import { middleware as expressCtx } from 'express-ctx';
import helmet from 'helmet';
import { setupSwagger } from './setup-swagger';

export function setNestApp(app: INestApplication): INestApplication {
  const isProduction = process.env.NODE_ENV === 'production';
  if (!isProduction) {
    setupSwagger(app);
  }

  app.use(compression());
  app.use(helmet({ contentSecurityPolicy: isProduction ? undefined : false }));
  app.use(expressCtx);
  app.enableCors();

  return app;
}
