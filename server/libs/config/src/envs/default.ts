export const config = {
  perPage: process.env.PER_PAGE,
  port: process.env.PORT,
  jwtAccessSecret: process.env.JWT_ACCESS_SECRET,
  jwtRefreshSecret: process.env.JWT_REFRESH_SECRET,
  jwtAccessTokenExpireTime: process.env.JWT_ACCESS_TOKEN_EXPIRE_TIME,
  jwtRefreshTokenExpireTime: process.env.JWT_REFRESH_TOKEN_EXPIRE_TIME,
  roundSalt: process.env.ROUND_SALT,

  aws: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,

    s3: {
      domain: process.env.AWS_S3_DOMAIN,
      certExpire: process.env.AWS_S3_CERT_EXPIRE,
      bucketName: process.env.AWS_S3_BUCKET_NAME,
    },
  },

  directSend: {
    mail: {
      id: process.env.DIRECT_SEND_MAIL_ID,
    },
    message: {
      number: process.env.DIRECT_SEND_MESSAGE_NUMBER,
      username: process.env.DIRECT_SEND_MESSAGE_USERNAME,
      key: process.env.DIRECT_SEND_MESSAGE_KEY,
    },
  },

  firebase: {
    type: process.env.FIREBASE_TYPE,
    project_id: process.env.FIREBASE_PROJECT_ID,
    private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
    private_key: process.env.FIREBASE_PRIVATE_KEY,
    client_email: process.env.FIREBASE_CLIENT_EMAIL,
    client_id: process.env.FIREBASE_CLIENT_ID,
    auth_uri: process.env.FIREBASE_AUTH_URL,
    token_uri: process.env.FIREBASE_TOKEN_URL,
    auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_CERT_URL,
    client_x509_cert_url: process.env.FIREBASE_CLIENT_CERT_URL,
    databaseUrl: process.env.FIREBASE_DATABASE_URL,
    apiKey: process.env.FIREBASE_API_KEY,
  },

  kakao: {
    restApiKey: process.env.KAKAO_REST_API_KEY,
    redirectUri: process.env.KAKAO_REDIRECT_URI,
  },
};
