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
    name: "Sarah J.",
    childName: "Emma",
    childAge: 6,
    quote:
      "I uploaded a photo of Emma and the AI transformed it into the most beautiful illustration. The physical book we ordered is now her most prized possession. The customization options let us add personal touches that made it truly special.",
    rating: 5,
    productType: "Physical Book",
  },
  {
    id: 2,
    name: "Michael R.",
    childName: "Liam",
    childAge: 5,
    quote:
      "The digital version was perfect for us! I uploaded Liam's drawing and the AI illustrations captured his style but made it look professional. We customized all the colors and details exactly how he wanted. He loves showing it off on our tablet.",
    rating: 5,
    productType: "Digital Copy",
  },
  {
    id: 3,
    name: "Emily C.",
    childName: "Sophia",
    childAge: 7,
    quote:
      "We uploaded a family photo and the illustrations were beyond what we imagined. The customization tools let Sophia pick every detail. We ordered both digital and physical copies - the print quality is amazing and the digital version is perfect for sharing with family.",
    rating: 5,
    productType: "Physical & Digital",
  },
];
