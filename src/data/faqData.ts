export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export const faqItems: FAQItem[] = [
  {
    id: "item-1",
    question: "What age ranges do your books cover?",
    answer:
      "Our collection includes books for all young readers, from babies and toddlers (0-3 years) to picture books (3-7 years), early readers (5-9 years), and middle-grade books (8-12 years). Each book is carefully labeled with age recommendations to help you find the perfect match for your child's reading level.",
  },
  {
    id: "item-2",
    question: "Do you offer personalized book recommendations?",
    answer:
      "Yes! We offer personalized book recommendations based on your child's age, interests, and reading level. Our team of children's literature experts is passionate about matching young readers with books they'll love. Just reach out to our customer service team, and we'll be happy to help you find the perfect books.",
  },
  {
    id: "item-3",
    question: "How do you select the books in your store?",
    answer:
      "Each book in our collection is carefully curated by our team of children's literature specialists. We focus on books that inspire imagination, promote diversity and inclusion, and encourage a lifelong love of reading. We regularly review new releases and classics to ensure our selection represents the best in children's literature.",
  },
  {
    id: "item-4",
    question: "Do you offer gift wrapping services?",
    answer:
      "We offer complimentary gift wrapping for all purchases. During checkout, you can select our gift wrapping option and even include a personalized message. Our kid-friendly wrapping paper designs make receiving books even more exciting for young readers.",
  },
  {
    id: "item-5",
    question: "What is your return policy?",
    answer:
      "We want you and your child to be completely satisfied with your purchase. If you're not happy with your order for any reason, you can return it within 30 days for a full refund or exchange. Books must be in their original condition. Please note that personalized books cannot be returned unless there's a printing error.",
  },
  {
    id: "item-6",
    question: "Do you host any reading events for children?",
    answer:
      "Yes! We regularly host virtual storytelling sessions, author meet-and-greets, and interactive reading workshops. Check our Events page for upcoming activities. We also offer special reading programs during school holidays. Join our newsletter to stay updated on all our exciting events for young readers.",
  },
];
