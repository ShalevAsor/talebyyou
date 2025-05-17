import { BookTemplateCreateData } from "@/types/book";

// data/default-book-templates.ts
export const defaultTemplates: BookTemplateCreateData[] = [
  {
    title: "Space Adventure",
    description:
      "Join an exciting journey through the stars where your child becomes an astronaut exploring new planets and meeting friendly aliens.",
    pageCount: 4,
    coverPrompt:
      " sitting under an apple tree, reading a book, on a sunny day, in a peaceful countryside.",
    coverImage: "/images/style/styleImageAnime.jpg",
    published: true,
    minAge: 0,
    maxAge: 8,
    genres: ["Adventure", "Educational"],
    pages: [
      {
        pageNumber: 1,
        content:
          "One day, [CHILD_NAME] looked up at the stars and wondered what adventures might be waiting in space.",
        imagePrompt:
          "Child looking up at stars from bedroom window with wonder, space-themed room, night sky visible",
        imageUrl: "/images/style/styleImageCartoon.jpg",
      },
      {
        pageNumber: 2,
        content:
          "Suddenly, a friendly alien spaceship landed in [CHILD_NAME]'s backyard. 'Would you like to explore the galaxy?' asked the alien captain.",
        imagePrompt:
          "Colorful friendly alien spaceship landing in backyard, child looking surprised and excited",
        imageUrl: "/images/style/styleImageCartoon.jpg",
      },
      {
        pageNumber: 3,
        content:
          "With a brave smile, [CHILD_NAME] climbed aboard the spaceship. The adventure was about to begin!",
        imagePrompt:
          "Child climbing aboard alien spaceship with determination, spaceship glowing with soft lights",
        imageUrl: "/images/style/styleImageCartoon.jpg",
      },
      {
        pageNumber: 4,
        content:
          "The spaceship zoomed through the stars, and [CHILD_NAME] discovered a beautiful planet with floating mountains and rainbow rivers.",
        imagePrompt:
          "Child in spaceship cockpit looking at amazing alien planet with floating mountains and colorful landscape",
        imageUrl: "/images/style/styleImageCartoon.jpg",
      },
    ],
  },
  {
    title: "Magical Forest",
    description:
      "A magical tale where your child discovers they have special powers and must save the enchanted creatures of the forest.",
    pageCount: 4, // Reduced for simplicity
    coverPrompt:
      "sitting under an apple tree, reading a book, on a sunny day, in a peaceful countryside.",
    coverImage: "/images/style/styleImageAnime.jpg",
    published: true,
    minAge: 0,
    maxAge: 8,
    genres: ["Fantasy", "Magic", "Nature"],
    pages: [
      {
        pageNumber: 1,
        content:
          "[CHILD_NAME] loved to walk in the forest near home. But today, something felt different. The trees seemed to whisper secrets.",
        imagePrompt:
          "Child walking in enchanted forest with sunbeams, magical atmosphere, trees with faces subtly visible",
        imageUrl: "/images/style/styleImageCartoon.jpg",
      },
      {
        pageNumber: 2,
        content:
          "A tiny glowing fairy appeared before [CHILD_NAME]. 'You have been chosen! The forest needs your help,' the fairy said urgently.",
        imagePrompt:
          "Child meeting small glowing fairy in forest clearing, look of surprise on child's face, magical glow",
        imageUrl: "/images/style/styleImageCartoon.jpg",
      },
      {
        pageNumber: 3,
        content:
          "[CHILD_NAME]'s hands began to sparkle with magical light. 'You have the power to heal the forest,' explained the fairy.",
        imagePrompt:
          "Child with hands glowing with magical energy, fairy guiding them, forest creatures watching from behind trees",
        imageUrl: "/images/style/styleImageCartoon.jpg",
      },
      {
        pageNumber: 4,
        content:
          "Using the new magical powers, [CHILD_NAME] helped the forest creatures and became the guardian of the magical forest.",
        imagePrompt:
          "Child using magic to heal sick tree, forest animals gathering around, magical aura surrounding the scene",
        imageUrl: "/images/style/styleImageCartoon.jpg",
      },
    ],
  },
  {
    title: "Underwater Explorer",
    description:
      "Dive deep under the sea where your child becomes an ocean explorer, discovering hidden treasures and making friends with sea creatures.",
    pageCount: 4, // Reduced for simplicity
    coverPrompt:
      "sitting under an apple tree, reading a book, on a sunny day, in a peaceful countryside.",
    coverImage: "/images/style/styleImageAnime.jpg",
    published: true,
    minAge: 0,
    maxAge: 8,
    genres: ["Adventure", "Educational", "Nature"],
    pages: [
      {
        pageNumber: 1,
        content:
          "[CHILD_NAME] stood at the edge of the ocean, watching the waves. A magical seashell washed up at [CHILD_NAME]'s feet.",
        imagePrompt:
          "Child at beach finding glowing seashell, ocean waves, sunset colors, sense of wonder",
        imageUrl: "/images/style/styleImageCartoon.jpg",
      },
      {
        pageNumber: 2,
        content:
          "When [CHILD_NAME] picked up the shell, something amazing happened! [CHILD_NAME] could suddenly breathe underwater!",
        imagePrompt:
          "Child transforming with magical glow, seashell in hand, partially underwater showing ability to breathe",
        imageUrl: "/images/style/styleImageCartoon.jpg",
      },
      {
        pageNumber: 3,
        content:
          "[CHILD_NAME] swam deeper and deeper, meeting friendly fish, playful dolphins, and a wise old turtle named Horizon.",
        imagePrompt:
          "Child swimming underwater with sea creatures, dolphins, colorful fish, and wise old turtle, underwater wonderland",
        imageUrl: "/images/style/styleImageCartoon.jpg",
      },
      {
        pageNumber: 4,
        content:
          "Horizon led [CHILD_NAME] to a hidden underwater city where merpeople lived. 'You're the first human explorer to find us!' they cheered.",
        imagePrompt:
          "Child discovering underwater city with merpeople, coral buildings, celebration, underwater lights",
        imageUrl: "/images/style/styleImageCartoon.jpg",
      },
    ],
  },
  {
    title: "Superhero Journey",
    description:
      "Your child develops amazing superpowers and learns to use them responsibly to help others and save the day.",
    pageCount: 4, // Reduced for simplicity
    coverPrompt:
      " sitting under an apple tree, reading a book, on a sunny day, in a peaceful countryside.",
    coverImage: "/images/style/styleImageAnime.jpg",
    published: true,
    minAge: 0,
    maxAge: 8,
    genres: ["Superhero", "Action", "Values"],
    pages: [
      {
        pageNumber: 1,
        content:
          "It was just another day until [CHILD_NAME] noticed something strange - objects floating whenever [CHILD_NAME] pointed at them!",
        imagePrompt:
          "Child in bedroom looking surprised as toys float in air, superhero posters on wall, morning light",
        imageUrl: "/images/style/styleImageCartoon.jpg",
      },
      {
        pageNumber: 2,
        content:
          "[CHILD_NAME] discovered more amazing powers: super strength, incredible speed, and even the ability to fly!",
        imagePrompt:
          "Child testing superpowers in backyard, flying a few feet off ground, objects demonstrating super strength",
        imageUrl: "/images/style/styleImageCartoon.jpg",
      },
      {
        pageNumber: 3,
        content:
          "'With great power comes great responsibility,' [CHILD_NAME] remembered from a favorite movie. It was time to help others.",
        imagePrompt:
          "Child in homemade superhero outfit, looking determined, standing on rooftop overlooking city",
        imageUrl: "/images/style/styleImageCartoon.jpg",
      },
      {
        pageNumber: 4,
        content:
          "[CHILD_NAME] became the city's greatest hero, saving people from danger and showing that true heroism comes from the heart.",
        imagePrompt:
          "Child as superhero rescuing people from various situations, community members cheering, city backdrop",
        imageUrl: "/images/style/styleImageCartoon.jpg",
      },
    ],
  },
  {
    title: "Around the World",
    description:
      "An exciting journey around the globe! This adventure story travels to famous landmarks and vibrant cities across continents, exploring diverse cultures and beautiful landscapes while building geography awareness in a fun, engaging way. Perfect for curious explorers ages 3-8.",
    pageCount: 26,
    coverPrompt:
      "Standing on path across colorful world map, small backpack, landmark icons around",
    coverImage: "/images/style/styleImageAnime.jpg",
    published: true,
    minAge: 3,
    maxAge: 8,
    genres: ["Adventure", "Educational"],
    pages: [
      {
        pageNumber: 1,
        content:
          "[CHILD_NAME] looked at the big blue sky through the window. 'What's out there to discover?' [HE_SHE] wondered. With excitement, [CHILD_NAME] packed a backpack with a map, a snack, and a small teddy bear. 'Today I'm going to explore the world!' [HE_SHE] announced happily.",
        imagePrompt:
          "By window looking outside, packing backpack with map and teddy bear",
        imageUrl: "/images/style/styleImageCartoon.jpg",
      },
      {
        pageNumber: 2,
        content:
          "First stop: New York City! The buildings reached up to touch the clouds. The Statue of Liberty stood tall in the water with her torch raised high. 'Everything is so big here!' [CHILD_NAME] exclaimed. Yellow taxis drove by as [HE_SHE] held [HIS_HER] map.",
        imagePrompt:
          "Looking at New York skyline and Statue of Liberty, yellow taxis nearby",
        imageUrl: "/images/style/styleImageCartoon.jpg",
      },
      {
        pageNumber: 3,
        content:
          "In Paris, cobblestone streets led to the magnificent Eiffel Tower. 'Bonjour!' said a baker, offering a warm croissant. [CHILD_NAME] enjoyed the treat while watching artists paint by the river. 'This city has so much beauty,' thought [HE_SHE].",
        imagePrompt:
          "In Paris eating croissant, Eiffel Tower and artists painting in background",
        imageUrl: "/images/style/styleImageCartoon.jpg",
      },
      {
        pageNumber: 4,
        content:
          "London greeted [CHILD_NAME] with gentle rain. Big Ben chimed loudly as red buses passed by. A royal guard stood perfectly still. 'Does [HE_SHE] ever move?' wondered [CHILD_NAME]. The London Eye turned slowly by the river Thames.",
        imagePrompt:
          "With umbrella in London rain, Big Ben, red bus, and royal guard nearby",
        imageUrl: "/images/style/styleImageCartoon.jpg",
      },
      {
        pageNumber: 5,
        content:
          "The Egyptian desert was warm and golden. Great pyramids rose up like mountains against the blue sky. 'These are thousands of years old,' [CHILD_NAME] remembered. The ancient Sphinx watched silently as [HE_SHE] walked along the sandy path.",
        imagePrompt:
          "Walking near Egyptian pyramids and Sphinx in desert landscape",
        imageUrl: "/images/style/styleImageCartoon.jpg",
      },
      {
        pageNumber: 6,
        content:
          "Japan was full of cherry blossoms floating through the air. [CHILD_NAME] crossed a red bridge over a pond where colorful fish swam peacefully. Mount Fuji appeared in the distance. A person in a kimono showed how to fold an origami crane. 'Arigato!' said [CHILD_NAME].",
        imagePrompt:
          "On red bridge in Japanese garden with cherry blossoms and Mount Fuji",
        imageUrl: "/images/style/styleImageCartoon.jpg",
      },
      {
        pageNumber: 7,
        content:
          "The Great Wall of China stretched across green hills like a sleeping dragon. Red lanterns swayed in the gentle breeze. 'This wall goes on forever!' [CHILD_NAME] observed, walking carefully on the ancient stones. A panda munched bamboo nearby.",
        imagePrompt:
          "Walking on Great Wall of China with green hills and panda eating bamboo",
        imageUrl: "/images/style/styleImageCartoon.jpg",
      },
      {
        pageNumber: 8,
        content:
          "Brazil was alive with music and color. Dancers twirled in bright costumes at the carnival. The statue of Christ the Redeemer watched over Rio de Janeiro below. 'The music makes me want to dance too!' said [CHILD_NAME], moving to the rhythm.",
        imagePrompt:
          "Dancing at Brazilian carnival with Christ the Redeemer statue visible",
        imageUrl: "/images/style/styleImageCartoon.jpg",
      },
      {
        pageNumber: 9,
        content:
          "Australia welcomed [CHILD_NAME] with sunshine. Kangaroos hopped across the red earth. A koala dozed in a eucalyptus tree. The Sydney Opera House shined like seashells by the harbor. 'G'day!' said a ranger, showing how to throw a boomerang.",
        imagePrompt:
          "In Australian outback with kangaroos and koala, Sydney Opera House visible",
        imageUrl: "/images/style/styleImageCartoon.jpg",
      },
      {
        pageNumber: 10,
        content:
          "African savanna stretched as far as the eye could see. Elephants used their trunks to spray water. Giraffes reached for leaves in tall trees. 'So many amazing animals,' whispered [CHILD_NAME]. Lions rested in the shade, watching calmly.",
        imagePrompt:
          "On safari in Africa watching elephants, giraffes and lions in grassland",
        imageUrl: "/images/style/styleImageCartoon.jpg",
      },
      {
        pageNumber: 11,
        content:
          "In Alaska, colorful lights danced across the night sky. [CHILD_NAME] wore a warm coat as snowflakes fell softly. A sled dog waited to pull [HIM_HER] across the sparkling snow. 'The Northern Lights look like magic,' [HE_SHE] said with wonder.",
        imagePrompt:
          "In snowy Alaska watching Northern Lights with sled dog nearby",
        imageUrl: "/images/style/styleImageCartoon.jpg",
      },
      {
        pageNumber: 12,
        content:
          "After visiting many wonderful places, [CHILD_NAME] rested on a hill under the stars. [HE_SHE] thought about everything [HE_SHE] had seen. 'The world is big and beautiful,' [CHILD_NAME] whispered. [HIS_HER] heart was full of new experiences.",
        imagePrompt:
          "Sitting on hill under starry night sky looking thoughtful with backpack",
        imageUrl: "/images/style/styleImageCartoon.jpg",
      },
      {
        pageNumber: 13,
        content:
          "Home at last, [CHILD_NAME] walked through the door with a smile. 'I've seen the whole world!' [HE_SHE] said proudly. New treasures lined [HIS_HER] shelf – souvenirs from each special place. 'Now I can share my adventures!' [CHILD_NAME] said, opening a scrapbook filled with memories.",
        imagePrompt:
          "At home showing collection of world souvenirs and opening adventure scrapbook",
        imageUrl: "/images/style/styleImageCartoon.jpg",
      },
    ],
  },
];
