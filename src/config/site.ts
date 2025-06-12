// src/config/site.ts

export const siteConfig = {
  name: "TaleByYou", // Replace with your actual site name
  description:
    "Create magical personalized children's books starring your child! Custom characters, names, and illustrations. Beautiful printed books and instant digital downloads make perfect gifts.",
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
    // 🎯 Core product terms (keep existing)
    "personalized children's books",
    "custom children's books",
    "personalized books for kids",
    "custom storybooks",
    "children's books with child's name",
    "custom characters",
    "custom illustrations",
    "tale by you",
    "talebyyou",

    // 📚 Long-tail keywords (expanded)
    "personalized books for kids",
    "custom storybooks with photos",
    "children's book gifts",
    "bedtime stories with child's name",
    "custom printed books",
    "personalized story books",
    "kids books with pictures",
    "create children's book online",
    "custom baby books",
    "personalized gift books",

    // 🎁 Gift-giving scenarios (NEW)
    "unique gifts for kids",
    "personalized gifts for children",
    "custom books for toddlers",
    "baby shower gift books",
    "first birthday book gifts",
    "godparent gifts personalized",
    "baby christening gifts",
    "new baby gifts custom",
    "personalized books for twins",
    "sibling books custom",

    // 👨‍👩‍👧‍👦 Parent pain points & benefits (NEW)
    "encourage reading in children",
    "reluctant reader books",
    "build reading confidence",
    "make child love reading",
    "reading motivation for kids",
    "boost self-esteem children",
    "child sees themselves in books",
    "representation in children's books",
    "diverse children's books",
    "inclusive storybooks",

    // 🎂 Age-specific terms (NEW)
    "books for 2 year olds",
    "books for 3 year olds",
    "books for 4 year olds",
    "books for 5 year olds",
    "preschool books personalized",
    "kindergarten books custom",
    "toddler books with names",
    "baby books personalized",
    "early reader books custom",

    // 🎭 Character & customization (NEW)
    "create book character online",
    "child avatar books",
    "photo books for kids",
    "turn child into book character",
    "custom book illustrations",
    "personalized character books",
    "kids book with child's photo",

    // 🎓 Educational & developmental (NEW)
    "educational children's books",
    "learning books for kids",
    "social emotional learning books",
    "confidence building books",
    "books about friendship",
    "books about starting school",
    "potty training books personalized",
    "bedtime routine books",
    "books for anxious children",

    // 🏆 Competitor comparison (NEW)
    "better than shutterfly books",
    "alternative to wonderbly",
    "custom books like hooray heroes",
    "personalized books vs generic",
    "unique children's books online",

    // 🌍 Format & delivery options (NEW)
    "digital children's books",
    "printable kids books",
    "instant download books",
    "shipped personalized books",
    "hardcover custom books",
    "paperback personalized books",
    "ebook personalized children",

    // 📅 Seasonal & occasions (expanded)
    "birthday book gifts",
    "christmas books for kids",
    "holiday children's books",
    "graduation gifts for kids",
    "back to school books",
    "valentine's day kids books",
    "easter books for children",
    "halloween books personalized",
    "thanksgiving books custom",
    "summer reading books",

    // 👥 Buyer personas (NEW)
    "grandparent gifts for grandchildren",
    "aunt uncle gifts for niece nephew",
    "godparent gift ideas",
    "teacher gifts for students",
    "daycare books personalized",
    "preschool teacher gifts",

    // 🏠 Location & service terms (NEW)
    "online book creator",
    "worldwide shipping books",
    "fast delivery children's books",
    "international shipping custom books",
    "print on demand children's books",

    // 💡 Problem-solving terms (NEW)
    "books for picky readers",
    "engage reluctant readers",
    "screen time alternative kids",
    "offline activities children",
    "family bonding activities",
    "bedtime struggles solutions",
    "reading time ideas",

    // 🎨 Creative & artistic terms (NEW)
    "illustrated children's books",
    "picture books personalized",
    "storytelling for kids",
    "creative writing children",
    "imagination books kids",
    "fantasy books personalized",
    "adventure books custom",

    // 📱 Tech-savvy parent terms (NEW)
    "create books on phone",
    "mobile book creator",
    "easy book customization",
    "drag and drop book maker",
    "user-friendly book design",
    "quick book creation",

    // Brand and variations (keep existing)
    "tale by you",
    "talebyyou",
  ],
  business: {
    type: "Creative Services",
    founded: "2025", // Update with actual year
    location: "Online Worldwide",
    slogan: "Make Your Child the Hero of Their Own Story",
    taglines: [
      "Personalized Stories, Magical Memories",
      "Every Child Deserves to Be the Hero",
      "Custom Books, Endless Imagination",
    ],
  },
  audience: {
    primary: "Parents with children ages 2-12",
    secondary: [
      "Grandparents",
      "Gift buyers",
      "Teachers",
      "Childcare providers",
    ],
    interests: [
      "Children's literature",
      "Personalized gifts",
      "Family memories",
      "Child development",
    ],
  },
  contactEmail: "info@talebyyou.com",
  supportEmail: "support@talebyyou.com",
  images: {
    homePage: {
      hero: "/images/hero.jpg",
      example: {
        before: "/images/example/before.png",
        after: "/images/example/after.jpg",
      },
    },
    social: {
      facebook: "/images/social/facebook-share.jpg",
      twitter: "/images/social/twitter-share.jpg",
      instagram: "/images/social/instagram-share.jpg",
    },
    seo: {
      logoStructured: "/images/logo/logo-structured.png", // For schema markup
      brandIcon: "/images/logo/brand-icon.png",
    },
  },
  contentThemes: {
    benefits: [
      "Boost reading confidence",
      "Create lasting family memories",
      "Encourage imagination and creativity",
      "Perfect personalized gifts",
      "Build emotional connection to reading",
    ],
    features: [
      "Easy online customization",
      "High-quality printing",
      "Fast delivery worldwide",
      "Digital and printed options",
      "Professional illustrations",
    ],
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
  type = "website", // Allow different page types
  other = {},
} = {}) {
  const displayTitle = title
    ? `${title} | ${siteConfig.name}`
    : `${siteConfig.name} - Create Personalized Children's Books That Make Your Child the Hero`;

  const displayDescription = description || siteConfig.description;
  const ogImageUrl = image || siteConfig.ogImage;

  return {
    title: displayTitle,
    description: displayDescription,
    keywords: siteConfig.keywords,
    authors: [{ name: siteConfig.creator }],
    creator: siteConfig.creator,
    publisher: siteConfig.name,
    // 🎯 Add favicon configuration here
    icons: {
      icon: [
        { url: "/icon.ico" },
        { url: "/icon-16x16.png", sizes: "16x16", type: "image/png" },
        { url: "/icon-32x32.png", sizes: "32x32", type: "image/png" },
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
          height: 630,
          alt: `${siteConfig.name} - ${
            description || "Custom children's books"
          }`,
        },
      ],
      locale: "en_US",
      type: type,
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
    category: "Children's Books",
    classification: "Creative Services",
    other: {
      "p:domain_verify": "e64f90388c1e484cdce3fd4ad4a82de4",
      ...other,
    },

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
export function generateFAQSchema(
  faqs: Array<{ question: string; answer: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

// Helper function to generate breadcrumb schema
export function generateBreadcrumbSchema(
  breadcrumbs: Array<{ name: string; url: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteConfig.url}${item.url}`,
    })),
  };
}
