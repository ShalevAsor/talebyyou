/**
 * Terms of Use data for TaleByYou
 * This file contains structured data for the Terms of Use page
 */

import { siteConfig } from "@/config/site";

export const termsLastUpdated = "May 22, 2025";

// Main terms sections
export const termsOfUseSections = [
  {
    id: "introduction",
    title: "Introduction",
    content: `Welcome to ${siteConfig.name} ("we", "our", or "us"). These Terms of Use ("Terms") govern your access to and use of our website and services (collectively, the "Services") that allow you to create, customize, and purchase personalized children's books using AI-powered image generation.

By accessing or using our Services, you agree to be bound by these Terms. If you do not agree to these Terms, please do not use our Services.`,
  },
  {
    id: "description-of-services",
    title: "Description of Services",
    content: `${siteConfig.name} provides an online platform that enables users to:

• Create personalized children's books using customizable templates

• Generate AI-powered illustrations and character images through Leonardo AI

• Customize book content including text, characters, and dedications

• Purchase digital eBooks and physical printed books

• Access book creation tools and editing features

Our Services are designed for creating children's books but are intended for use by adults (18 years or older).`,
  },
  {
    id: "eligibility-and-account-registration",
    title: "Eligibility and Account Registration",
    content: `Age Requirements: You must be at least 18 years old to create an account. Parents/guardians are responsible for minors' use of our Services. Users under 18 must have parental or guardian consent.

Account Registration: You must provide accurate, current, and complete information. You are responsible for maintaining the security of your account credentials. You must notify us immediately of any unauthorized access. We reserve the right to suspend or terminate accounts that violate these Terms.

Guest Users: You may use certain features without creating an account. Guest sessions expire after 30 days of inactivity. Guest users have limited book creation allowances per session.`,
  },
  {
    id: "user-content-and-ai-generated-materials",
    title: "User Content and AI-Generated Materials",
    content: `Your Content Rights: You retain ownership of the original content you create, including text content, stories, customization inputs, character descriptions and personal details, and images you upload for character reference.

AI-Generated Content Rights: Upon completion and payment, you receive full ownership and commercial rights to your personalized book, including all AI-generated illustrations created specifically for your book. You may publish, distribute, sell, or otherwise commercialize your completed books without attribution to ${siteConfig.name}.

License to ${siteConfig.name}: By using our Services, you grant ${siteConfig.name} a non-exclusive, worldwide, royalty-free license to use your content to provide our Services, generate AI-powered images based on your inputs, create, produce, and deliver your personalized books, and use anonymized examples for promotional purposes (without personal information).

Template Content: Book templates and base content remain our intellectual property. You receive a license to use template content solely for creating your personalized books.`,
  },
  {
    id: "branding-and-attribution",
    title: "Branding and Attribution",
    content: `Attribution in Final Products: All books produced through our service will include "Made with TaleByYou" attribution on the final page. This attribution is part of our service and cannot be removed from purchased books.
  
  Branding Purpose: The attribution serves to identify the source of the book creation service and may help others discover our platform. This is a standard practice for custom book creation services.
  
  Your Rights: Despite the presence of our attribution, you retain full ownership and commercial rights to your completed book as outlined in the "User Content and AI-Generated Materials" section above.`,
  },
  {
    id: "prohibited-uses-and-content",
    title: "Prohibited Uses and Content",
    content: `You agree not to create content that:

• Is illegal, harmful, or violates any laws

• Contains hate speech, discrimination, or harassment

• Is sexually explicit or inappropriate for children's books

• Infringes on third-party intellectual property rights

• Includes personal information of others without consent

• Promotes violence or illegal activities

We reserve the right to review all content and refuse to process orders that violate our guidelines.`,
  },
  {
    id: "orders-payments-and-pricing",
    title: "Orders, Payments, and Pricing",
    content: `Order Process: Orders are subject to acceptance by ${siteConfig.name}. We reserve the right to refuse or cancel orders. Pricing and availability are subject to change. All payments are processed through PayPal's secure gateway.

Processing Times: AI image generation typically completes within minutes. If you experience any delays or issues with processing, please contact our support team. Physical books are printed and shipped through Lulu xPress.

Payment Terms: Payment must be received before order processing begins. All prices are in USD unless otherwise specified. You are responsible for all applicable taxes and fees.`,
  },
  {
    id: "book-previews-and-final-products",
    title: "Book Previews and Final Products",
    content: `Book Preview Disclaimer: The book preview feature is provided for demonstration purposes only to give you an idea of how your book will look. The preview is not intended to be an exact representation of the final product.
  
  The final physical books and digital eBooks you receive may appear different from the web preview. The preview serves as a general guide to help you visualize your book's content and layout before purchase.
  
  By using our service, you acknowledge that the preview is illustrative only and that the final delivered product may vary in appearance from what is shown in the preview.`,
  },
  {
    id: "returns-refunds-and-cancellations",
    title: "Returns, Refunds, and Cancellations",
    content: `Personalized Products Exception: Due to the custom and personalized nature of our books, we do not accept returns or exchanges for change of mind. Each book is uniquely created based on your specifications.

Refund Policy for Digital Products (eBooks): Refunds available within 7 days if technical issues prevent access. No refunds for change of mind after successful download.

Refund Policy for Physical Products: Defective items receive full refund or replacement within 30 days. Printing errors by our service receive free replacement. Customer error in customization receives no refund unless product is defective.

Cancellation Rights: You may cancel before AI generation begins (full refund). Once AI generation begins, orders cannot be cancelled. Full refund if we fail to deliver within 40 days.

Refund Process: Contact customer service with order details and refunds will be processed within 5-10 business days through original payment method.`,
  },
  {
    id: "ai-service-dependencies",
    title: "AI Service Dependencies",
    content: `We rely on Leonardo AI for image generation. Service interruptions or changes to these services may affect our ability to fulfill orders. We are not liable for delays caused by third-party AI service disruptions.

AI Generation Limitations: AI may not perfectly interpret complex requests. Generated images are subject to AI system capabilities. AI-generated images may contain errors or inaccuracies (such as incorrect number of fingers, facial features, or other details). Some requests may be rejected by AI safety filters.`,
  },
  {
    id: "third-party-services",
    title: "Third-Party Services",
    content: `Our Services integrate with:

• Clerk: Authentication and user management

• Leonardo AI: Image generation services

• PayPal: Payment processing

• Lulu xPress: Print-on-demand and shipping

• Amazon Web Services (AWS): Cloud hosting and storage

These services have their own terms and privacy policies that may apply to your use.`,
  },
  {
    id: "disclaimers-and-limitations-of-liability",
    title: "Disclaimers and Limitations of Liability",
    content: `Service Availability: Services are provided "as is" and "as available." We do not guarantee uninterrupted or error-free service and reserve the right to modify or discontinue services.

AI Generation Disclaimers: We do not guarantee specific artistic outcomes from AI generation. AI-generated content quality depends on input quality and AI capabilities. Results may vary based on AI system performance and limitations.

Limitation of Liability: TO THE MAXIMUM EXTENT PERMITTED BY LAW: Our total liability for any claim is limited to the amount you paid for the specific order. We are not liable for indirect, incidental, or consequential damages. We are not responsible for third-party service failures.`,
  },
  {
    id: "intellectual-property",
    title: "Intellectual Property",
    content: `All intellectual property rights in our Services, including templates, website content, and software, are owned by ${siteConfig.name} or our licensors. You may not reproduce, distribute, or create derivative works from our proprietary content.`,
  },
  {
    id: "indemnification",
    title: "Indemnification",
    content: `You agree to indemnify and hold harmless ${siteConfig.name} from any claims, damages, or expenses arising from:

• Your use of our Services

• Your violation of these Terms

• Content you create or upload

• Your violation of applicable laws`,
  },
  {
    id: "termination",
    title: "Termination",
    content: `Termination by You: You may terminate your account at any time. Termination does not cancel pending orders, and outstanding payments remain due.

Termination by Us: We may suspend or terminate your access if you violate these Terms, engage in fraudulent activities, or interfere with our Services.`,
  },
  {
    id: "privacy",
    title: "Privacy",
    content: `Your privacy is important to us. Our collection, use, and protection of your personal information is governed by our Privacy Policy. Please review our Privacy Policy to understand our privacy practices.`,
  },
  {
    id: "governing-law-and-dispute-resolution",
    title: "Governing Law and Dispute Resolution",
    content: `Governing Law: These Terms are governed by applicable law, without regard to conflict of law principles.

Dispute Resolution: Informal Resolution: We encourage contacting us first to resolve disputes informally at ${siteConfig.contactEmail}.

Arbitration: If informal resolution fails, disputes will be resolved through binding arbitration, except for small claims court matters and intellectual property disputes.

Class Action Waiver: You agree to resolve disputes individually and waive rights to class action lawsuits.`,
  },
  {
    id: "general-provisions",
    title: "General Provisions",
    content: `Entire Agreement: These Terms, together with our Privacy Policy, constitute the entire agreement between you and ${siteConfig.name}.

Modifications: We may modify these Terms at any time. Continued use of our Services after changes constitutes acceptance of the new Terms.

Severability: If any provision is found unenforceable, the remaining provisions will continue in full force.`,
  },
  {
    id: "contact-information",
    title: "Contact Information",
    content: `For questions about these Terms or our Services:

General Support: ${siteConfig.contactEmail}
Legal Matters: ${siteConfig.supportEmail}

Last Updated: ${termsLastUpdated}

By using ${siteConfig.name}, you acknowledge that you have read, understood, and agree to be bound by these Terms of Use.`,
  },
];

// Links for the Terms of Use page
export const relatedLinks = [
  {
    title: "Privacy Policy",
    href: "/privacy",
    description: "Learn how we collect and use your information.",
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
