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
    // Removed deprecated "domains" property
    remotePatterns: [
      // Your S3 bucket - specific template path
      {
        protocol: "https",
        hostname: "shalev-book-store-bucket.s3.us-east-1.amazonaws.com",
        port: "",
        pathname: "/templates/**",
      },
      // Your S3 bucket - general access
      {
        protocol: "https",
        hostname: "shalev-book-store-bucket.s3.us-east-1.amazonaws.com",
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
      // Your domain (replace with actual domain)
      {
        protocol: "https",
        hostname: "your-domain.com",
        port: "",
        pathname: "/**",
      },
      // Wildcard S3 pattern for any S3 buckets in us-east-1
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
