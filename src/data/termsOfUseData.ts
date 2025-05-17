/**
 * Terms of Use data for BookWizard
 * This file contains structured data for the Terms of Use page
 */

export const termsLastUpdated = "May 16, 2025";

// Main terms sections
export const termsOfUseSections = [
  {
    id: "introduction",
    title: "Introduction",
    content: `Welcome to BookWizard. These Terms of Use govern your use of the BookWizard website, services, and applications (collectively, the "Service"). 
    
By accessing or using our Service, you agree to be bound by these Terms. If you disagree with any part of the terms, you may not access the Service.

BookWizard provides a platform for creating personalized children's books through our website located at ${
      process.env.NEXT_PUBLIC_SITE_URL || "https://bookwizard.com"
    }.`,
  },
  {
    id: "user-accounts",
    title: "User Accounts",
    content: `You may create an account to access certain features of our Service. When you create an account, you must provide accurate and complete information. You are solely responsible for the activity that occurs on your account, and you must keep your account password secure.

You may also use our Service as a guest user for certain functionalities. Books created during guest sessions may be linked to your account if you choose to register at a later time.

You must notify BookWizard immediately of any breach of security or unauthorized use of your account. BookWizard will not be liable for any losses caused by any unauthorized use of your account.`,
  },
  {
    id: "parental-consent",
    title: "Parental Consent and Child Users",
    content: `BookWizard is designed to be used by adults to create personalized books for children. By using our Service, you confirm that you are either:

1. At least 18 years old and creating content for a child in your care, or
2. A minor who has obtained parental consent to use our Service.

Parents or legal guardians who allow minors to use our Service acknowledge that they are responsible for the minor's activity and compliance with these Terms. We recommend that parents supervise children's use of our Service.`,
  },
  {
    id: "content-ownership",
    title: "Content Ownership and Intellectual Property",
    content: `BookWizard Content: All content provided by BookWizard, including but not limited to book templates, illustrations, text, graphics, logos, and software, is the property of BookWizard or its content suppliers and is protected by international copyright, trademark, and other intellectual property laws.

User Content: You retain ownership of any personal information or personalized content you submit for book customization (such as names, character preferences, etc.). By submitting this content, you grant BookWizard a non-exclusive, royalty-free license to use, reproduce, and process this information solely for the purpose of providing our Service to you.

Personalized Books: When you create a personalized book through our Service, you own the specific customized version of that book. However, the underlying template, artwork style, and story structure remain the property of BookWizard.

You may not reproduce, distribute, modify, create derivative works of, publicly display, publicly perform, republish, download, store, or transmit any of BookWizard's intellectual property, except as follows:

1. Your computer may temporarily store copies in RAM incidental to accessing and viewing those materials.
2. You may store files that are automatically cached by your web browser for display enhancement purposes.
3. You may print or download one copy of a reasonable number of pages for your own personal, non-commercial use and not for further reproduction, publication, or distribution.`,
  },
  {
    id: "acceptable-use",
    title: "Acceptable Use Policy",
    content: `You agree not to use our Service:

1. In any way that violates any applicable federal, state, local, or international law or regulation.
2. To create or request books containing inappropriate content for children, including but not limited to violent, sexual, discriminatory, or otherwise offensive material.
3. To transmit any material that contains viruses, trojan horses, worms, or any other harmful or destructive code.
4. To attempt to gain unauthorized access to any part of the Service, other accounts, or any other systems or networks connected to the Service.
5. To interfere with any other user's use and enjoyment of the Service.

BookWizard reserves the right to review customization requests and may refuse to process those that violate these Terms or that we determine, in our sole discretion, to be inappropriate for a children's book platform.`,
  },
  {
    id: "payments-refunds",
    title: "Payments, Pricing, and Refunds",
    content: `Pricing: Prices for our products are clearly displayed on our website and are subject to change without notice. All prices are in USD unless otherwise specified.

Payment: We accept payment via the methods listed on our website, which may include credit cards and PayPal. By providing payment information, you represent and warrant that you have the legal right to use the payment method you provide.

Taxes: Applicable sales tax may be added to your order based on your location and current tax rates.

Refunds for Digital Products: Due to the personalized nature of our digital products (eBooks), all sales are final and non-refundable once the customization process is complete and the digital file has been delivered.

Refunds for Physical Books: For physical books, we offer refunds in the following circumstances:
1. The book has significant printing defects or quality issues.
2. The book was damaged during shipping.
3. The wrong book was shipped.

To request a refund for a physical book, please contact our customer service within 14 days of receiving your order. Refunds do not include shipping costs unless the return is due to our error.`,
  },
  {
    id: "shipping-delivery",
    title: "Shipping and Delivery",
    content: `Physical Books: Production and shipping times for physical books are estimates only and are not guaranteed. Standard production time is typically 2-5 business days, with additional transit time depending on the shipping method selected.

Shipping Methods: We offer various shipping methods with different estimated delivery timeframes and costs. The available shipping options and their associated costs will be presented during checkout.

Shipping Issues: BookWizard is not responsible for delays caused by customs, postal services, or other circumstances beyond our control. If your order appears to be significantly delayed, please contact our customer service.

Tracking: When available, tracking information will be provided via email once your book has been shipped.

International Orders: For international orders, the recipient is responsible for any customs duties, taxes, or import fees that may be applied by the destination country. These are not included in our shipping fees.`,
  },
  {
    id: "disclaimers",
    title: "Disclaimers and Limitation of Liability",
    content: `Warranty Disclaimer: THE SERVICE AND ITS CONTENT ARE PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS WITHOUT ANY WARRANTIES OF ANY KIND. BOOKWIZARD DISCLAIMS ALL WARRANTIES, INCLUDING, BUT NOT LIMITED TO, IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.

Color and Appearance: BookWizard does not guarantee that the colors and appearance of your physical book will exactly match how they appear on your screen due to variations in printing processes and display settings.

Service Interruptions: We do not guarantee that our Service will be uninterrupted, timely, secure, or error-free.

Limitation of Liability: IN NO EVENT WILL BOOKWIZARD, ITS AFFILIATES, OR THEIR LICENSORS, SERVICE PROVIDERS, EMPLOYEES, AGENTS, OFFICERS, OR DIRECTORS BE LIABLE FOR DAMAGES OF ANY KIND ARISING FROM THE USE OF THE SERVICE, INCLUDING BUT NOT LIMITED TO DIRECT, INDIRECT, INCIDENTAL, PUNITIVE, AND CONSEQUENTIAL DAMAGES.`,
  },
  {
    id: "changes-termination",
    title: "Changes to Terms and Service Termination",
    content: `Changes to Terms: BookWizard reserves the right to modify these Terms at any time. We will provide notice of significant changes by updating the date at the top of these Terms and by maintaining a current version of the Terms on our website. Your continued use of the Service following the posting of revised Terms means that you accept and agree to the changes.

Termination: We may terminate or suspend your account and access to the Service immediately, without prior notice or liability, for any reason, including without limitation if you breach these Terms. Upon termination, your right to use the Service will immediately cease.

Survival: All provisions of the Terms which by their nature should survive termination shall survive termination, including, without limitation, ownership provisions, warranty disclaimers, indemnity, and limitations of liability.`,
  },
  {
    id: "governing-law",
    title: "Governing Law and Dispute Resolution",
    content: `These Terms shall be governed by and construed in accordance with the laws of the State of New York, without regard to its conflict of law provisions.

Any dispute arising out of or relating to these Terms or your use of the Service shall first be attempted to be resolved through informal negotiation. If the dispute cannot be resolved through negotiation, it shall be subject to binding arbitration in New York, New York.

Any legal suit, action, or proceeding arising out of, or related to, these Terms or the Service shall be instituted exclusively in the federal courts of the United States or the courts of the State of New York.`,
  },
  {
    id: "contact-us",
    title: "Contact Us",
    content: `If you have any questions about these Terms, please contact us at:

Email: ${process.env.NEXT_PUBLIC_CONTACT_EMAIL || "support@bookwizard.com"}

BookWizard
[Your Business Address]`,
  },
];

// Links for the Terms of Use page
export const relatedLinks = [
  {
    title: "Privacy Policy",
    href: "/privacy-policy",
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
