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
//     remotePatterns: [
//       // OLD S3 bucket - keep for existing images
//       {
//         protocol: "https",
//         hostname: "shalev-book-store-bucket.s3.us-east-1.amazonaws.com",
//         port: "",
//         pathname: "/templates/**",
//       },
//       {
//         protocol: "https",
//         hostname: "shalev-book-store-bucket.s3.us-east-1.amazonaws.com",
//         port: "",
//         pathname: "/**",
//       },
//       // NEW S3 bucket - add these patterns
//       {
//         protocol: "https",
//         hostname: "tale-by-you.s3.us-east-1.amazonaws.com",
//         port: "",
//         pathname: "/templates/**",
//       },
//       {
//         protocol: "https",
//         hostname: "tale-by-you.s3.us-east-1.amazonaws.com",
//         port: "",
//         pathname: "/**",
//       },
//       // Leonardo AI images
//       {
//         protocol: "https",
//         hostname: "cdn.leonardo.ai",
//         port: "",
//         pathname: "/**",
//       },
//       // Your domain
//       {
//         protocol: "https",
//         hostname: "talebyyou.com",
//         port: "",
//         pathname: "/**",
//       },
//       {
//         protocol: "https",
//         hostname: "www.talebyyou.com",
//         port: "",
//         pathname: "/**",
//       },
//       // Wildcard S3 pattern for any S3 buckets in us-east-1 (fallback)
//       {
//         protocol: "https",
//         hostname: "*.s3.us-east-1.amazonaws.com",
//         port: "",
//         pathname: "/**",
//       },
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
    // 🚀 KEY OPTIMIZATION: Reduce formats to cut transformations in half
    formats: ["image/webp"], // Remove AVIF to reduce transformations by ~50%

    // 🚀 KEY OPTIMIZATION: Increase cache TTL for better caching
    minimumCacheTTL: 2678400, // 31 days (2678400 seconds)

    // 🚀 KEY OPTIMIZATION: Limit quality options to reduce transformations
    qualities: [50, 75], // Reduce from default [25, 50, 75] to limit transformations

    // 🚀 KEY OPTIMIZATION: Optimize device sizes for your actual usage
    deviceSizes: [640, 750, 828, 1080, 1200], // Remove unnecessary sizes
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384], // Optimize for thumbnails and icons

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
