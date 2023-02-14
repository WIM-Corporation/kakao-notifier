import { TypeORMCustomLogger } from '@libs/middleware';

export const config = {
  db: {
    type: process.env.PROD_DB_TYPE,
    synchronize: false,
    logging: false,
    logger: new TypeORMCustomLogger(),
    cache: true,
    host: process.env.PROD_DB_HOST,
    port: process.env.PROD_DB_PORT,
    username: process.env.PROD_DB_USER,
    password: process.env.PROD_DB_PASSWORD,
    database: process.env.PROD_DB_DATABASE,
    maxQueryExecutionTime: process.env.PROD_MAX_QUERY_EXECUTION_TIME,
    // replication: {
    //   master: {
    //     host: process.env.PROD_DB_HOST,
    //     port: process.env.PROD_DB_PORT,
    //     username: process.env.PROD_DB_USER,
    //     password: process.env.PROD_DB_PASSWORD,
    //     database: process.env.PROD_DB_DATABASE,
    //   },
    //   slaves: [
    //     {
    //       // fix if necessary
    //       host: 'slaveHost',
    //       port: 3306,
    //       username: 'username',
    //       password: 'password',
    //       database: 'dbname',
    //     },
    //   ],
    // },
    extra: {
      connectionLimit: 30,
    },
    autoLoadEntities: true,
    entities: [`${__dirname}/../entities/**/*.{js,ts}`],
    // subscribers: [`${__dirname}/../subscriber/**/*.{js,ts}`],
    // migrations: [`${__dirname}/../migration/**/*.{js,ts}`],
  },
  redis: {
    host: process.env.PROD_REDIS_HOST,
    port: +process.env.PROD_REDIS_PORT,
    ttl: +process.env.PROD_REDIS_TTL,
    password: process.env.PROD_REDIS_PASS,
    db: +process.env.PROD_REDIS_DB,
  },
  batch: {
    origin: process.env.PROD_BATCH_ORIGIN,
  },
};
