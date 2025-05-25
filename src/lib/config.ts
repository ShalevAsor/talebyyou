// const config = {
//   NODE_ENV: process.env.NODE_ENV || "development",
//   CLIENT_URL: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
//   EMAIL_TEST_MODE: process.env.EMAIL_TEST_MODE || "development",
//   EMAIL_SUPPORT: process.env.EMAIL_SUPPORT || "support@yourbookstore.com",
//   EMAIL_HOST: process.env.EMAIL_HOST,
//   EMAIL_PORT: process.env.EMAIL_PORT || "587",
//   EMAIL_USER: process.env.EMAIL_USER,
//   EMAIL_PASSWORD: process.env.EMAIL_PASSWORD,
//   EMAIL_FROM: process.env.EMAIL_FROM || "noreply@yourbookstore.com",
//   EMAIL_SECURE: process.env.EMAIL_SECURE || "false",
//   // AWS Configuration
//   AWS: {
//     REGION: process.env.AWS_REGION || "us-east-1",
//     ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID || "",
//     SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY || "",
//     S3_BUCKET_NAME: process.env.AWS_S3_BUCKET_NAME || "",
//   },
//   // Lulu API Configuration
//   LULU: {
//     // Sandbox environment
//     SANDBOX: {
//       API_URL:
//         process.env.LULU_API_SANDBOX_URL || "https://api.sandbox.lulu.com",
//       CLIENT_KEY: process.env.LULU_API_SANDBOX_CLIENT_KEY || "",
//       CLIENT_SECRET: process.env.LULU_API_SANDBOX_CLIENT_SECRET || "",
//       BASE64_AUTH: process.env.LULU_API_SANDBOX_BASE64 || "",
//       CONTACT_EMAIL:
//         process.env.LULU_CONTACT_EMAIL || "support@yourbookstore.com",
//     },
//     // Production environment
//     PRODUCTION: {
//       API_URL: process.env.LULU_API_URL || "https://api.lulu.com",
//       CLIENT_KEY: process.env.LULU_API_CLIENT_KEY || "",
//       CLIENT_SECRET: process.env.LULU_API_CLIENT_SECRET || "",
//       BASE64_AUTH: process.env.LULU_API_BASE64 || "",
//       CONTACT_EMAIL:
//         process.env.LULU_CONTACT_EMAIL || "support@yourbookstore.com",
//     },
//   },
// };

// export default config;
// src/lib/config.ts

/**
 * Application Configuration
 * Centralized configuration management with environment-based settings
 */

const isDevelopment = process.env.NODE_ENV === "development";
const isProduction = process.env.NODE_ENV === "production";

const config = {
  // Application Environment
  APP: {
    NODE_ENV: process.env.NODE_ENV || "development",
    CLIENT_URL: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
    IS_DEVELOPMENT: isDevelopment,
    IS_PRODUCTION: isProduction,
  },

  // Database Configuration
  DATABASE: {
    URL: process.env.DATABASE_URL || "",
  },

  // Authentication (Clerk)
  AUTH: {
    PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || "",
    SECRET_KEY: process.env.CLERK_SECRET_KEY || "",
    WEBHOOK_SECRET: process.env.CLERK_WEBHOOK_SIGNING_SECRET || "",
    SIGN_IN_URL: process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL || "/sign-in",
    SIGN_UP_URL: process.env.NEXT_PUBLIC_CLERK_SIGN_UP_URL || "/sign-up",
    SIGN_IN_FALLBACK:
      process.env.NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL || "/",
    SIGN_UP_FALLBACK:
      process.env.NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL || "/",
  },

  // Email Configuration
  EMAIL: {
    TEST_MODE: process.env.EMAIL_TEST_MODE || "development",
    HOST: process.env.EMAIL_HOST || "smtp.gmail.com",
    PORT: process.env.EMAIL_PORT || "587",
    USER: process.env.EMAIL_USER || "",
    PASSWORD: process.env.EMAIL_PASSWORD || "",
    SECURE: process.env.EMAIL_SECURE === "true",

    // Email Addresses
    FROM: process.env.EMAIL_FROM || "noreply@talebyyou.com",
    SUPPORT: process.env.EMAIL_SUPPORT || "support@talebyyou.com",
    ORDER: process.env.EMAIL_ORDER || "orders@talebyyou.com",
    INFO: process.env.EMAIL_INFO || "info@talebyyou.com",
  },

  // Payment Configuration (PayPal)
  PAYMENT: {
    PAYPAL: {
      CLIENT_ID: process.env.PAYPAL_CLIENT_ID || "",
      CLIENT_SECRET: process.env.PAYPAL_CLIENT_SECRET || "",
      API_URL:
        process.env.PAYPAL_API_URL ||
        (isDevelopment
          ? "https://api-m.sandbox.paypal.com"
          : "https://api-m.paypal.com"),
    },
  },

  // Image Generation (Leonardo AI)
  IMAGE_GENERATION: {
    LEONARDO: {
      API_KEY: process.env.LEONARDO_API_KEY || "",
      WEBHOOK_SECRET: process.env.LEONARDO_WEBHOOK_SECRET || "",
    },
  },

  // Cloud Storage (AWS S3)
  AWS: {
    REGION: process.env.AWS_REGION || "us-east-1",
    ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID || "",
    SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY || "",
    S3_BUCKET_NAME: process.env.AWS_S3_BUCKET_NAME || "",
  },

  // Print-on-Demand (Lulu)
  PRINTING: {
    LULU: {
      // Current environment settings (automatically switches based on NODE_ENV)
      API_URL: isProduction
        ? process.env.LULU_API_URL || "https://api.lulu.com"
        : process.env.LULU_API_SANDBOX_URL || "https://api.sandbox.lulu.com",
      CLIENT_KEY: isProduction
        ? process.env.LULU_API_CLIENT_KEY || ""
        : process.env.LULU_API_SANDBOX_CLIENT_KEY || "",
      CLIENT_SECRET: isProduction
        ? process.env.LULU_API_CLIENT_SECRET || ""
        : process.env.LULU_API_SANDBOX_CLIENT_SECRET || "",
      BASE64_AUTH: isProduction
        ? process.env.LULU_API_BASE64 || ""
        : process.env.LULU_API_SANDBOX_BASE64 || "",
      CONTACT_EMAIL: process.env.LULU_CONTACT_EMAIL || "support@talebyyou.com",

      // Explicit environment configurations (for manual switching if needed)
      ENVIRONMENTS: {
        SANDBOX: {
          API_URL:
            process.env.LULU_API_SANDBOX_URL || "https://api.sandbox.lulu.com",
          CLIENT_KEY: process.env.LULU_API_SANDBOX_CLIENT_KEY || "",
          CLIENT_SECRET: process.env.LULU_API_SANDBOX_CLIENT_SECRET || "",
          BASE64_AUTH: process.env.LULU_API_SANDBOX_BASE64 || "",
        },
        PRODUCTION: {
          API_URL: process.env.LULU_API_URL || "https://api.lulu.com",
          CLIENT_KEY: process.env.LULU_API_CLIENT_KEY || "",
          CLIENT_SECRET: process.env.LULU_API_CLIENT_SECRET || "",
          BASE64_AUTH: process.env.LULU_API_BASE64 || "",
        },
      },
    },
  },
};

// Helper functions for accessing nested config
export const getEmailConfig = () => config.EMAIL;
export const getPaymentConfig = () => config.PAYMENT;
export const getLuluConfig = () => config.PRINTING.LULU;
export const getAWSConfig = () => config.AWS;
export const getAuthConfig = () => config.AUTH;
export const getAppConfig = () => config.APP;

// Validation function to check required environment variables
export const validateConfig = () => {
  const requiredVars = [
    "DATABASE_URL",
    "NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY",
    "CLERK_SECRET_KEY",
  ];

  const missing = requiredVars.filter((varName) => !process.env[varName]);

  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missing.join(", ")}`
    );
  }
};

// Export default config
export default config;
