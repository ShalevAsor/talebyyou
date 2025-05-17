// src/config/site.ts

export const siteConfig = {
  name: "BookWizard", // Replace with your actual site name
  description:
    "Create personalized children's books with custom characters, stories and illustrations.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://bookwizard.com", // Default fallback, but use environment variable
  ogImage: "/images/og-default.jpg",
  links: {
    twitter: "https://twitter.com/bookwizard",
    github: "https://github.com/bookwizard",
  },
  creator: "BookWizard Team",
  keywords: [
    "custom books",
    "children books",
    "personalized stories",
    "custom illustration",
    "gift books",
  ],
  contactEmail: "hello@bookwizard.com",
  images: {
    homePage: {
      hero: "/images/hero.jpg",
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
    openGraph: {
      title: displayTitle,
      description: displayDescription,
      url: siteConfig.url,
      siteName: siteConfig.name,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
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
