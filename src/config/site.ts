// src/config/site.ts

export const siteConfig = {
  name: "TaleByYou", // Replace with your actual site name
  description:
    "Create personalized children's books with custom characters, stories and illustrations.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://talebyyou.com", // Default fallback, but use environment variable
  ogImage: "/images/logo/og-logo.png",
  links: {
    twitter: "https://twitter.com/talebyyou",
    github: "https://github.com/shalevasor/talebyyou",
    facebook: "https://facebook.com/talebyyou",
    instagram: "https://instagram.com/talebyyou",
  },
  creator: "TaleByYou Team",
  keywords: [
    "custom books",
    "children books",
    "personalized stories",
    "custom illustration",
    "gift books",
    "custom characters",
    "custom illustrations",
    "personalized gifts",
    "children's books",
    "custom children books",
    "tale by you",
  ],
  contactEmail: "hello@talebyyou.com",
  images: {
    homePage: {
      hero: "https://shalev-book-store-bucket.s3.us-east-1.amazonaws.com/templates/around-the-world/page11.jpg",
      example: {
        before: "/images/example/before.png",
        after: "/images/example/after.jpg",
      },
    },
  },
};

export type SiteConfig = typeof siteConfig;

// Function to generate metadata with page-specific overrides
export function createMetadata({
  title = "",
  description = "",
  image = "",
  noIndex = false,
  alternates = {}, // Add this new parameter
} = {}) {
  const displayTitle = title
    ? `${title} | ${siteConfig.name}`
    : `${siteConfig.name} - Create Custom Children's Books`;

  const displayDescription = description || siteConfig.description;
  const ogImageUrl = image || siteConfig.ogImage;

  return {
    title: displayTitle,
    description: displayDescription,
    keywords: siteConfig.keywords,
    authors: [{ name: siteConfig.creator }],
    // 🎯 Add favicon configuration here
    icons: {
      icon: [
        { url: "/favicon.ico" },
        { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
        { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      ],
      apple: [
        { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
      ],
      other: [
        {
          rel: "icon",
          url: "/android-chrome-192x192.png",
          sizes: "192x192",
          type: "image/png",
        },
        {
          rel: "icon",
          url: "/android-chrome-512x512.png",
          sizes: "512x512",
          type: "image/png",
        },
      ],
    },
    manifest: "/site.webmanifest", // 🎯 Add web app manifest
    openGraph: {
      title: displayTitle,
      description: displayDescription,
      url: siteConfig.url,
      siteName: siteConfig.name,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 720,
          alt: `${siteConfig.name} - ${
            description || "Custom children's books"
          }`,
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: displayTitle,
      description: displayDescription,
      images: [ogImageUrl],
      creator: siteConfig.links.twitter
        ? siteConfig.links.twitter.replace("https://twitter.com/", "@")
        : undefined,
    },
    robots: noIndex ? "noindex, nofollow" : "index, follow",
    // Include alternates if provided
    ...(Object.keys(alternates).length > 0 ? { alternates } : {}),
  };
}

// Function to generate JSON-LD structured data
export function generateStructuredData(type = "website", additionalData = {}) {
  const baseData = {
    "@context": "https://schema.org",
    "@type": type,
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      logo: {
        "@type": "ImageObject",
        url: `${siteConfig.url}/logo.png`,
      },
    },
  };

  if (type === "WebSite") {
    return {
      ...baseData,
      potentialAction: {
        "@type": "SearchAction",
        target: `${siteConfig.url}/library?q={search_term_string}`,
        "query-input": "required name=search_term_string",
      },
      ...additionalData,
    };
  }

  return { ...baseData, ...additionalData };
}
