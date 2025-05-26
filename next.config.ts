// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
//   experimental: {
//     serverActions: {
//       bodySizeLimit: "4mb",
//     },
//   },
//   serverExternalPackages: ["pdfkit"],
//   images: {
//     domains: [
//       "your-domain.com",
//       "cdn.leonardo.ai",
//       "shalev-book-store-bucket.s3.us-east-1.amazonaws.com",
//     ],

//     remotePatterns: [
//       // Other patterns
//     ],
//     dangerouslyAllowSVG: true,
//     contentDispositionType: "attachment",
//     contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
//   },
// };

// export default nextConfig;
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    serverActions: {
      bodySizeLimit: "4mb",
    },
  },
  serverExternalPackages: ["pdfkit"],
  images: {
    remotePatterns: [
      // OLD S3 bucket - keep for existing images
      {
        protocol: "https",
        hostname: "shalev-book-store-bucket.s3.us-east-1.amazonaws.com",
        port: "",
        pathname: "/templates/**",
      },
      {
        protocol: "https",
        hostname: "shalev-book-store-bucket.s3.us-east-1.amazonaws.com",
        port: "",
        pathname: "/**",
      },
      // NEW S3 bucket - add these patterns
      {
        protocol: "https",
        hostname: "tale-by-you.s3.us-east-1.amazonaws.com",
        port: "",
        pathname: "/templates/**",
      },
      {
        protocol: "https",
        hostname: "tale-by-you.s3.us-east-1.amazonaws.com",
        port: "",
        pathname: "/**",
      },
      // Leonardo AI images
      {
        protocol: "https",
        hostname: "cdn.leonardo.ai",
        port: "",
        pathname: "/**",
      },
      // Your domain
      {
        protocol: "https",
        hostname: "talebyyou.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.talebyyou.com",
        port: "",
        pathname: "/**",
      },
      // Wildcard S3 pattern for any S3 buckets in us-east-1 (fallback)
      {
        protocol: "https",
        hostname: "*.s3.us-east-1.amazonaws.com",
        port: "",
        pathname: "/**",
      },
    ],
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;
