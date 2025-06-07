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
    id: "getting-started",
    title: "Getting Started",
    description:
      "Learn the basics of creating your first personalized book. We'll walk you through selecting a template and beginning your customization journey.",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Placeholder
    thumbnail: "/images/placeholders/tutorial-getting-started.jpg",
    duration: "4:32",
  },
  {
    id: "template-selection",
    title: "How to Choose the Perfect Book Template",
    description:
      " In this tutorial, you'll learn exactly how to choose the perfect book template for your personalized story on TaleByYou.",
    videoUrl: "https://www.youtube.com/embed/-qlp3sEtO5I", // Placeholder
    thumbnail: "/images/thumbnails/tn1.webp",
    duration: "2:03",
  },
  {
    id: "character-creation",
    title: "Character Creation & Photo Upload",
    description:
      "Step-by-step guide on uploading photos and creating characters that look like your child for the perfect personalized experience.",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Placeholder
    thumbnail: "/images/placeholders/tutorial-character.jpg",
    duration: "5:48",
  },
  {
    id: "ordering-printing",
    title: "Ordering & Printing Your Book",
    description:
      "Complete the process by learning how to review, order, and receive your beautifully printed personalized children's book.",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Placeholder
    thumbnail: "/images/placeholders/tutorial-ordering.jpg",
    duration: "3:22",
  },
];
