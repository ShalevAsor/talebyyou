export const mockConfig = {
  APP: {
    NODE_ENV: "test",
    IS_DEVELOPMENT: false,
    IS_PRODUCTION: false,
    CLIENT_URL: "http://localhost:3000",
  },
  DATABASE: {
    URL: "test-database-url",
  },
  EMAIL: {
    TEST_MODE: "development",
    HOST: "smtp.gmail.com",
    PORT: "587",
    USER: "admin@talebyyou.com",
    PASSWORD: "test-app-password",
    SECURE: false,
    FROM: "noreply@talebyyou.com",
    SUPPORT: "support@talebyyou.com",
    ORDER: "orders@talebyyou.com",
    INFO: "info@talebyyou.com",
  },
  PRINTING: {
    LULU: {
      API_URL: "https://api.sandbox.lulu.com",
      CLIENT_KEY: "test-key",
      CLIENT_SECRET: "test-secret",
      BASE64_AUTH: "test-base64",
      CONTACT_EMAIL: "support@talebyyou.com",
      ENVIRONMENTS: {
        SANDBOX: {
          API_URL: "https://api.sandbox.lulu.com",
          CLIENT_KEY: "test-key",
          CLIENT_SECRET: "test-secret",
          BASE64_AUTH: "test-base64",
        },
        PRODUCTION: {
          API_URL: "https://api.lulu.com",
          CLIENT_KEY: "prod-key",
          CLIENT_SECRET: "prod-secret",
          BASE64_AUTH: "prod-base64",
        },
      },
    },
  },
  AWS: {
    REGION: "us-east-1",
    ACCESS_KEY_ID: "test-access-key",
    SECRET_ACCESS_KEY: "test-secret-key",
    S3_BUCKET_NAME: "test-bucket",
  },
  PAYMENT: {
    PAYPAL: {
      CLIENT_ID: "test-paypal-client-id",
      CLIENT_SECRET: "test-paypal-secret",
      API_URL: "https://api-m.sandbox.paypal.com",
    },
  },
  AUTH: {
    PUBLISHABLE_KEY: "test-clerk-publishable-key",
    SECRET_KEY: "test-clerk-secret",
    WEBHOOK_SECRET: "test-webhook-secret",
    SIGN_IN_URL: "/sign-in",
    SIGN_UP_URL: "/sign-up",
    SIGN_IN_FALLBACK: "/",
    SIGN_UP_FALLBACK: "/",
  },
  IMAGE_GENERATION: {
    LEONARDO: {
      API_KEY: "test-leonardo-key",
      WEBHOOK_SECRET: "test-leonardo-webhook",
    },
  },
};
