/* eslint-disable @typescript-eslint/no-namespace */
import { TokenInjectedUserDto } from '@api/modules/user/application';
import { NonFunctionProperties } from '@libs/type';

declare global {
  type Payload = TokenInjectedUserDto;
  type UUID = string;
  type AnyObject = Record<string, unknown>;
  type Plain<T> = T;
  type Optional<T> = T | undefined;
  type Nullable<T> = T | null;
  type OnlyProps<T> = NonFunctionProperties<T>;
  type Lazy<T> = Promise<T>;

  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: string;

      PER_PAGE: string;
      PORT: string;
      JWT_ACCESS_SECRET: string;
      JWT_REFRESH_SECRET: string;
      JWT_ACCESS_TOKEN_EXPIRE_TIME: string;
      JWT_REFRESH_TOKEN_EXPIRE_TIME: string;
      ROUND_SALT: string;

      PROD_DB_HOST: string;
      PROD_DB_PORT: string;
      PROD_DB_USER: string;
      PROD_DB_PASSWORD: string;
      PROD_DB_DATABASE: string;
      PROD_DB_TYPE: string;
      PROD_MAX_QUERY_EXECUTION_TIME: string;
      PROD_REDIS_HOST: string;
      PROD_REDIS_PORT: string;
      PROD_REDIS_TTL: string;
      PROD_REDIS_PASS: string;
      PROD_REDIS_DB: string;
      PROD_BATCH_ORIGIN: string;

      DEV_MAX_QUERY_EXECUTION_TIME: string;
      DEV_DB_TYPE: string;
      DEV_DB_HOST: string;
      DEV_DB_PORT: string;
      DEV_DB_USER: string;
      DEV_DB_PASSWORD: string;
      DEV_DB_DATABASE: string;
      DEV_REDIS_HOST: string;
      DEV_REDIS_PORT: string;
      DEV_REDIS_TTL: string;
      DEV_REDIS_PASS: string;
      DEV_REDIS_DB: string;
      DEV_THROTTLE_TTL: string;
      DEV_THROTTLE_LIMIT: string;
      DEV_BATCH_ORIGIN: string;

      TEST_MAX_QUERY_EXECUTION_TIME: string;
      TEST_DB_TYPE: string;
      TEST_DB_HOST: string;
      TEST_DB_PORT: string;
      TEST_DB_USER: string;
      TEST_DB_PASSWORD: string;
      TEST_DB_DATABASE: string;
      TEST_REDIS_HOST: string;
      TEST_REDIS_PORT: string;
      TEST_REDIS_TTL: string;
      TEST_REDIS_PASS: string;
      TEST_REDIS_DB: string;
      TEST_THROTTLE_TTL: string;
      TEST_THROTTLE_LIMIT: string;
      TEST_BATCH_ORIGIN: string;

      AWS_ACCESS_KEY_ID: string;
      AWS_SECRET_ACCESS_KEY: string;
      AWS_REGION: string;
      AWS_S3_DOMAIN: string;
      AWS_S3_CERT_EXPIRE: string;
      AWS_S3_BUCKET_NAME: string;

      DIRECT_SEND_MAIL_ID: string;
      DIRECT_SEND_MESSAGE_NUMBER: string;
      DIRECT_SEND_MESSAGE_USERNAME: string;
      DIRECT_SEND_MESSAGE_KEY: string;

      FIREBASE_TYPE: string;
      FIREBASE_PROJECT_ID: string;
      FIREBASE_PRIVATE_KEY_ID: string;
      FIREBASE_PRIVATE_KEY: string;
      FIREBASE_CLIENT_EMAIL: string;
      FIREBASE_CLIENT_ID: string;
      FIREBASE_AUTH_URL: string;
      FIREBASE_TOKEN_URL: string;
      FIREBASE_AUTH_PROVIDER_CERT_URL: string;
      FIREBASE_CLIENT_CERT_URL: string;
      FIREBASE_DATABASE_URL: string;
      FIREBASE_API_KEY: string;

      KAKAO_REST_API_KEY: string;
      KAKAO_REDIRECT_URI: string;
    }
  }

  namespace Express {
    interface Request {
      id: string;
    }

    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface User extends TokenInjectedUserDto {}
  }
}
