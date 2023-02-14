import { TypeORMCustomLogger } from '@libs/middleware';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

export const config = {
  db: {
    retryAttempts: 1,
    retryDelay: 1000,
    type: process.env.TEST_DB_TYPE,
    synchronize: false,
    logging: false,
    logger: new TypeORMCustomLogger(),
    namingStrategy: new SnakeNamingStrategy(),
    replication: {
      master: {
        host: process.env.TEST_DB_HOST,
        port: process.env.TEST_DB_PORT,
        username: process.env.TEST_DB_USER,
        password: process.env.TEST_DB_PASSWORD,
        database: process.env.TEST_DB_DATABASE,
      },
      slaves: [
        {
          host: process.env.TEST_DB_HOST,
          port: process.env.TEST_DB_PORT,
          username: process.env.TEST_DB_USER,
          password: process.env.TEST_DB_PASSWORD,
          database: process.env.TEST_DB_DATABASE,
        },
      ],
    },
    maxQueryExecutionTime: process.env.TEST_MAX_QUERY_EXECUTION_TIME,
    extra: {
      connectionLimit: 30,
    },
    autoLoadEntities: true,
    entities: ['dist/**/*.entity.ts'],
  },
  redis: {
    host: process.env.TEST_REDIS_HOST,
    port: +process.env.TEST_REDIS_PORT,
    ttl: +process.env.TEST_REDIS_TTL,
    password: process.env.TEST_REDIS_PASS,
    db: +process.env.TEST_REDIS_DB,
  },
  throttle: {
    ttl: process.env.TEST_THROTTLE_TTL,
    limit: process.env.TEST_THROTTLE_LIMIT,
  },
  batch: {
    origin: process.env.TEST_BATCH_ORIGIN,
  },
};
