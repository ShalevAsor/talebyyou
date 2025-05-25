export interface Testimonial {
  id: number;
  name: string;
  childName: string;
  childAge: number;
  quote: string;
  rating: number;
  productType: string;
}

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "David L.",
    childName: "Noah",
    childAge: 8,
    quote:
      "Noah has always been a reluctant reader, but seeing himself in his own adventure book changed everything. The AI made him look like a real hero! We love that we got the digital version instantly and can read it anywhere. He's already asking for his next book.",
    rating: 5,
    productType: "Digital Copy",
  },
  {
    id: 2,
    name: "Amanda K.",
    childName: "Zoe",
    childAge: 6,
    quote:
      "The customization options are incredible! We personalized everything from Zoe's eye color to her hair style. The AI-generated images look so professional, and the physical book quality exceeded our expectations. Grandparents are ordering copies too!",
    rating: 5,
    productType: "Physical & Digital",
  },
  {
    id: 3,
    name: "Mark & Lisa W.",
    childName: "Alex",
    childAge: 5,
    quote:
      "We ordered this for our son Alex who's been dealing with some confidence issues. Seeing himself as the hero of his own story has been incredibly empowering for him. The AI did an amazing job capturing his features, and the story themes are so positive.",
    rating: 5,
    productType: "Physical & Digital",
  },
  {
    id: 4,
    name: "Jessica M.",
    childName: "Olivia",
    childAge: 4,
    quote:
      "I was amazed how the AI captured Olivia's bright smile and curly hair perfectly! She squeals with delight every time she sees herself as the main character. The story about underwater adventures is now her favorite bedtime book. Worth every penny!",
    rating: 5,
    productType: "Physical Book",
  },
  {
    id: 5,
    name: "Rachel T.",
    childName: "Ethan",
    childAge: 10,
    quote:
      "Ethan thought he was 'too old' for picture books until he saw himself as the main character in an around-the-world adventure. The AI captured his personality perfectly! He's showing it to all his friends and wants to create one for his little sister next.",
    rating: 5,
    productType: "Digital Copy",
  },
  {
    id: 6,
    name: "Priya P.",
    childName: "Arjun",
    childAge: 9,
    quote:
      "Arjun loves that his book reflects his Indian heritage - we were able to customize his appearance perfectly. The AI understood our specifications beautifully. Having both digital and physical versions means he can share with family overseas too!",
    rating: 5,
    productType: "Physical & Digital",
  },
];
