/**
 * Privacy Policy data for TaleByYou
 * This file contains structured data for the Privacy Policy page
 */

import { siteConfig } from "@/config/site";

export const privacyPolicyLastUpdated = "May 22, 2025";

// Main privacy policy sections
export const privacyPolicySections = [
  {
    id: "introduction",
    title: "Introduction",
    content: `${siteConfig.name} ("we", "our", or "us") respects your privacy. This Privacy Policy explains how we collect, use, and protect your information when you use our website and services.

Please read this Privacy Policy carefully. If you do not agree with the terms of this Privacy Policy, please do not access our website or use our services.

By accessing our website or using our services, you consent to the collection, use, and disclosure of information in accordance with this Privacy Policy.

We reserve the right to make changes to this Privacy Policy at any time. We will alert you about any changes by updating the "Last Updated" date of this Privacy Policy.`,
  },
  {
    id: "information-we-collect",
    title: "Information We Collect",
    content: `Account Information: Name, email address, and authentication details (via Clerk)

Order Information: Shipping address, phone number, payment details (processed by PayPal)

Book Content: Character details (name, age, appearance), text content, dedication messages, and images you upload

Generated Content: AI-generated images created for your books (via Leonardo AI)

Usage Data: Basic website usage, IP address, browser information`,
  },
  {
    id: "how-we-use-information",
    title: "How We Use Your Information",
    content: `We use your information to:

• Create and deliver personalized children's books

• Process orders and handle shipping

• Generate custom images for your books

• Send order confirmations and updates

• Provide customer support

• Improve our services`,
  },
  {
    id: "how-we-share-information",
    title: "How We Share Information",
    content: `We share your information only with trusted service providers:

• Clerk (user authentication)

• Leonardo AI (image generation)

• PayPal (payment processing)

• Lulu xPress (book printing and shipping)

• AWS (secure data storage)

We never sell your personal information to third parties.`,
  },
  {
    id: "data-security",
    title: "Data Security",
    content: `We use industry-standard security measures to protect your information, including encryption and secure storage. Character reference images are automatically deleted after your book is completed.

However, no method of electronic storage is 100% secure. While we strive to protect your personal information, we cannot guarantee its absolute security.`,
  },
  {
    id: "data-retention",
    title: "Data Retention",
    content: `• Account data: Until you delete your account

• Order records: 7 years (for legal/tax purposes)

• Book content: Until you request deletion

• Guest sessions: 30 days if no order is placed`,
  },
  {
    id: "your-rights",
    title: "Your Rights",
    content: `You can:

• Access, correct, or delete your personal information

• Request a copy of your data

• Withdraw consent for marketing communications

• Delete your account and associated data

Contact us at ${siteConfig.contactEmail} to exercise these rights.`,
  },
  {
    id: "children-privacy",
    title: "Children's Privacy",
    content: `Our service is for adults creating books for children. We don't knowingly collect information directly from children under 18.

Child information (name, age, characteristics) provided by parents/guardians is used solely for book personalization and treated with the utmost care.`,
  },
  {
    id: "geographic-availability",
    title: "Geographic Availability",
    content: `Our services are currently available in the United States, Canada, United Kingdom, and Australia.

Your information may be processed in the United States and other countries where our service providers operate. We ensure appropriate safeguards are in place for international transfers.`,
  },
  {
    id: "cookies",
    title: "Cookies",
    content: `We use only essential cookies that are necessary for our website to function:

• Authentication cookies: To keep you logged in and manage your session

• Security cookies: To protect against fraud and unauthorized access

We do not use tracking, analytics, or marketing cookies. Disabling cookies in your browser may prevent the website from working properly.`,
  },
  {
    id: "california-privacy-rights",
    title: "California Privacy Rights (CCPA)",
    content: `California residents have additional rights including:

• Right to know what personal information is collected and how it's used

• Right to delete personal information (subject to legal exceptions)

• Right to correct inaccurate information

• Right to opt-out of data sales (we don't sell personal data)

• Right to non-discrimination for exercising privacy rights

Categories of information we collect: Identifiers, contact information, commercial information, internet activity, uploaded images, and preferences.

To exercise your California rights: Email ${siteConfig.contactEmail} with "CCPA Request" in the subject line.`,
  },
  {
    id: "european-privacy-rights",
    title: "European Privacy Rights (GDPR)",
    content: `For EU/EEA/UK residents, we process data based on:

• Contract: To provide our book creation services

• Consent: When you explicitly agree (marketing, optional features)

• Legitimate Interests: For business operations, fraud prevention, and service improvement

• Legal Obligation: To comply with applicable laws

You have all rights listed in the "Your Rights" section, plus specific GDPR protections regarding automated decision-making and data portability.

Contact our Data Protection Officer: legal@talebyyou.com`,
  },
  {
    id: "third-party-links",
    title: "Third-Party Links",
    content: `Our Services may contain links to third-party websites. We are not responsible for their privacy practices and encourage you to review their privacy policies.`,
  },
  {
    id: "marketing-communications",
    title: "Marketing Communications",
    content: `With your consent, we may send:

• Product updates and feature announcements

• Special offers and promotional content

• Educational content about book creation

To opt out: Click unsubscribe links in emails, update your account preferences, or contact ${siteConfig.contactEmail}`,
  },
  {
    id: "changes-to-policy",
    title: "Changes to This Policy",
    content: `We may update this Privacy Policy periodically. Material changes will be communicated through:

• Email notifications to registered users

• Prominent website notices

• Updated effective date at the top of this policy

We encourage you to review this policy regularly.`,
  },
  {
    id: "contact-information",
    title: "Contact Information",
    content: `For privacy questions or to exercise your rights:

Email: ${siteConfig.contactEmail}

Data Protection Officer: legal@talebyyou.com

For specific requests:

• GDPR requests: Include "GDPR Request" in subject line

• CCPA requests: Include "CCPA Request" in subject line

This Privacy Policy was last updated on ${privacyPolicyLastUpdated}.`,
  },
];

// Links for the Privacy Policy page
export const privacyRelatedLinks = [
  {
    title: "Terms of Use",
    href: "/terms",
    description: "Read about the rules for using our service.",
  },
  {
    title: "Contact Us",
    href: "/contact",
    description: "Have questions? Get in touch with our team.",
  },
  {
    title: "FAQ",
    href: "/#faq",
    description: "Find answers to common questions about our service.",
  },
];
