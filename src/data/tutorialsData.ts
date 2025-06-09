// src/data/tutorialsData.ts

export interface Tutorial {
  id: string;
  title: string;
  description: string;
  videoUrl: string; // Will be YouTube/Vimeo embed URL later
  thumbnail: string;
  duration: string;
}

export const tutorialsData: Tutorial[] = [
  {
    id: "template-selection",
    title: "How to Choose the Perfect Book Template",
    description:
      "In this tutorial, you'll learn exactly how to choose the perfect book template for your personalized story on TaleByYou. Discover how to browse and filter through our template library, key factors to consider when selecting templates, and tips for matching templates to your story genre.",
    videoUrl: "https://www.youtube.com/embed/-qlp3sEtO5I", // real video
    thumbnail: "/images/thumbnails/tn1.webp",
    duration: "2:03",
  },
  {
    id: "book-customization",
    title: "How to Edit & Customize Your Personalized Book",
    description:
      "Master the art of book customization! This comprehensive tutorial shows you how to edit and personalize every aspect of your TaleByYou book. Learn how to upload and crop photos, customize character details, modify text content, select from multiple image options, and add personal dedications.",
    videoUrl: "https://www.youtube.com/embed/goEPFrmGQno",
    thumbnail: "/images/thumbnails/thmb2.webp",
    duration: "4:08",
  },
  {
    id: "website-tour",
    title: "Complete TaleByYou Website Tour",
    description:
      "Take a complete tour of the TaleByYou website! This walkthrough shows you every important page and feature so you can navigate with confidence. Explore the homepage, template library, My Books dashboard, contact page, and learn about both mobile and desktop experiences.",
    videoUrl: "https://www.youtube.com/embed/DmwJTH88xGM",
    thumbnail: "/images/thumbnails/mq1.webp",
    duration: "3:31",
  },
  {
    id: "ordering-printing",
    title: "How to Order & Print Your Personalized Book",
    description:
      "Complete the process by learning how to review, order, and receive your beautifully printed personalized children's book. Understand pricing options, shipping choices, digital vs physical formats, and what happens after you place your order.",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Placeholder - update with real URL
    thumbnail: "/images/placeholders/tutorial-ordering.jpg",
    duration: "4:28",
  },
];
