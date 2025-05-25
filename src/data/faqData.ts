export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export const faqItems: FAQItem[] = [
  {
    id: "item-1",
    question: "How does the book personalization process work?",
    answer:
      "Creating your personalized book is simple! First, browse our library and choose a template you love. Then fill out a form with your child's name, age, and upload a photo. You can also customize character details like eye color and hair style. Our AI will generate the cover and first page images for you to preview. After you're happy with the initial results, you can place your order and we'll generate the remaining pages.",
  },
  {
    id: "item-2",
    question: "What information do I need to provide about my child?",
    answer:
      "You'll need your child's name, age, and a clear photo of their face. Optional details include eye color, hair color, hair style, skin tone, and any special characteristics you'd like included. The more details you provide, the better we can personalize the illustrations to look like your child.",
  },
  {
    id: "item-3",
    question: "How long does it take to create and receive my book?",
    answer:
      "AI image generation typically completes within minutes. For digital books, you can download your eBook immediately after finalizing your customizations. Physical books are printed on-demand and usually ship within 3-5 business days. Delivery time depends on your chosen shipping method - standard shipping takes 5-10 business days, while expedited options are available for faster delivery.",
  },
  {
    id: "item-4",
    question: "Can I edit the book content after ordering?",
    answer:
      "Yes! After placing your order and payment, you can edit text content, add dedications, and choose from 3 different image options for each page. You have full control over customizing your book until you're completely satisfied with the final result.",
  },
  {
    id: "item-5",
    question: "What's the difference between digital and physical books?",
    answer:
      "Digital books (eBooks) are downloadable PDF files you can read on any device, perfect for immediate enjoyment and sharing. Physical books are high-quality printed copies shipped to your door, ideal for bedtime stories and keepsakes. When you order a physical book, you automatically receive the digital version as well at no extra cost!",
  },
  {
    id: "item-6",
    question: "How many books can I create before placing an order?",
    answer:
      "To prevent abuse and ensure fair usage, all users can create up to 3 personalized books before needing to place an order. Once you complete your first order, you can create additional books. This limit applies to both guest users and registered accounts.",
  },
  {
    id: "item-7",
    question: "What if I'm not satisfied with the AI-generated images?",
    answer:
      "We generate 3 different image options for each page, so you can choose the one you like best. If none of the generated images meet your expectations, you can create a new book with a different approach. For best results, make sure to upload a clear, high-quality photo with your child's face clearly visible. If you continue to experience issues, our support team is here to help.",
  },
  {
    id: "item-8",
    question: "Is my child's photo and personal information secure?",
    answer:
      "Absolutely. We take privacy seriously, especially when it comes to children. Your child's photos are used only for creating their personalized book and are automatically deleted after completion. All data is securely stored and encrypted. We never share personal information with third parties except our trusted service providers needed to create and deliver your books.",
  },
  {
    id: "item-9",
    question: "What age ranges are your book templates suitable for?",
    answer:
      "Our book templates are designed for children ages 2-15, with stories that appeal to different developmental stages. Each template includes age recommendations to help you choose the most appropriate story for your child. The personalization works for any age within this range.",
  },
  {
    id: "item-10",
    question: "Can I order multiple copies of the same personalized book?",
    answer:
      "Yes! You can add multiple physical copies of the same personalized book to your order at a special discounted price. This is perfect for gifting to grandparents, relatives, or friends. If you want to create different personalized books (with different children or customizations), you'll need to place separate orders for each unique book.",
  },
  {
    id: "item-11",
    question: "Can I create books without creating an account?",
    answer:
      "Yes! You can create and order books as a guest user. Guest sessions last 30 days, giving you time to complete your book creation and ordering process. However, creating a free account allows you to save your work permanently, access your order history, and easily reorder or create variations of your books in the future.",
  },
  {
    id: "item-12",
    question: "What payment methods do you accept?",
    answer:
      "We accept all major payment methods through PayPal's secure payment gateway, including credit cards, debit cards, and PayPal accounts. All transactions are processed securely, and we don't store your payment information on our servers.",
  },
];
