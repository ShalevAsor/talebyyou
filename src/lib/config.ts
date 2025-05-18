const config = {
  NODE_ENV: process.env.NODE_ENV || "development",
  CLIENT_URL: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  EMAIL_HOST: process.env.EMAIL_HOST,
  EMAIL_PORT: process.env.EMAIL_PORT || "587",
  EMAIL_USER: process.env.EMAIL_USER,
  EMAIL_PASSWORD: process.env.EMAIL_PASSWORD,
  EMAIL_FROM: process.env.EMAIL_FROM || "noreply@yourbookstore.com",
  EMAIL_SECURE: process.env.EMAIL_SECURE || "false",
  // AWS Configuration
  AWS: {
    REGION: process.env.AWS_REGION || "us-east-1",
    ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID || "",
    SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY || "",
    S3_BUCKET_NAME: process.env.AWS_S3_BUCKET_NAME || "",
  },
  // Lulu API Configuration
  LULU: {
    // Sandbox environment
    SANDBOX: {
      API_URL:
        process.env.LULU_API_SANDBOX_URL || "https://api.sandbox.lulu.com",
      CLIENT_KEY: process.env.LULU_API_SANDBOX_CLIENT_KEY || "",
      CLIENT_SECRET: process.env.LULU_API_SANDBOX_CLIENT_SECRET || "",
      BASE64_AUTH: process.env.LULU_API_SANDBOX_BASE64 || "",
      CONTACT_EMAIL:
        process.env.LULU_CONTACT_EMAIL || "support@yourbookstore.com",
    },
    // Production environment
    PRODUCTION: {
      API_URL: process.env.LULU_API_URL || "https://api.lulu.com",
      CLIENT_KEY: process.env.LULU_API_CLIENT_KEY || "",
      CLIENT_SECRET: process.env.LULU_API_CLIENT_SECRET || "",
      BASE64_AUTH: process.env.LULU_API_BASE64 || "",
      CONTACT_EMAIL:
        process.env.LULU_CONTACT_EMAIL || "support@yourbookstore.com",
    },
  },
};

export default config;

// TODO: Add more configurations as needed + env.production
