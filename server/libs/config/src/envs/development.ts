import { TypeORMCustomLogger } from '@libs/middleware';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

export const config = {
  db: {
    retryAttempts: 1,
    retryDelay: 1000,
    type: process.env.DEV_DB_TYPE,
    synchronize: false,
    logging: true,
    logger: new TypeORMCustomLogger(),
    namingStrategy: new SnakeNamingStrategy(),
    host: process.env.DEV_DB_HOST,
    port: process.env.DEV_DB_PORT,
    username: process.env.DEV_DB_USER,
    password: process.env.DEV_DB_PASSWORD,
    database: process.env.DEV_DB_DATABASE,
    maxQueryExecutionTime: process.env.DEV_MAX_QUERY_EXECUTION_TIME,
    extra: {
      connectionLimit: 30,
    },
    autoLoadEntities: true,
    entities: ['dist/**/*.entity.js'],
    // NODE_ENV test 시 ts로 엔티티 찾아야 할 듯?

    // subscribers: ['dist/**/subscriber/**/*.subscriber.{ts,js}'],
    // entities: [path.resolve(__dirname, '**/*.entity{.ts,.js}')],
    // migrations: [`${__dirname}/../migration/**/*.{js,ts}`],
  },
  redis: {
    host: process.env.DEV_REDIS_HOST,
    port: +process.env.DEV_REDIS_PORT,
    ttl: +process.env.DEV_REDIS_TTL,
    password: process.env.DEV_REDIS_PASS,
    db: +process.env.DEV_REDIS_DB,
  },
  throttle: {
    ttl: process.env.DEV_THROTTLE_TTL,
    limit: process.env.DEV_THROTTLE_LIMIT,
  },
  batch: {
    origin: process.env.DEV_BATCH_ORIGIN,
  },
};
