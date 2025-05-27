import { BookTemplateCreateData } from "@/types/book";

// data/default-book-templates.ts
export const defaultTemplates: BookTemplateCreateData[] = [
  {
    title: "Around the World",
    description:
      "An exciting journey around the globe! This adventure story travels to famous landmarks and vibrant cities across continents, exploring diverse cultures and beautiful landscapes while building geography awareness in a fun, engaging way. Perfect for curious explorers ages 3-8.",
    pageCount: 26,
    coverPrompt:
      "Standing on path across colorful world map, small backpack, landmark icons around, smiling excitedly",
    coverImage: "/images/placeholders/book-template-placeholder.jpg",
    published: false,
    characterGender: "girl",
    minAge: 3,
    maxAge: 8,
    genres: ["Adventure", "Educational"],
    pages: [
      {
        pageNumber: 1,
        content:
          "[CHILD_NAME] looked at the big blue sky through the window. 'What's out there to discover?' [HE_SHE] wondered. With excitement, [CHILD_NAME] packed a backpack with a map, a snack, and a small teddy bear. 'Today I'm going to explore the world!' [HE_SHE] announced happily.",
        imagePrompt:
          "By window looking outside, packing backpack with map and teddy bear, smiling",
        imageUrl: "/images/placeholders/book-template-placeholder.jpg",
      },
      {
        pageNumber: 2,
        content:
          "First stop: New York City! The buildings reached up to touch the clouds. The Statue of Liberty stood tall in the water with her torch raised high. 'Everything is so big here!' [CHILD_NAME] exclaimed. Yellow taxis drove by as [HE_SHE] held [HIS_HER] map.",
        imagePrompt:
          "Looking at New York skyline and Statue of Liberty, yellow taxis nearby, pointing excitedly",
        imageUrl: "/images/placeholders/book-template-placeholder.jpg",
      },
      {
        pageNumber: 3,
        content:
          "In Paris, cobblestone streets led to the magnificent Eiffel Tower. 'Bonjour!' said a baker, offering a warm croissant. [CHILD_NAME] smelled the sweet pastry and took a bite. 'This city has so much beauty,' thought [HE_SHE], watching artists paint by the river.",
        imagePrompt:
          "In Paris eating croissant, Eiffel Tower and artists painting in background",
        imageUrl: "/images/placeholders/book-template-placeholder.jpg",
      },
      {
        pageNumber: 4,
        content:
          "London greeted [CHILD_NAME] with gentle rain that pitter-pattered on [HIS_HER] umbrella. Big Ben chimed loudly as red buses passed by. A royal guard stood perfectly still. 'Does [HE_SHE] ever move?' wondered [CHILD_NAME]. The London Eye turned slowly by the river Thames.",
        imagePrompt:
          "With umbrella in London rain, Big Ben, red bus, and royal guard nearby, looking curious",
        imageUrl: "/images/placeholders/book-template-placeholder.jpg",
      },
      {
        pageNumber: 5,
        content:
          "The Egyptian desert was warm and golden. [CHILD_NAME] felt the hot sand beneath [HIS_HER] shoes. Great pyramids rose up like mountains against the blue sky. 'These are thousands of years old,' [CHILD_NAME] remembered. The ancient Sphinx watched silently as [HE_SHE] walked along the sandy path.",
        imagePrompt:
          "Walking near Egyptian pyramids and Sphinx in desert landscape, hand shielding eyes",
        imageUrl: "/images/placeholders/book-template-placeholder.jpg",
      },
      {
        pageNumber: 6,
        content:
          "Japan was full of cherry blossoms floating through the air like pink snow. [CHILD_NAME] crossed a red bridge over a pond where colorful fish swam peacefully. Mount Fuji appeared in the distance. A person in a kimono showed how to fold an origami crane. 'Arigato!' said [CHILD_NAME].",
        imagePrompt:
          "On red bridge in Japanese garden with cherry blossoms and Mount Fuji, holding origami",
        imageUrl: "/images/placeholders/book-template-placeholder.jpg",
      },
      {
        pageNumber: 7,
        content:
          "The Great Wall of China stretched across green hills like a sleeping dragon. Red lanterns swayed in the gentle breeze. 'This wall goes on forever!' [CHILD_NAME] observed, walking carefully on the ancient stones. A panda munched bamboo nearby, making [HIM_HER] giggle.",
        imagePrompt:
          "Walking on Great Wall of China with green hills and panda eating bamboo, smiling",
        imageUrl: "/images/placeholders/book-template-placeholder.jpg",
      },
      {
        pageNumber: 8,
        content:
          "Brazil was alive with music and color that made [CHILD_NAME]'s heart beat faster. Dancers twirled in bright costumes at the carnival. The statue of Christ the Redeemer watched over Rio de Janeiro below. 'The music makes me want to dance too!' said [CHILD_NAME], moving to the rhythm.",
        imagePrompt:
          "Dancing at Brazilian carnival with Christ the Redeemer statue visible, arms raised",
        imageUrl: "/images/placeholders/book-template-placeholder.jpg",
      },
      {
        pageNumber: 9,
        content:
          "Australia welcomed [CHILD_NAME] with warm sunshine on [HIS_HER] face. Kangaroos hopped across the red earth. A koala dozed in a eucalyptus tree. The Sydney Opera House shined like seashells by the harbor. 'G'day!' said a ranger, showing how to throw a boomerang.",
        imagePrompt:
          "In Australian outback with kangaroos and koala, Sydney Opera House visible, trying boomerang",
        imageUrl: "/images/placeholders/book-template-placeholder.jpg",
      },
      {
        pageNumber: 10,
        content:
          "African savanna stretched as far as the eye could see. Even at just [CHILD_AGE] years old, [CHILD_NAME] knew this was special. Elephants used their trunks to spray water. Giraffes reached for leaves in tall trees. 'So many amazing animals,' whispered [CHILD_NAME]. Lions rested in the shade, watching calmly.",
        imagePrompt:
          "On safari in Africa watching elephants, giraffes and lions in grassland, looking amazed",
        imageUrl: "/images/placeholders/book-template-placeholder.jpg",
      },
      {
        pageNumber: 11,
        content:
          "In Alaska, colorful lights danced across the night sky. [CHILD_NAME] wore a warm coat as snowflakes fell softly on [HIS_HER] mittens. A sled dog waited to pull [HIM_HER] across the sparkling snow. 'The Northern Lights look like magic,' [HE_SHE] said with wonder.",
        imagePrompt:
          "In snowy Alaska watching Northern Lights with sled dog nearby, catching snowflakes",
        imageUrl: "/images/placeholders/book-template-placeholder.jpg",
      },
      {
        pageNumber: 12,
        content:
          "After visiting many wonderful places, [CHILD_NAME] rested on a hill under the stars. [HE_SHE] thought about everything [HE_SHE] had seen. 'The world is big and beautiful,' [CHILD_NAME] whispered. [HIS_HER] heart was full of new experiences and adventures.",
        imagePrompt:
          "Sitting on hill under starry night sky looking thoughtful with backpack, smiling peacefully",
        imageUrl: "/images/placeholders/book-template-placeholder.jpg",
      },
      {
        pageNumber: 13,
        content:
          "Home at last, [CHILD_NAME] walked through the door with a smile. 'I've seen the whole world!' [HE_SHE] said proudly. New treasures lined [HIS_HER] shelf – souvenirs from each special place. 'Now I can share my adventures!' [CHILD_NAME] said, opening a scrapbook filled with memories.",
        imagePrompt:
          "At home showing collection of world souvenirs and opening adventure scrapbook, excited expression",
        imageUrl: "/images/placeholders/book-template-placeholder.jpg",
      },
    ],
  },
  {
    title: "Underwater Explorer",
    description:
      "Dive deep under the sea where your child becomes an ocean explorer, discovering hidden treasures and making friends with magnificent sea creatures. This aquatic adventure builds ocean awareness while fostering curiosity about marine life through beautiful imagery and engaging storytelling. Perfect for young ocean lovers ages 5-12.",
    pageCount: 26, // Double the content pages (13 text/image pairs)
    coverPrompt:
      "Standing on a sandy beach, looking out at the sea, sunny sky, footprints in sand, wearing colorful diving gear, excited expression",
    coverImage: "/images/placeholders/book-template-placeholder.jpg",
    published: false,
    characterGender: "boy",
    minAge: 5,
    maxAge: 12,
    genres: ["Adventure", "Educational"],
    pages: [
      {
        pageNumber: 1,
        content:
          "Standing barefoot on the warm sand, [CHILD_NAME] pulled on [HIS_HER] colorful diving suit and looked out at the sparkling sea. The waves danced in the sunlight, whispering promises of adventure. [HE_SHE] took a deep breath, feeling the salty breeze on [HIS_HER] face, and smiled—today was the day to explore the ocean's hidden secrets.",
        imagePrompt:
          "Standing on a sunny beach, wearing colorful diving suit, looking at ocean with excited expression",
        imageUrl: "/images/placeholders/book-template-placeholder.jpg",
      },
      {
        pageNumber: 2,
        content:
          "[CHILD_NAME] stepped slowly into the cool ocean. The gentle waves touched [HIS_HER] legs, and the soft sand shifted under [HIS_HER] feet with each step. With a deep breath, [HE_SHE] dived into the blue world below. Bubbles rose all around as the surface vanished. Everything was quiet, calm, and filled with magical wonder waiting to be discovered.",
        imagePrompt:
          "Underwater just below surface, surrounded by bubbles, arms outstretched,peaceful and curious expression, clear blue water",
        imageUrl: "/images/placeholders/book-template-placeholder.jpg",
      },
      {
        pageNumber: 3,
        content:
          "Not far from the shore, [CHILD_NAME] spotted something moving near a rock. It was a small red crab, walking sideways over the soft sand. [CHILD_NAME] floated still, eyes wide with curiosity, watching as the crab waved its tiny claws and then scurried quickly into a tiny hole. [HE_SHE] smiled with joy—this was [HIS_HER] first ocean friend!",
        imagePrompt:
          "Underwater near rocky area, looking at small red crab on sandy sea floor, pointing with interest,  with curiosity and joyful smile",
        imageUrl: "/images/placeholders/book-template-placeholder.jpg",
      },
      {
        pageNumber: 4,
        content:
          "Deeper in the water, [CHILD_NAME] suddenly saw a big fish swimming slowly nearby. Its shiny scales sparkled like silver in the shifting light. The fish moved gracefully, its fins gliding like wings. For a moment, it turned its head to look directly at [CHILD_NAME], as if saying hello, then disappeared into the endless blue. [CHILD_NAME] watched, amazed and delighted.",
        imagePrompt:
          "Underwater in open water, looking at large silver fish swimming nearby, expression of wonder",
        imageUrl: "/images/placeholders/book-template-placeholder.jpg",
      },
      {
        pageNumber: 5,
        content:
          "As [CHILD_NAME] floated quietly, a large sea turtle appeared, gliding slowly through the clear water. Its wide, smooth shell shimmered softly, and its flippers moved like gentle wings. The turtle swam past peacefully, not in any hurry. [CHILD_NAME] followed it for a while, feeling calm, curious, and full of quiet joy.",
        imagePrompt:
          "Swimming underwater near large sea turtle, both moving through calm blue water, reaching out hand, with peaceful and curious expression, smiling softly",
        imageUrl: "/images/placeholders/book-template-placeholder.jpg",
      },
      {
        pageNumber: 6,
        content:
          "Something soft and glowing drifted nearby. [CHILD_NAME] saw a jellyfish floating gently, like a tiny umbrella made of light. Its long, wavy arms moved with the current, trailing behind like ribbons. [HE_SHE] kept a safe distance, watching as it shimmered in the sunlight. It looked like a magical, living piece of art.",
        imagePrompt:
          "Underwater watching jellyfish float nearby, jellyfish glowing softly,  maintaining safe distance with cautious but fascinated expression",
        imageUrl: "/images/placeholders/book-template-placeholder.jpg",
      },
      {
        pageNumber: 7,
        content:
          "Swimming further, [CHILD_NAME] discovered a rainbow of colors ahead—a coral reef! The busy reef was like an underwater city, home to countless tiny fish that darted in and out of hiding spots. At just [CHILD_AGE] years old, [CHILD_NAME] had never seen anything so colorful. A striped clownfish peeked out from a swaying anemone, curiously watching the young [BOY_GIRL] exploring its neighborhood. [HE_SHE] floated perfectly still, hardly daring to breathe.",
        imagePrompt:
          "Floating near vibrant coral reef, surrounded by colorful small fish, clownfish in anemone nearby, expression of wonder and excitement",
        imageUrl: "/images/placeholders/book-template-placeholder.jpg",
      },
      {
        pageNumber: 8,
        content:
          "[CHILD_NAME]'s eyes widened with excitement. There, half-buried in sand, was an old wooden chest! Curious fish swam circles around [HIM_HER] as [HE_SHE] gently brushed away the sand. Was it pirate treasure? The chest was covered in colorful shells and swaying seaweed. [CHILD_NAME] imagined the adventures it had seen, resting here on the ocean floor. [HIS_HER] heart beat faster with the thrill of discovery.",
        imagePrompt:
          "Discovering old treasure chest on ocean floor, partially covered by sand and seaweed, small fish swimming around, reaching toward chest thrilled and excited expression",
        imageUrl: "/images/placeholders/book-template-placeholder.jpg",
      },
      {
        pageNumber: 9,
        content:
          "[CHILD_NAME] swam toward some rocks and spotted a sea lion resting nearby. It turned its head, blinked slowly, and then slipped into the water with a playful splash. The sea lion twirled and dove, making bubbles all around. [CHILD_NAME] laughed joyfully and followed, feeling like part of the fun and excitement.",
        imagePrompt:
          "Swimming underwater near playful sea lion diving off rock, surrounded by bubbles, laughing with pure joy and delight",
        imageUrl: "/images/placeholders/book-template-placeholder.jpg",
      },
      {
        pageNumber: 10,
        content:
          "Suddenly, a sleek dolphin appeared, swimming fast and playful through the water. It circled around [CHILD_NAME], leaping and diving with joy. For a moment, it swam side by side with [HIM_HER], clicking softly, almost as if talking. [CHILD_NAME] laughed underwater, bubbles rising—this was the most fun [HE_SHE] had experienced so far!",
        imagePrompt:
          "Swimming underwater next to playful dolphin, dolphin swimming alongside, bubbles rising, expression of pure happiness and joy, biggest smile",
        imageUrl: "/images/placeholders/book-template-placeholder.jpg",
      },
      {
        pageNumber: 11,
        content:
          "Farther out in the deep blue, a huge shape moved gracefully through the water. It was a whale—calm, slow, and powerful. [CHILD_NAME] stared in awe as it passed by, its giant tail waving gently, creating ripples. The ocean felt vast and quiet, and in that moment, [CHILD_NAME] felt small but safe, surrounded by the ocean's peaceful beauty.",
        imagePrompt:
          "Swimming in deep blue water near massive whale, whale moving peacefully with large tail visible, expression of awe and reverence, mouth slightly open in amazement",
        imageUrl: "/images/placeholders/book-template-placeholder.jpg",
      },
      {
        pageNumber: 12,
        content:
          "As [CHILD_NAME] watched the whale disappear into the deep blue, a quiet feeling filled the water. The light above had changed—softer, dimmer, as if the sea was saying goodbye. [CHILD_NAME] looked up and knew it was getting late. With one last glance at the vast ocean, [HE_SHE] turned around and started to swim back toward the shore.",
        imagePrompt:
          "Underwater looking up toward light, swimming toward surface, ocean calm and darker, thoughtful and peaceful expression, slight smile of contentment",
        imageUrl: "/images/placeholders/book-template-placeholder.jpg",
      },
      {
        pageNumber: 13,
        content:
          "[CHILD_NAME] stepped out of the water, dripping with saltwater and smiling wide. The sun was low in the sky, painting it with warm colors of orange and pink. [HE_SHE] looked back at the ocean, thinking of all the incredible creatures [HE_SHE] had met. It had been a magical day full of adventures, and [CHILD_NAME] felt happy, brave, and ready for dreams of the deep sea.",
        imagePrompt:
          "Standing on beach at sunset, wet and smiling widely with satisfaction and happiness, looking back at sea with grateful expression, colorful sky, footprints visible",
        imageUrl: "/images/placeholders/book-template-placeholder.jpg",
      },
    ],
  },
  {
    title: "Space Adventurer",
    description:
      "Blast off on a magical journey through space! Your child becomes a brave space explorer, discovering colorful planets, meeting friendly space creatures, and collecting cosmic treasures. This imaginative adventure sparks wonder about the universe while keeping everything fun and child-friendly. Perfect for young dreamers ages 4-12.",
    pageCount: 26, // 13 text/image pairs
    coverPrompt:
      "Standing by colorful rocket ship, wearing space suit with helmet under arm, smiling excitedly with stars in background",
    coverImage: "/images/placeholders/book-template-placeholder.jpg",
    published: false,
    characterGender: "boy",
    minAge: 4,
    maxAge: 12,
    genres: ["Adventure", "Science Fiction"],
    pages: [
      {
        pageNumber: 1,
        content:
          "[CHILD_NAME] looked up at the twinkling stars through [HIS_HER] bedroom window. 'What amazing places are up there?' [HE_SHE] wondered aloud. That night, [CHILD_NAME] dreamed of flying through space in a rocket ship. When morning came, [HE_SHE] had the most wonderful idea for today's adventure.",
        imagePrompt:
          "Looking out bedroom window at starry night sky, pointing up at stars, excited expression",
        imageUrl: "/images/placeholders/book-template-placeholder.jpg",
      },
      {
        pageNumber: 2,
        content:
          "In the garage, [CHILD_NAME] found an old cardboard box and some shiny foil. With careful work, [HE_SHE] built the most amazing rocket ship ever! [CHILD_NAME] climbed inside and put on [HIS_HER] space helmet. 'Ten, nine, eight...' [HE_SHE] counted down. 'Blast off!' Suddenly, the cardboard rocket became real, and [CHILD_NAME] was soaring into space!",
        imagePrompt:
          "Sitting in cardboard rocket ship with foil decorations, wearing space helmet, arms raised in celebration",
        imageUrl: "/images/placeholders/book-template-placeholder.jpg",
      },
      {
        pageNumber: 3,
        content:
          "The rocket ship flew higher and higher until Earth looked like a beautiful blue marble below. [CHILD_NAME] had never felt so amazed! [HE_SHE] pressed the colorful buttons on [HIS_HER] control panel and steered toward a bright purple planet in the distance. 'My first stop!' [CHILD_NAME] said with excitement.",
        imagePrompt:
          "Inside rocket ship looking through window at purple planet ahead, pressing colorful control buttons, wide-eyed with wonder",
        imageUrl: "/images/placeholders/book-template-placeholder.jpg",
      },
      {
        pageNumber: 4,
        content:
          "The purple planet was covered in soft, bouncy ground that felt like a giant trampoline! Every step sent [CHILD_NAME] bouncing high into the air. [HE_SHE] laughed as [HE_SHE] collected sparkly purple rocks for [HIS_HER] space treasure bag. 'This is the bounciest place ever!' [CHILD_NAME] giggled, doing flips in the low gravity.",
        imagePrompt:
          "Bouncing high on purple planet surface, collecting sparkly rocks, laughing with arms spread wide",
        imageUrl: "/images/placeholders/book-template-placeholder.jpg",
      },
      {
        pageNumber: 5,
        content:
          "Next, [CHILD_NAME] discovered a bright orange planet where everything glowed like a warm campfire. Friendly space bunnies with fluffy golden fur hopped around everywhere. They had long ears that sparkled and tails that left trails of glitter. The space bunnies shared sweet orange berries that tasted like sunshine with [CHILD_NAME].",
        imagePrompt:
          "On orange glowing planet with fluffy golden space bunnies hopping around, eating orange berries, smiling warmly",
        imageUrl: "/images/placeholders/book-template-placeholder.jpg",
      },
      {
        pageNumber: 6,
        content:
          "The rocket ship's next stop was a planet made entirely of soft, fluffy clouds in every color of the rainbow. [CHILD_NAME] walked on the cloud paths that felt like walking on cotton candy. Singing birds with rainbow feathers flew overhead, their melodies filling the air with joy. [HE_SHE] could bounce from cloud to cloud like stepping stones.",
        imagePrompt:
          "Walking on colorful rainbow clouds with rainbow birds flying overhead, stepping from cloud to cloud, peaceful smile",
        imageUrl: "/images/placeholders/book-template-placeholder.jpg",
      },
      {
        pageNumber: 7,
        content:
          "As [CHILD_NAME] traveled deeper into space, [HE_SHE] found a planet where crystal flowers grew in beautiful gardens. The flowers chimed like tiny bells when the space wind blew through them. [CHILD_NAME] picked one special flower that played [HIS_HER] favorite lullaby. 'This will help me remember this magical place,' [HE_SHE] said softly.",
        imagePrompt:
          "In crystal flower garden with flowers that look like bells, holding a special crystal flower, listening peacefully",
        imageUrl: "/images/placeholders/book-template-placeholder.jpg",
      },
      {
        pageNumber: 8,
        content:
          "Floating space rocks drifted gently past [CHILD_NAME]'s rocket ship like stepping stones in the sky. [HE_SHE] carefully hopped from rock to rock, each one glowing a different color when [HIS_HER] feet touched it. Some rocks were warm like summer days, others cool like spring mornings. It was like playing hopscotch among the stars!",
        imagePrompt:
          "Hopping between glowing floating space rocks, each rock lighting up different colors, arms out for balance, having fun",
        imageUrl: "/images/placeholders/book-template-placeholder.jpg",
      },
      {
        pageNumber: 9,
        content:
          "On a green planet covered in soft grass, [CHILD_NAME] met talking flowers that giggled when [HE_SHE] said hello. The flowers had friendly faces and told funny jokes that made [CHILD_NAME] laugh until [HIS_HER] sides hurt. They gave [HIM_HER] a magic seed. 'Plant this anywhere, and it will grow into something wonderful!' they said.",
        imagePrompt:
          "Sitting in field of smiling flowers with happy faces, laughing together, holding a glowing magic seed",
        imageUrl: "/images/placeholders/book-template-placeholder.jpg",
      },
      {
        pageNumber: 10,
        content:
          "The most amazing planet had waterfalls that flowed upward into the sky! [CHILD_NAME] watched in wonder as the sparkling water danced through the air like liquid stars. [HE_SHE] caught some of the magical water in [HIS_HER] hands - it felt warm and tingly. Swimming space fish with butterfly wings played in the floating water streams.",
        imagePrompt:
          "Watching upward flowing waterfalls with flying fish with butterfly wings, catching sparkling water in hands, amazed expression",
        imageUrl: "/images/placeholders/book-template-placeholder.jpg",
      },
      {
        pageNumber: 11,
        content:
          "As [CHILD_NAME] rode a gentle glowing comet like a cosmic slide, [HE_SHE] looked back at all the wonderful planets [HE_SHE] had visited. Each one twinkled like a colorful jewel in space. The bright comet carried [HIM_HER] safely through fields of glittering space dust that felt like warm hugs. 'What an incredible adventure!' [CHILD_NAME] whispered happily.",
        imagePrompt:
          "Riding on bright glowing comet through space, looking back at colorful planets, surrounded by glittering space dust, content smile",
        imageUrl: "/images/placeholders/book-template-placeholder.jpg",
      },

      {
        pageNumber: 12,
        content:
          "Soon it was time to return home. [CHILD_NAME] steered [HIS_HER] rocket ship back toward the familiar blue planet called Earth. As [HE_SHE] got closer, [HE_SHE] could see [HIS_HER] house and neighborhood getting bigger. [HIS_HER] treasure bag was full of magical souvenirs from each special planet [HE_SHE] had visited.",
        imagePrompt:
          "Inside rocket ship approaching Earth, looking through window at home below, holding treasure bag full of colorful space souvenirs, excited to return",
        imageUrl: "/images/placeholders/book-template-placeholder.jpg",
      },
      {
        pageNumber: 13,
        content:
          "The cardboard rocket ship landed gently in the garage, right where the adventure had started. [CHILD_NAME] climbed out, still wearing [HIS_HER] space helmet, and looked up at the evening stars. [HE_SHE] knew that somewhere up there, the space bunnies were still hopping and the crystal flowers were still chiming. The magic crystal flower in [HIS_HER] pocket played its lullaby one more time.",
        imagePrompt:
          "Standing by cardboard rocket in garage at evening, looking up at stars through open door, holding crystal flower, peaceful satisfied expression",
        imageUrl: "/images/placeholders/book-template-placeholder.jpg",
      },
    ],
  },
  {
    title: "Magical Garden Adventure",
    description:
      "Step into a wonderland where vegetables can talk and flowers grant wishes! Your child becomes a garden helper in the most magical place on Earth, where every plant has a personality and garden friends need help growing. This enchanting story teaches about nature, friendship, and helping others while sparking imagination about the magic that might be hiding in every garden. Perfect for little gardeners ages 3-7.",
    pageCount: 26, // 13 text/image pairs
    coverPrompt:
      "Standing at garden gate holding watering can, surrounded by colorful flowers and vegetables with happy faces, bright sunny day",
    coverImage: "/images/placeholders/book-template-placeholder.jpg",
    published: false,
    characterGender: "girl",
    minAge: 3,
    maxAge: 7,
    genres: ["Adventure", "Fantasy"],
    pages: [
      {
        pageNumber: 1,
        content:
          "[CHILD_NAME] was helping Grandma in the backyard when [HE_SHE] noticed something strange. Behind the big sunflowers was a tiny wooden gate [HE_SHE] had never seen before. The gate had flowers carved into it and seemed to shimmer in the sunlight. 'I wonder where this leads,' [CHILD_NAME] whispered, gently pushing the gate open.",
        imagePrompt:
          "Discovering small wooden gate behind sunflowers in garden, pushing gate open curiously, sunlight shining through",
        imageUrl: "/images/placeholders/book-template-placeholder.jpg",
      },
      {
        pageNumber: 2,
        content:
          "Behind the gate was the most amazing garden [CHILD_NAME] had ever seen! Flowers in every color imaginable swayed gently, and vegetables grew in perfectly neat rows. But something was different about this garden. As [CHILD_NAME] stepped inside, a friendly tomato with a big smile waved hello! 'Welcome to the Magical Garden!' said the tomato in a cheerful voice.",
        imagePrompt:
          "Entering magical garden with rows of colorful vegetables and flowers, smiling tomato waving hello, amazed expression",
        imageUrl: "/images/placeholders/book-template-placeholder.jpg",
      },
      {
        pageNumber: 3,
        content:
          "Soon [CHILD_NAME] met more garden friends. A giggling carrot popped [HIS_HER] orange head out of the soil to say hello. Three peas in a pod were singing a happy song together. Even the lettuce leaves were dancing in the breeze! 'We've been waiting for a helper like you,' said the carrot. 'Will you help us grow big and strong?'",
        imagePrompt:
          "Meeting smiling carrot popping from soil and three singing peas in pod, lettuce dancing nearby, kneeling down to greet them",
        imageUrl: "/images/placeholders/book-template-placeholder.jpg",
      },
      {
        pageNumber: 4,
        content:
          "The garden friends showed [CHILD_NAME] around their magical home. The corn stalks were tall like friendly giants, swaying back and forth. Pumpkins rolled around like orange balls, playing games with each other. But some of the vegetables looked a little thirsty. 'We haven't had water in two days,' sighed a small cucumber. 'Could you help us drink?'",
        imagePrompt:
          "Walking through garden with tall corn stalks swaying, rolling pumpkins playing, holding hands of small cucumber that looks thirsty",
        imageUrl: "/images/placeholders/book-template-placeholder.jpg",
      },
      {
        pageNumber: 5,
        content:
          "[CHILD_NAME] found a magical watering can that sparkled like diamonds. When [HE_SHE] filled it with water from the garden well, the water turned a beautiful light blue color. As [CHILD_NAME] sprinkled the magical water on each plant, they stretched and grew taller right before [HIS_HER] eyes! 'Thank you!' called all the vegetables together. 'You're the best garden helper ever!'",
        imagePrompt:
          "Using sparkly watering can with glowing blue water, vegetables growing taller as water touches them, all vegetables cheering happily",
        imageUrl: "/images/placeholders/book-template-placeholder.jpg",
      },
      {
        pageNumber: 6,
        content:
          "In the flower section of the garden, [CHILD_NAME] met talking roses, giggling daisies, and wise old sunflowers. The roses smelled like strawberry candy, and the daisies tickled [HIS_HER] nose when [HE_SHE] leaned down to smell them. 'Make a wish!' said the biggest sunflower. 'In this garden, flower wishes sometimes come true!'",
        imagePrompt:
          "Surrounded by colorful talking flowers, smelling roses and daisies, looking up at tall wise sunflower, making a wish",
        imageUrl: "/images/placeholders/book-template-placeholder.jpg",
      },
      {
        pageNumber: 7,
        content:
          "[CHILD_NAME] wished for all the garden friends to be happy and healthy. Suddenly, golden sparkles filled the air around the flowers! The roses bloomed bigger and more beautiful, the daisies spun around with joy, and the sunflower's face beamed like the real sun. 'Your wish is already coming true,' whispered the sunflower. 'Kind hearts make the best garden magic.'",
        imagePrompt:
          "Standing in shower of golden sparkles around blooming flowers, roses growing bigger, daisies spinning, sunflower beaming brightly",
        imageUrl: "/images/placeholders/book-template-placeholder.jpg",
      },
      {
        pageNumber: 8,
        content:
          "A family of garden mice wearing tiny overalls came running up to [CHILD_NAME]. 'Help us!' squeaked the mama mouse. 'We can't reach the high berries for our lunch!' [CHILD_NAME] carefully picked the sweet red berries from the tall berry bush and shared them with the mouse family. They thanked [HIM_HER] with tiny mouse hugs around [HIS_HER] finger.",
        imagePrompt:
          "Picking red berries from tall bush for family of mice in tiny overalls, mice giving finger hugs, berry bush full of fruit",
        imageUrl: "/images/placeholders/book-template-placeholder.jpg",
      },
      {
        pageNumber: 9,
        content:
          "As the day went on, [CHILD_NAME] learned that the magical garden had one small problem. The garden gate had been locked for so long that some areas hadn't been tended. Weeds had grown between the vegetables, and some plants looked lonely. 'Will you help us clean up?' asked a brave little radish. 'Together we can make our garden beautiful again!'",
        imagePrompt:
          "Gently pulling weeds from between vegetables with help from smiling radish, other vegetables watching and encouraging, working together",
        imageUrl: "/images/placeholders/book-template-placeholder.jpg",
      },
      {
        pageNumber: 10,
        content:
          "[CHILD_NAME] worked alongside all the garden friends. The vegetables cheered as [HE_SHE] pulled each weed. The flowers sang encouraging songs. Even the earthworms popped up to say thank you for making their soil home neat and tidy. When they finished, the garden looked more beautiful than ever before. Every plant sparkled in the sunshine.",
        imagePrompt:
          "Garden now clean and beautiful with all vegetables and flowers sparkling in sunshine, earthworms saying hello, everyone celebrating together",
        imageUrl: "/images/placeholders/book-template-placeholder.jpg",
      },
      {
        pageNumber: 11,
        content:
          "To celebrate, the garden friends threw a harvest party! The apple tree dropped [HIS_HER] sweetest apples, the berry bushes offered their juiciest berries, and the herb plants shared their most fragrant leaves for tea. [CHILD_NAME] sat in the middle of it all, surrounded by [HIS_HER] new friends. At only [CHILD_AGE] years old, [HE_SHE] had never felt so helpful and loved.",
        imagePrompt:
          "Sitting in circle with all garden friends at harvest party, surrounded by apples, berries and herbs, everyone smiling and celebrating",
        imageUrl: "/images/placeholders/book-template-placeholder.jpg",
      },
      {
        pageNumber: 12,
        content:
          "As the sun began to set, painting the sky in gentle colors, [CHILD_NAME] knew it was time to go home. The garden friends gathered around to say goodbye. The wise sunflower gave [HIM_HER] a special seed. 'Plant this in your own garden,' [HE_SHE] said kindly. 'It will remind you that magic grows wherever caring hearts plant kindness.'",
        imagePrompt:
          "Sunset in garden with all friends gathered around, receiving special glowing seed from wise sunflower, warm orange and pink sky",
        imageUrl: "/images/placeholders/book-template-placeholder.jpg",
      },
      {
        pageNumber: 13,
        content:
          "[CHILD_NAME] walked back through the magical gate, waving goodbye to all [HIS_HER] garden friends. When [HE_SHE] turned around, the gate looked just like a regular garden gate again. But in [HIS_HER] pocket, the special seed glowed softly, and [CHILD_NAME] could still hear the faint sound of vegetables giggling in the distance. [HE_SHE] smiled, knowing the magic would always be there for those who believe.",
        imagePrompt:
          "Walking away from garden gate waving goodbye, seed glowing in pocket, regular garden visible through gate, peaceful evening smile",
        imageUrl: "/images/placeholders/book-template-placeholder.jpg",
      },
    ],
  },
  {
    title: "Animal Rescue Hero",
    description:
      "Join a heartwarming adventure where your child becomes a brave animal rescue hero! From finding lost puppies to helping baby birds back to their nests, this touching story celebrates kindness, compassion, and helping those in need. With adorable baby animals and gentle rescue missions, this tale teaches empathy and the joy of helping others. Perfect for caring hearts ages 4-9.",
    pageCount: 26, // 13 text/image pairs
    coverPrompt:
      "Standing in forest clearing with rescued baby animals around feet, wearing rescue vest, holding small kitten, gentle caring smile",
    coverImage: "/images/placeholders/book-template-placeholder.jpg",
    published: false,
    characterGender: "boy",
    minAge: 4,
    maxAge: 9,
    genres: ["Adventure", "Educational"],
    pages: [
      {
        pageNumber: 1,
        content:
          "[CHILD_NAME] loved all animals, big and small. Every morning, [HE_SHE] would look out [HIS_HER] bedroom window to watch the birds and squirrels in the backyard. One sunny day, [CHILD_NAME] heard a tiny meowing sound coming from the bushes near the house. 'That sounds like someone needs help!' [HE_SHE] said, rushing outside to investigate.",
        imagePrompt:
          "Looking out bedroom window at birds and squirrels, then rushing outside toward bushes, concerned helpful expression",
        imageUrl: "/images/placeholders/book-template-placeholder.jpg",
      },
      {
        pageNumber: 2,
        content:
          "Behind the rose bushes, [CHILD_NAME] found a tiny orange kitten with big green eyes. The little kitten was mewing softly and looked scared and lonely. 'Don't worry, little one,' [CHILD_NAME] said gently, carefully picking up the kitten. 'I'll help you find your family.' The kitten purred and snuggled into [HIS_HER] warm hands.",
        imagePrompt:
          "Kneeling behind rose bushes holding tiny orange kitten with green eyes, kitten purring in gentle hands, caring expression",
        imageUrl: "/images/placeholders/book-template-placeholder.jpg",
      },
      {
        pageNumber: 3,
        content:
          "[CHILD_NAME] walked around the neighborhood, asking everyone [HE_SHE] met if they had lost a kitten. Mrs. Johnson from next door helped [HIM_HER] put up 'Found Kitten' signs on telephone poles. 'You're such a helpful [BOY_GIRL],' she said with a smile. Just before dinnertime, a worried girl ran up to them. 'That's my kitten, Ginger!' she cried happily.",
        imagePrompt:
          "Putting up found kitten signs on telephone pole with elderly neighbor, holding orange kitten, young girl running toward them excitedly",
        imageUrl: "/images/placeholders/book-template-placeholder.jpg",
      },
      {
        pageNumber: 4,
        content:
          "The next week, [CHILD_NAME] was playing in the park when [HE_SHE] noticed a small crowd gathered under a tall oak tree. A baby bird had fallen from its nest and couldn't fly back up to its mama. The mama bird was chirping worriedly from a branch above. 'I think I can help,' [CHILD_NAME] said confidently, looking up at the high nest.",
        imagePrompt:
          "In park looking up at tall oak tree with worried mama bird on branch, baby bird on ground, small crowd watching, determined expression",
        imageUrl: "/images/placeholders/book-template-placeholder.jpg",
      },
      {
        pageNumber: 5,
        content:
          "Carefully, [CHILD_NAME] climbed the oak tree, holding the baby bird gently in one hand. [HE_SHE] moved slowly and quietly so [HE_SHE] wouldn't scare the little bird. When [CHILD_NAME] reached the nest, [HE_SHE] softly placed the baby bird next to its brothers and sisters. The mama bird chirped a sweet 'thank you' song, and everyone in the park clapped for the brave rescuer.",
        imagePrompt:
          "Climbing oak tree carefully with baby bird in one hand, placing bird gently in nest with siblings, mama bird nearby, people clapping below",
        imageUrl: "/images/placeholders/book-template-placeholder.jpg",
      },
      {
        pageNumber: 6,
        content:
          "Word spread quickly about [CHILD_NAME]'s animal rescues. Soon, neighbors began calling whenever they found animals that needed help. One rainy afternoon, Mr. Pete called to say three puppies were hiding under [HIS_HER] porch, too scared to come out. 'Don't worry,' [CHILD_NAME] told him. 'I know just how to help scared puppies feel safe.'",
        imagePrompt:
          "Answering phone call from neighbor, looking out window at rain, getting ready to help with rescue mission, confident helpful expression",
        imageUrl: "/images/placeholders/book-template-placeholder.jpg",
      },
      {
        pageNumber: 7,
        content:
          "[CHILD_NAME] brought a bowl of warm milk and some soft blankets to Mr. Pete's house. [HE_SHE] sat very still under the porch and spoke in a gentle, quiet voice. 'It's okay, little puppies. I'm here to help you.' Slowly, three adorable golden puppies with muddy paws crept out to sniff the milk. Their tails began to wag when they realized [CHILD_NAME] was a friend.",
        imagePrompt:
          "Sitting under porch with bowl of milk and blankets, three golden puppies with muddy paws approaching cautiously, speaking gently",
        imageUrl: "/images/placeholders/book-template-placeholder.jpg",
      },
      {
        pageNumber: 8,
        content:
          "The puppies belonged to a family who lived across town. They had gotten loose during the thunderstorm and were too frightened to find their way home. [CHILD_NAME] helped load the puppies into Mr. Pete's car, and together they drove to return the puppies to their worried family. The children hugged their puppies tight and thanked [CHILD_NAME] for bringing them home safely.",
        imagePrompt:
          "Loading happy puppies into car with Mr. Pete, driving to reunion with worried family, children hugging returned puppies, grateful smiles",
        imageUrl: "/images/placeholders/book-template-placeholder.jpg",
      },
      {
        pageNumber: 9,
        content:
          "One morning, [CHILD_NAME] found a family of baby rabbits in [HIS_HER] backyard garden. Their mama was nowhere to be seen, and they looked hungry and cold. [CHILD_NAME] remembered reading that mama rabbits only visit their babies twice a day, so [HE_SHE] watched from inside the house. Sure enough, mama rabbit returned at sunset to feed [HER_HIS] babies.",
        imagePrompt:
          "Watching baby rabbits in garden from inside house window, mama rabbit returning at sunset, baby rabbits gathered together, patient observation",
        imageUrl: "/images/placeholders/book-template-placeholder.jpg",
      },
      {
        pageNumber: 10,
        content:
          "[CHILD_NAME] learned that sometimes the best way to help animals is to watch and wait. [HE_SHE] put a small fence around the rabbit nest to keep the babies safe from neighborhood cats, but left space for mama rabbit to come and go. Every evening, [CHILD_NAME] would peek out the window to make sure the rabbit family was doing well.",
        imagePrompt:
          "Building small protective fence around rabbit nest in garden, baby rabbits safe inside, watching from window as mama rabbit visits, caring supervision",
        imageUrl: "/images/placeholders/book-template-placeholder.jpg",
      },
      {
        pageNumber: 11,
        content:
          "The animal rescue adventures continued all summer long. [CHILD_NAME] helped a turtle cross a busy street, guided a lost duck family back to the pond, and even helped a squirrel whose tail was stuck in a fence. Each rescue taught [HIM_HER] something new about being patient, gentle, and brave. All the neighborhood animals seemed to know that [CHILD_NAME] was their friend.",
        imagePrompt:
          "Montage of helping turtle cross street, guiding duck family to pond, and freeing squirrel from fence, animals looking grateful and trusting",
        imageUrl: "/images/placeholders/book-template-placeholder.jpg",
      },
      {
        pageNumber: 12,
        content:
          "As autumn arrived, [CHILD_NAME] realized [HE_SHE] had become the unofficial animal rescue hero of the neighborhood. [HIS_HER] room was full of thank-you cards from grateful pet owners and photos of all the animals [HE_SHE] had helped. At only [CHILD_AGE] years old, [CHILD_NAME] had learned that even small acts of kindness can make a big difference in the world.",
        imagePrompt:
          "In bedroom surrounded by thank-you cards and animal photos on walls, looking at collection of rescue memories, proud satisfied smile",
        imageUrl: "/images/placeholders/book-template-placeholder.jpg",
      },
      {
        pageNumber: 13,
        content:
          "That evening, as [CHILD_NAME] watched the sunset from [HIS_HER] bedroom window, [HE_SHE] saw all [HIS_HER] animal friends playing happily in their homes. The orange kitten was napping on a sunny windowsill, the baby birds were strong enough to fly with their mama, and the rabbit family was hopping peacefully in the garden. [CHILD_NAME] smiled, knowing that tomorrow might bring a new animal friend who needed [HIS_HER] help.",
        imagePrompt:
          "Looking out bedroom window at sunset, seeing all rescued animals happy in their homes, kitten on windowsill, birds flying, rabbits hopping, peaceful satisfied expression",
        imageUrl: "/images/placeholders/book-template-placeholder.jpg",
      },
    ],
  },
  {
    title: "Magic Bakery",
    description:
      "Welcome to the most enchanting bakery in the world! Your child becomes a magical baker's apprentice where cupcakes can fly, cookies tell jokes, and mixing bowls stir themselves. This delicious adventure teaches about following recipes, helping others, and the magic that happens when you bake with love. With sweet treats and kitchen magic at every turn, this story will make young readers hungry for both baking and adventure. Perfect for little chefs ages 3-8.",
    pageCount: 26, // 13 text/image pairs
    coverPrompt:
      "Standing in magical bakery wearing apron and chef hat, surrounded by flying cupcakes and smiling cookies, mixing bowl stirring itself, excited expression",
    coverImage: "/images/placeholders/book-template-placeholder.jpg",
    published: false,
    characterGender: "girl",
    minAge: 3,
    maxAge: 8,
    genres: ["Adventure", "Fantasy"],
    pages: [
      {
        pageNumber: 1,
        content:
          "[CHILD_NAME] was walking to the library when [HE_SHE] smelled the most wonderful scent in the air. Following [HIS_HER] nose down a cobblestone street, [HE_SHE] discovered a tiny bakery with a sign that read 'Grandma Rose's Magic Bakery.' Through the window, [CHILD_NAME] could see cupcakes floating through the air like colorful butterflies. 'That can't be real,' [HE_SHE] whispered in amazement.",
        imagePrompt:
          "Walking down cobblestone street toward small bakery, looking through window at floating cupcakes, nose lifted to smell wonderful scents, amazed expression",
        imageUrl: "/images/placeholders/book-template-placeholder.jpg",
      },
      {
        pageNumber: 2,
        content:
          "The bakery door had a little bell that chimed a sweet melody when [CHILD_NAME] pushed it open. Inside, everything was magical! Mixing bowls stirred cookie dough by themselves, measuring cups danced on the counter, and a friendly rolling pin was flattening pie crust all on its own. A kind old woman with flour in her silver hair smiled warmly. 'Welcome to my magic bakery, dear. I'm Grandma Rose!'",
        imagePrompt:
          "Entering magical bakery with mixing bowls stirring themselves, dancing measuring cups, rolling pin working alone, meeting kind elderly baker with flour in hair",
        imageUrl: "/images/placeholders/book-template-placeholder.jpg",
      },
      {
        pageNumber: 3,
        content:
          "'Would you like to be my helper today?' asked Grandma Rose. [CHILD_NAME] nodded eagerly as Grandma Rose tied a special apron around [HIS_HER] waist. The apron sparkled with tiny stars that twinkled like real ones. 'This apron will help you understand the language of baking,' Grandma Rose explained. Suddenly, a chocolate chip cookie hopped over and said, 'Hello there, new friend!'",
        imagePrompt:
          "Wearing sparkly star-covered apron, smiling chocolate chip cookie hopping over to say hello, Grandma Rose tying apron strings, magical sparkles around",
        imageUrl: "/images/placeholders/book-template-placeholder.jpg",
      },
      {
        pageNumber: 4,
        content:
          "The cookie introduced [CHILD_NAME] to all the bakery treats. The cinnamon rolls were telling funny jokes that made everyone giggle. A family of muffins was singing a sweet song together. The donuts were playing ring toss with themselves! But the funniest of all were the gingerbread people, who were teaching each other how to dance. '[CHILD_NAME], you're going to love working here!' said a cheerful croissant.",
        imagePrompt:
          "Surrounded by laughing cinnamon rolls, singing muffins, donuts playing ring toss, and dancing gingerbread people, watching with delight and laughter",
        imageUrl: "/images/placeholders/book-template-placeholder.jpg",
      },
      {
        pageNumber: 5,
        content:
          "Grandma Rose showed [CHILD_NAME] how to make magic muffins. 'The secret ingredient,' she whispered, 'is kindness.' As [CHILD_NAME] stirred the batter with extra care and love, the mixture began to glow with a warm golden light. When [HE_SHE] poured the batter into muffin cups, little hearts appeared on top of each one. 'Perfect!' said Grandma Rose. 'You're a natural magic baker!'",
        imagePrompt:
          "Stirring glowing golden muffin batter in bowl, pouring into muffin cups with heart shapes appearing on top, Grandma Rose watching proudly",
        imageUrl: "/images/placeholders/book-template-placeholder.jpg",
      },
      {
        pageNumber: 6,
        content:
          "While the muffins baked in the oven, a worried-looking birthday cake rolled up to [CHILD_NAME]. 'I'm supposed to go to a party this afternoon, but I don't have any decorations!' the cake said sadly. [CHILD_NAME] looked around the bakery and had a wonderful idea. [HE_SHE] gathered rainbow sprinkles, candy flowers, and colorful icing tubes. 'Don't worry,' [CHILD_NAME] said. 'We'll make you beautiful!'",
        imagePrompt:
          "Comforting sad plain birthday cake, gathering rainbow sprinkles, candy flowers, and colorful icing tubes from bakery shelves, determined helpful expression",
        imageUrl: "/images/placeholders/book-template-placeholder.jpg",
      },
      {
        pageNumber: 7,
        content:
          "[CHILD_NAME] carefully decorated the birthday cake with swirls of pink and blue icing. [HE_SHE] added candy flowers around the edges and spelled out 'Happy Birthday' with colorful sprinkles. The cake spun around slowly so [CHILD_NAME] could reach every side. When [HE_SHE] finished, the cake looked so beautiful that all the other treats in the bakery cheered and clapped!",
        imagePrompt:
          "Decorating spinning birthday cake with colorful icing and candy flowers, other bakery treats watching and cheering in background, focused artistic expression",
        imageUrl: "/images/placeholders/book-template-placeholder.jpg",
      },
      {
        pageNumber: 8,
        content:
          "Just then, the oven timer sang a little song to let them know the magic muffins were ready. [CHILD_NAME] carefully took them out with Grandma Rose's help. The muffins had grown little golden wings and were trying to fly around the kitchen! 'Catch them gently,' laughed Grandma Rose. [CHILD_NAME] giggled as [HE_SHE] helped guide the flying muffins to the cooling rack.",
        imagePrompt:
          "Catching flying muffins with tiny golden wings, muffins floating around kitchen, laughing while gently guiding them to cooling rack, Grandma Rose helping",
        imageUrl: "/images/placeholders/book-template-placeholder.jpg",
      },
      {
        pageNumber: 9,
        content:
          "A family of bread loaves rolled over to [CHILD_NAME] looking very tired. 'We've been working hard all day,' said Papa Bread. 'Could you help us rest?' [CHILD_NAME] understood exactly what they needed. [HE_SHE] arranged soft kitchen towels like little beds and helped each bread loaf get comfortable. Soon they were all snoring softly, making tiny puffing sounds like sleeping puppies.",
        imagePrompt:
          "Arranging soft towels like beds for tired bread loaves, bread family sleeping peacefully with little puff sounds, caring for them like pets, gentle nurturing expression",
        imageUrl: "/images/placeholders/book-template-placeholder.jpg",
      },
      {
        pageNumber: 10,
        content:
          "As the afternoon went on, [CHILD_NAME] learned more bakery magic. [HE_SHE] helped cookies practice their jokes, taught cupcakes how to fly in formation, and even helped a shy pie find [HIS_HER] confidence. Every treat in the bakery seemed happier with [CHILD_NAME]'s help. 'You have a gift,' Grandma Rose told [HIM_HER]. 'You make everything around you better just by being kind.'",
        imagePrompt:
          "Teaching cupcakes to fly in formation, helping shy pie gain confidence, cookies practicing jokes nearby, all treats looking happier, warm encouraging scene",
        imageUrl: "/images/placeholders/book-template-placeholder.jpg",
      },
      {
        pageNumber: 11,
        content:
          "When closing time came, all the bakery treats gathered around to thank [CHILD_NAME]. The gingerbread people performed a special dance, the muffins sang a thank-you song, and the birthday cake gave [HIM_HER] a big frosting hug. Even at [CHILD_AGE] years old, [CHILD_NAME] felt proud of all the help [HE_SHE] had given. The magic bakery felt like a second home.",
        imagePrompt:
          "Surrounded by all bakery treats saying goodbye, gingerbread people dancing, muffins singing, getting frosting hug from birthday cake, warm farewell scene",
        imageUrl: "/images/placeholders/book-template-placeholder.jpg",
      },
      {
        pageNumber: 12,
        content:
          "Before [CHILD_NAME] left, Grandma Rose gave [HIM_HER] a special gift: a small bag of magic flour that sparkled like stardust. 'Whenever you bake with this flour,' she said with a wink, 'remember that the real magic comes from the love you put into everything you make.' [CHILD_NAME] hugged the special flour close to [HIS_HER] heart.",
        imagePrompt:
          "Receiving bag of sparkling magic flour from Grandma Rose, flour glittering like stardust, holding it close to heart, grateful warm expression",
        imageUrl: "/images/placeholders/book-template-placeholder.jpg",
      },
      {
        pageNumber: 13,
        content:
          "[CHILD_NAME] walked home as the sun was setting, the magic flour safely tucked in [HIS_HER] pocket. [HE_SHE] could hardly wait to try baking at home and see what magical things might happen. As [HE_SHE] looked back at the little bakery, [CHILD_NAME] could see the treats in the window waving goodbye. [HE_SHE] waved back, already planning [HIS_HER] next visit to Grandma Rose's Magic Bakery.",
        imagePrompt:
          "Walking home at sunset with magic flour in pocket, looking back at bakery with treats waving from window, waving goodbye, excited anticipation for return visit",
        imageUrl: "/images/placeholders/book-template-placeholder.jpg",
      },
    ],
  },
  {
    title: "Princess of the Enchanted Kingdom",
    description:
      "Enter a magical realm where your child becomes a brave and kind princess! With a sparkling crown and a heart full of courage, this royal adventure takes young readers through enchanted forests, magical castles, and friendly kingdoms. Along the way, our princess helps magical creatures, solves gentle problems, and learns that true royalty comes from kindness and helping others. Perfect for little dreamers who love crowns, castles, and magical adventures, ages 3-8.",
    pageCount: 26, // 13 text/image pairs
    coverPrompt:
      "Standing in front of pink castle wearing beautiful princess dress and sparkling crown, holding magic wand, surrounded by butterflies and flowers, confident royal smile",
    coverImage: "/images/placeholders/book-template-placeholder.jpg",
    published: false,
    characterGender: "girl",
    minAge: 3,
    maxAge: 8,
    genres: ["Adventure", "Fantasy"],
    pages: [
      {
        pageNumber: 1,
        content:
          "[CHILD_NAME] was playing dress-up in [HIS_HER] room when [HE_SHE] found a beautiful tiara hidden in an old jewelry box. The moment [HE_SHE] put it on, the tiara began to sparkle with magical light! Suddenly, [CHILD_NAME]'s clothes transformed into a gorgeous princess gown, and [HE_SHE] felt very special indeed. 'I think this tiara is magic!' [HE_SHE] whispered in wonder.",
        imagePrompt:
          "In bedroom putting on sparkling tiara that glows with light, clothes transforming into princess gown, looking in mirror with wonder",
        imageUrl: "/images/placeholders/book-template-placeholder.jpg",
      },
      {
        pageNumber: 2,
        content:
          "As Princess [CHILD_NAME] looked out [HIS_HER] bedroom window, [HE_SHE] gasped in amazement. Instead of [HIS_HER] regular backyard, there was now a beautiful enchanted kingdom with a pink castle in the distance! Colorful butterflies danced in the air, and flowers seemed to wave hello in the gentle breeze. 'My very own kingdom!' Princess [CHILD_NAME] said excitedly, stepping through the window into this magical world.",
        imagePrompt:
          "Looking out window at enchanted kingdom with pink castle, colorful butterflies flying, flowers waving, stepping through window in princess dress",
        imageUrl: "/images/placeholders/book-template-placeholder.jpg",
      },
      {
        pageNumber: 3,
        content:
          "Princess [CHILD_NAME] walked along a path made of smooth, colorful stones toward [HIS_HER] castle. Along the way, [HE_SHE] met a friendly unicorn with a silver mane and kind eyes. 'Welcome to your kingdom, Princess,' said the unicorn in a gentle voice. 'I'm Luna, and I'll be your royal companion. Would you like me to show you around your new home?'",
        imagePrompt:
          "Walking on colorful stone path toward pink castle, meeting white unicorn with silver mane, unicorn bowing respectfully, princess smiling warmly",
        imageUrl: "/images/placeholders/book-template-placeholder.jpg",
      },
      {
        pageNumber: 4,
        content:
          "Luna the unicorn carried Princess [CHILD_NAME] gently on [HIS_HER] back as they explored the kingdom together. They rode through fields of singing flowers and past a crystal-clear lake where rainbow fish swam in circles. 'Every creature in this kingdom is friendly,' Luna explained. 'But sometimes they need help with small problems. A good princess always helps [HIS_HER] subjects.'",
        imagePrompt:
          "Riding on unicorn's back through field of colorful singing flowers, crystal lake with rainbow fish visible, peaceful exploration scene",
        imageUrl: "/images/placeholders/book-template-placeholder.jpg",
      },
      {
        pageNumber: 5,
        content:
          "Their first stop was a grove where three baby rabbits were crying softly. 'What's wrong, little ones?' asked Princess [CHILD_NAME], kneeling down to their level. The mama rabbit explained that they had lost their favorite ball while playing. It had rolled into a bush with thorns, and they were too small to get it back. 'Don't worry,' said Princess [CHILD_NAME]. 'I know just how to help!'",
        imagePrompt:
          "Kneeling beside three crying baby rabbits with mama rabbit, thorny bush with ball visible inside, caring concerned expression",
        imageUrl: "/images/placeholders/book-template-placeholder.jpg",
      },
      {
        pageNumber: 6,
        content:
          "Princess [CHILD_NAME] used [HIS_HER] magic wand to gently move the thorny branches aside without hurting the bush. The colorful ball rolled right out into [HIS_HER] hands! The baby rabbits jumped with joy and hugged Princess [CHILD_NAME]'s legs. 'Thank you, Princess!' they squeaked happily. 'You're the kindest princess ever!' Their mama rabbit smiled proudly at how well [CHILD_NAME] had helped.",
        imagePrompt:
          "Using magic wand to move thorny branches, ball rolling out safely, baby rabbits jumping with joy and hugging princess legs, mama rabbit smiling",
        imageUrl: "/images/placeholders/book-template-placeholder.jpg",
      },
      {
        pageNumber: 7,
        content:
          "Next, Princess [CHILD_NAME] and Luna visited the Royal Garden, where talking roses were having a problem. The garden fountain had stopped working, and all the flowers were feeling thirsty. 'We need water to stay beautiful and healthy,' sighed a red rose. Princess [CHILD_NAME] looked at the fountain carefully and noticed that fallen leaves had blocked the water spout.",
        imagePrompt:
          "In royal garden with talking roses looking wilted, examining broken fountain with fallen leaves blocking spout, thinking carefully about solution",
        imageUrl: "/images/placeholders/book-template-placeholder.jpg",
      },
      {
        pageNumber: 8,
        content:
          "With gentle hands, Princess [CHILD_NAME] cleared away all the leaves from the fountain. Immediately, sparkling water began to flow again, creating a beautiful spray that caught the sunlight like diamonds. The roses cheered and began to bloom brighter and more colorful than ever before. 'You saved our garden!' they sang together. Princess [CHILD_NAME] felt proud of helping [HIS_HER] flower friends.",
        imagePrompt:
          "Clearing leaves from fountain, water spraying up like diamonds in sunlight, roses blooming brighter and cheering, satisfied helpful smile",
        imageUrl: "/images/placeholders/book-template-placeholder.jpg",
      },
      {
        pageNumber: 9,
        content:
          "As Princess [CHILD_NAME] continued [HIS_HER] royal duties, [HE_SHE] came across a family of singing birds who looked worried. 'Princess,' chirped the mama bird, 'our nest fell from the tree during last night's wind. We need a safe place to build a new home for our babies.' Princess [CHILD_NAME] looked around and spotted the perfect solution - a beautiful birdhouse near the castle that was empty and waiting.",
        imagePrompt:
          "Talking with worried bird family about their fallen nest, pointing toward empty decorative birdhouse near castle, birds looking hopeful",
        imageUrl: "/images/placeholders/book-template-placeholder.jpg",
      },
      {
        pageNumber: 10,
        content:
          "Princess [CHILD_NAME] helped the bird family move into their new birdhouse home. [HE_SHE] even added soft flower petals and tiny twigs to make it extra cozy. The baby birds chirped happily in their new home while the parent birds sang a beautiful thank-you song that echoed throughout the kingdom. 'This is even better than our old nest!' the papa bird tweeted joyfully.",
        imagePrompt:
          "Helping bird family arrange flower petals and twigs in new birdhouse, baby birds chirping happily inside, parent birds singing gratefully",
        imageUrl: "/images/placeholders/book-template-placeholder.jpg",
      },
      {
        pageNumber: 11,
        content:
          "That evening, all the creatures of the kingdom gathered at the castle for a special celebration in Princess [CHILD_NAME]'s honor. The rabbits brought flower crowns, the roses shared their sweet perfume, and the birds sang the most beautiful songs. Even at just [CHILD_AGE] years old, Princess [CHILD_NAME] had learned that being a true princess meant helping others and being kind to everyone [HE_SHE] met.",
        imagePrompt:
          "At castle celebration with all animal friends, wearing flower crown from rabbits, surrounded by singing birds and fragrant roses, joyful party scene",
        imageUrl: "/images/placeholders/book-template-placeholder.jpg",
      },
      {
        pageNumber: 12,
        content:
          "As the magical day came to an end, Luna the unicorn walked Princess [CHILD_NAME] back to [HIS_HER] bedroom window. 'You were a wonderful princess today,' Luna said gently. 'Remember, the magic tiara will always be here when you want to visit your kingdom again.' Princess [CHILD_NAME] hugged Luna goodbye and carefully took off the sparkling tiara, placing it back in the jewelry box.",
        imagePrompt:
          "Hugging Luna goodbye at bedroom window, carefully removing sparkling tiara, placing it gently back in jewelry box, peaceful goodnight scene",
        imageUrl: "/images/placeholders/book-template-placeholder.jpg",
      },
      {
        pageNumber: 13,
        content:
          "Back in [HIS_HER] regular clothes, [CHILD_NAME] looked out the window one more time. The enchanted kingdom had faded away, but [HE_SHE] could still see Luna waving from behind a cloud. [CHILD_NAME] smiled, knowing that tomorrow [HE_SHE] could put on the magic tiara again and return to help [HIS_HER] kingdom friends. Being a princess wasn't just about wearing a crown - it was about having a kind heart.",
        imagePrompt:
          "Looking out window in regular clothes, seeing Luna waving from behind clouds, magic kingdom fading away, peaceful smile knowing adventure awaits tomorrow",
        imageUrl: "/images/placeholders/book-template-placeholder.jpg",
      },
    ],
  },
  {
    title: "Sports Champion",
    description:
      "Get ready to play! Your child becomes a sports superstar trying different fun activities and games. From kicking soccer balls to swimming like a fish, this active adventure shows that the best part of sports is having fun, trying your best, and playing with friends. With encouragement to stay active and keep practicing, this energetic story celebrates the joy of movement and play. Perfect for little athletes ages 4-9.",
    pageCount: 26, // 13 text/image pairs
    coverPrompt:
      "Standing on grass field holding soccer ball, wearing sports uniform and sneakers, big smile with sports equipment around, sunny day",
    coverImage: "/images/placeholders/book-template-placeholder.jpg",
    published: false,
    characterGender: "boy",
    minAge: 4,
    maxAge: 9,
    genres: ["Adventure", "Educational"],
    pages: [
      {
        pageNumber: 1,
        content:
          "[CHILD_NAME] loved to run, jump, and play! Every morning, [HE_SHE] would look out the window at the sunny playground and feel excited about the day ahead. 'Today I want to try something new,' [CHILD_NAME] announced at breakfast. [HE_SHE] put on [HIS_HER] favorite sneakers and headed outside, ready for a day full of sports and fun.",
        imagePrompt:
          "Looking out window at playground, putting on sneakers by front door, excited energetic expression, sunny day visible outside",
        imageUrl: "/images/placeholders/book-template-placeholder.jpg",
      },
      {
        pageNumber: 2,
        content:
          "At the local park, [CHILD_NAME] saw kids playing soccer and decided to join in. [HE_SHE] had never played soccer before, but [HE_SHE] was excited to learn. The coach showed [HIM_HER] how to dribble the ball with [HIS_HER] feet. At first, the ball rolled away, but [CHILD_NAME] kept trying. 'Practice makes better!' [HE_SHE] said cheerfully, chasing after the ball.",
        imagePrompt:
          "Learning to dribble soccer ball on grass field, ball rolling away, chasing after it with determination, coach watching encouragingly",
        imageUrl: "/images/placeholders/book-template-placeholder.jpg",
      },
      {
        pageNumber: 3,
        content:
          "After practicing for a while, [CHILD_NAME] was getting much better at controlling the soccer ball. [HE_SHE] kicked it toward the goal and watched as it rolled right between the goal posts! 'Goal!' cheered the other kids. [CHILD_NAME] jumped up and down with excitement. Even though [HE_SHE] was only [CHILD_AGE] years old, [HE_SHE] felt like a real soccer player.",
        imagePrompt:
          "Kicking soccer ball toward goal posts, ball going in, jumping up with arms raised in celebration, other kids cheering in background",
        imageUrl: "/images/placeholders/book-template-placeholder.jpg",
      },
      {
        pageNumber: 4,
        content:
          "The next day, [CHILD_NAME] decided to try swimming at the community pool. [HE_SHE] put on [HIS_HER] swimsuit and water wings for safety. The swimming instructor taught [HIM_HER] how to kick [HIS_HER] legs and move [HIS_HER] arms. 'Pretend you're a friendly fish swimming through the water,' said the instructor. [CHILD_NAME] giggled and started paddling around the shallow end.",
        imagePrompt:
          "In swimming pool wearing swimsuit and water wings, practicing swimming strokes in shallow end, instructor nearby, happy splashing",
        imageUrl: "/images/placeholders/book-template-placeholder.jpg",
      },
      {
        pageNumber: 5,
        content:
          "Swimming was harder than [CHILD_NAME] expected, but [HE_SHE] didn't give up. [HE_SHE] practiced floating on [HIS_HER] back, looking up at the fluffy white clouds in the blue sky. The water felt cool and refreshing on the warm day. 'I'm getting stronger!' [CHILD_NAME] said proudly as [HE_SHE] swam a little farther each time.",
        imagePrompt:
          "Floating on back in pool looking up at clouds, relaxed peaceful expression, water sparkling in sunlight around",
        imageUrl: "/images/placeholders/book-template-placeholder.jpg",
      },
      {
        pageNumber: 6,
        content:
          "At the tennis court, [CHILD_NAME] tried a new sport with a smaller, softer ball and a lighter racket. The tennis coach showed [HIM_HER] how to hold the racket and swing it gently. [CHILD_NAME] practiced hitting the ball against a practice wall. Bounce, hit, bounce, hit! Soon [HE_SHE] was getting into a good rhythm and having lots of fun.",
        imagePrompt:
          "Holding tennis racket hitting ball against practice wall, focused concentration expression, tennis court setting with net visible",
        imageUrl: "/images/placeholders/book-template-placeholder.jpg",
      },
      {
        pageNumber: 7,
        content:
          "Basketball was the next sport [CHILD_NAME] wanted to try. The basketball hoop seemed very high, but there was a shorter hoop just right for kids. [HE_SHE] practiced dribbling the orange ball and taking [HIS_HER] first shots. Most of the balls bounced off the rim, but when one finally went in, [CHILD_NAME] felt amazing! 'Swish!' [HE_SHE] shouted happily.",
        imagePrompt:
          "Dribbling orange basketball toward kid-sized hoop, taking shot with ball going through net, excited celebration expression",
        imageUrl: "/images/placeholders/book-template-placeholder.jpg",
      },
      {
        pageNumber: 8,
        content:
          "On a beautiful Saturday morning, [CHILD_NAME] joined a fun run at the park. [HE_SHE] wasn't trying to be the fastest - [HE_SHE] just wanted to enjoy running with other kids. [CHILD_NAME] jogged at [HIS_HER] own pace, breathing in the fresh air and feeling [HIS_HER] heart beating strong and healthy. Running made [HIM_HER] feel free and happy.",
        imagePrompt:
          "Jogging on park path with other kids in background, breathing fresh air, smiling while running at comfortable pace, trees and grass around",
        imageUrl: "/images/placeholders/book-template-placeholder.jpg",
      },
      {
        pageNumber: 9,
        content:
          "At the playground, [CHILD_NAME] discovered that even playing on swings and monkey bars was like doing sports! [HE_SHE] swung across the monkey bars, building strength in [HIS_HER] arms. [HE_SHE] balanced on the balance beam, practicing [HIS_HER] coordination. Every piece of playground equipment helped [HIM_HER] become stronger and more coordinated.",
        imagePrompt:
          "Swinging across monkey bars with determined expression, then balancing on balance beam with arms out for stability, playground equipment around",
        imageUrl: "/images/placeholders/book-template-placeholder.jpg",
      },
      {
        pageNumber: 10,
        content:
          "[CHILD_NAME] tried team games too, like relay races and group activities. [HE_SHE] learned that sports were even more fun when shared with friends. Sometimes [HIS_HER] team won, and sometimes they didn't, but [CHILD_NAME] discovered that trying [HIS_HER] best and encouraging teammates was what mattered most. 'Good job, everyone!' [HE_SHE] would cheer.",
        imagePrompt:
          "Running in relay race passing baton to teammate, everyone cheering and encouraging each other, teamwork and fun expressions",
        imageUrl: "/images/placeholders/book-template-placeholder.jpg",
      },
      {
        pageNumber: 11,
        content:
          "As the weeks went by, [CHILD_NAME] noticed [HE_SHE] was getting stronger, faster, and more skilled at all the sports [HE_SHE] tried. But the best part wasn't winning or being perfect - it was the joy [HE_SHE] felt when playing and moving [HIS_HER] body. [CHILD_NAME] realized that every kid could be a sports champion just by trying their best and having fun.",
        imagePrompt:
          "Montage of different sports activities showing improvement, flexing arm muscles proudly, surrounded by various sports equipment, confident happy expression",
        imageUrl: "/images/placeholders/book-template-placeholder.jpg",
      },
      {
        pageNumber: 12,
        content:
          "At the end-of-season sports celebration, [CHILD_NAME] received a special medal for good sportsmanship and effort. [HE_SHE] felt proud wearing it, not because [HE_SHE] was the fastest or strongest, but because [HE_SHE] had tried [HIS_HER] best in every sport and helped other kids feel included. 'You're a true champion,' said [HIS_HER] coach with a smile.",
        imagePrompt:
          "Wearing medal at sports celebration, posing proudly with coach, other kids celebrating in background, certificate or trophy visible",
        imageUrl: "/images/placeholders/book-template-placeholder.jpg",
      },
      {
        pageNumber: 13,
        content:
          "That night, [CHILD_NAME] put [HIS_HER] medal on the dresser next to [HIS_HER] bed and looked at all the sports equipment [HE_SHE] had collected - soccer ball, tennis racket, basketball, and swimming goggles. [HE_SHE] smiled, already planning tomorrow's active adventure. [CHILD_NAME] had learned that being a sports champion meant loving to play, trying your best, and never giving up.",
        imagePrompt:
          "In bedroom looking at medal on dresser surrounded by sports equipment, planning next day's activities, satisfied accomplished expression",
        imageUrl: "/images/placeholders/book-template-placeholder.jpg",
      },
    ],
  },
  {
    title: "Forest Explorer",
    description:
      "Join an exciting nature adventure through the magical forest! Your child becomes a brave explorer discovering the wonders of the woodland, from colorful birds and playful squirrels to hidden streams and towering trees. This outdoor adventure teaches about nature, wildlife, and the importance of taking care of our environment. With gentle forest friends and beautiful natural discoveries, this story inspires a love for the great outdoors. Perfect for young nature lovers ages 4-8.",
    pageCount: 26, // 13 text/image pairs
    coverPrompt:
      "Standing at forest entrance wearing explorer hat and backpack, holding magnifying glass, tall trees and woodland path ahead, excited adventurous expression",
    coverImage: "/images/placeholders/book-template-placeholder.jpg",
    published: false,
    characterGender: "girl",
    minAge: 4,
    maxAge: 8,
    genres: ["Adventure", "Educational"],
    pages: [
      {
        pageNumber: 1,
        content:
          "[CHILD_NAME] loved spending time outdoors and was always curious about the forest behind [HIS_HER] house. One sunny morning, [HE_SHE] put on [HIS_HER] hiking boots, packed a small backpack with water and snacks, and grabbed [HIS_HER] magnifying glass. 'Today I'm going to explore the forest like a real nature detective!' [CHILD_NAME] announced excitedly.",
        imagePrompt:
          "Putting on hiking boots and packing backpack with water bottle, holding magnifying glass, looking toward forest, excited preparation",
        imageUrl: "/images/placeholders/book-template-placeholder.jpg",
      },
      {
        pageNumber: 2,
        content:
          "The forest entrance was marked by two tall oak trees that seemed to wave hello with their leafy branches. [CHILD_NAME] stepped onto the winding dirt path and immediately heard the cheerful sounds of birds singing and leaves rustling in the gentle breeze. 'The forest is like a natural concert!' [HE_SHE] thought, listening carefully to all the different sounds.",
        imagePrompt:
          "Walking between two tall oak trees onto forest path, looking up at branches, listening to bird sounds, peaceful wonder expression",
        imageUrl: "/images/placeholders/book-template-placeholder.jpg",
      },
      {
        pageNumber: 3,
        content:
          "As [CHILD_NAME] walked deeper into the forest, [HE_SHE] spotted a family of squirrels playing chase among the tree branches. The baby squirrels were learning to jump from branch to branch while their mama watched carefully. [CHILD_NAME] sat very still on a fallen log and watched quietly. 'I don't want to scare them,' [HE_SHE] whispered to [HIM_HER]self.",
        imagePrompt:
          "Sitting quietly on fallen log watching squirrel family playing in tree branches above, finger to lips in quiet gesture, squirrels jumping playfully",
        imageUrl: "/images/placeholders/book-template-placeholder.jpg",
      },
      {
        pageNumber: 4,
        content:
          "Further along the path, [CHILD_NAME] discovered a small, clear stream bubbling over smooth rocks. [HE_SHE] knelt down and saw tiny fish swimming in the crystal-clear water. With [HIS_HER] magnifying glass, [CHILD_NAME] could see water insects walking on the surface like magic. 'There's a whole tiny world in this stream!' [HE_SHE] marveled.",
        imagePrompt:
          "Kneeling by clear stream using magnifying glass to examine water, tiny fish visible swimming, water insects on surface, rocks and flowing water",
        imageUrl: "/images/placeholders/book-template-placeholder.jpg",
      },
      {
        pageNumber: 5,
        content:
          "[CHILD_NAME] noticed different types of leaves scattered on the forest floor. [HE_SHE] collected the most beautiful ones - some were bright red, others golden yellow, and a few were still green with interesting shapes. 'Each tree has its own special leaf pattern,' [CHILD_NAME] observed, carefully placing them in [HIS_HER] collection bag. [HE_SHE] felt like a leaf scientist!",
        imagePrompt:
          "Collecting colorful autumn leaves from forest floor, holding up red and yellow leaves to examine them, collection bag nearby, scientist expression",
        imageUrl: "/images/placeholders/book-template-placeholder.jpg",
      },
      {
        pageNumber: 6,
        content:
          "A gentle rustling sound caught [CHILD_NAME]'s attention. A family of rabbits was nibbling on clover in a sunny meadow clearing. The baby rabbits had the fluffiest tails [CHILD_NAME] had ever seen! [HE_SHE] stayed perfectly still and counted five rabbits altogether. When one of the baby rabbits looked directly at [HIM_HER], [CHILD_NAME] felt very special to be welcomed into their forest home.",
        imagePrompt:
          "Standing at edge of sunny meadow watching rabbit family eating clover, baby rabbits with fluffy tails, one rabbit looking up, peaceful quiet moment",
        imageUrl: "/images/placeholders/book-template-placeholder.jpg",
      },
      {
        pageNumber: 7,
        content:
          "High up in an old pine tree, [CHILD_NAME] spotted a bird's nest with a mama robin feeding her babies. The baby birds opened their beaks wide and chirped loudly for food. [CHILD_NAME] watched through [HIS_HER] magnifying glass as the mama bird carefully gave each baby a turn. 'Being a mama bird is hard work!' [CHILD_NAME] thought admiringly.",
        imagePrompt:
          "Looking up at bird nest in pine tree through magnifying glass, mama robin feeding baby birds with open beaks, tree branches framing scene",
        imageUrl: "/images/placeholders/book-template-placeholder.jpg",
      },
      {
        pageNumber: 8,
        content:
          "As [CHILD_NAME] continued exploring, [HE_SHE] found a fallen tree that had become a bridge across a small gully. [HE_SHE] carefully walked across it, feeling like a tightrope walker in the circus. On the other side, [CHILD_NAME] discovered beautiful wildflowers growing in a sunny patch and interesting rock formations. 'The forest is full of natural sculptures!' [HE_SHE] said, admiring the colorful flower garden and smooth river stones.",
        imagePrompt:
          "Carefully walking across fallen tree log bridge over small gully, arms out for balance, discovering colorful wildflowers and interesting rocks on other side",
        imageUrl: "/images/placeholders/book-template-placeholder.jpg",
      },
      {
        pageNumber: 9,
        content:
          "In a quiet grove, [CHILD_NAME] found the biggest tree [HE_SHE] had ever seen. Its trunk was so wide that [HE_SHE] couldn't reach around it even with [HIS_HER] arms stretched out. [CHILD_NAME] looked up, up, up at the tall branches reaching toward the sky. 'This tree must be hundreds of years old,' [HE_SHE] thought, placing [HIS_HER] hand gently on the rough bark.",
        imagePrompt:
          "Standing next to enormous tree trunk with arms stretched trying to reach around it, looking up at tall branches, hand touching bark respectfully",
        imageUrl: "/images/placeholders/book-template-placeholder.jpg",
      },
      {
        pageNumber: 10,
        content:
          "[CHILD_NAME] discovered that the forest was home to many different insects too. [HE_SHE] watched colorful butterflies dancing from flower to flower and busy ants carrying tiny pieces of food back to their homes. A ladybug landed right on [HIS_HER] finger! 'Even the smallest creatures have important jobs in the forest,' [CHILD_NAME] realized, watching the ladybug with wonder.",
        imagePrompt:
          "Watching ladybug on finger with magnifying glass, butterflies flying around wildflowers, ants carrying food, close-up nature observation",
        imageUrl: "/images/placeholders/book-template-placeholder.jpg",
      },
      {
        pageNumber: 11,
        content:
          "As the afternoon sun filtered through the tree leaves, [CHILD_NAME] found the perfect spot for a snack break. [HE_SHE] sat on a soft patch of moss and shared [HIS_HER] crackers with some friendly chipmunks who chattered nearby. At [CHILD_AGE] years old, [CHILD_NAME] felt very grown up being a responsible forest visitor, leaving no trash behind.",
        imagePrompt:
          "Sitting on moss eating snacks, sharing crackers with chattering chipmunks nearby, sunlight filtering through leaves, responsible picnic scene",
        imageUrl: "/images/placeholders/book-template-placeholder.jpg",
      },
      {
        pageNumber: 12,
        content:
          "Before heading home, [CHILD_NAME] made a promise to the forest. 'I will always take care of you and keep you clean and safe,' [HE_SHE] said aloud. [HE_SHE] picked up a piece of litter someone else had left behind and put it in [HIS_HER] backpack to throw away later. The forest seemed to whisper 'thank you' in the rustling of the leaves.",
        imagePrompt:
          "Picking up litter and putting it in backpack, making promise gesture to forest, leaves rustling in trees, caring responsible expression",
        imageUrl: "/images/placeholders/book-template-placeholder.jpg",
      },
      {
        pageNumber: 13,
        content:
          "Walking back home on the forest path, [CHILD_NAME] felt happy and peaceful. [HIS_HER] backpack was full of beautiful leaves, and [HIS_HER] mind was full of wonderful memories. [HE_SHE] had learned so much about forest life and made many new animal friends. 'I can't wait to come back tomorrow and explore more!' [CHILD_NAME] thought, already planning [HIS_HER] next forest adventure.",
        imagePrompt:
          "Walking home on forest path at golden hour, backpack full of leaf collection, looking back at forest with happy memories, planning return visit",
        imageUrl: "/images/placeholders/book-template-placeholder.jpg",
      },
    ],
  },
  {
    title: "Time Traveler",
    description:
      "Join an amazing journey through time! Your child discovers a magical time machine and visits exciting periods from the past and future. From medieval castles to pirate ships, from friendly dinosaurs to space colonies, this adventure shows that every time period has its own special magic. With simple historical fun and imaginative future worlds, this story sparks curiosity about different eras while keeping everything safe and child-friendly. Perfect for young adventurers ages 5-9.",
    pageCount: 26, // 13 text/image pairs
    coverPrompt:
      "Standing next to colorful time machine with spinning gears and glowing lights, wearing explorer outfit, excited expression with clock symbols floating around",
    coverImage: "/images/placeholders/book-template-placeholder.jpg",
    published: false,
    characterGender: "boy",
    minAge: 5,
    maxAge: 9,
    genres: ["Adventure", "Science Fiction"],
    pages: [
      {
        pageNumber: 1,
        content:
          "[CHILD_NAME] was exploring the dusty attic when [HE_SHE] found something incredible hidden under an old sheet. It was a strange machine covered in colorful buttons, spinning gears, and glowing lights that looked like a giant clock! A sign on it read 'Time Travel Machine - Handle with Care.' [CHILD_NAME]'s eyes grew wide with excitement. 'Could this really travel through time?' [HE_SHE] wondered.",
        imagePrompt:
          "In dusty attic discovering time machine under old sheet, machine with colorful buttons and spinning gears, looking amazed and curious",
        imageUrl: "/images/placeholders/book-template-placeholder.jpg",
      },
      {
        pageNumber: 2,
        content:
          "After reading the simple instruction card, [CHILD_NAME] carefully pressed a button labeled 'Medieval Times.' The machine began to hum and spin, filling the room with swirling colors! When the spinning stopped, [CHILD_NAME] found [HIM_HER]self standing in front of a magnificent castle with tall towers and colorful flags. [HE_SHE] was wearing a tunic and soft boots just like people from long ago!",
        imagePrompt:
          "Standing in front of medieval castle with tall towers and colorful flags, wearing tunic and boots, time machine visible nearby, amazed expression",
        imageUrl: "/images/placeholders/book-template-placeholder.jpg",
      },
      {
        pageNumber: 3,
        content:
          "In the castle courtyard, [CHILD_NAME] met a friendly knight who was practicing with a wooden sword. 'Welcome, young traveler!' said the knight with a smile. 'Would you like to learn about castle life?' [CHILD_NAME] watched as the knight showed [HIM_HER] how knights trained, how they took care of their horses, and how they helped protect the castle. Everything was peaceful and friendly in this medieval world.",
        imagePrompt:
          "In castle courtyard with friendly knight holding wooden practice sword, watching knight demonstrate training, peaceful medieval setting with horses nearby",
        imageUrl: "/images/placeholders/book-template-placeholder.jpg",
      },
      {
        pageNumber: 4,
        content:
          "Next, [CHILD_NAME] pressed the 'Pirate Ship' button on the time machine. Suddenly, [HE_SHE] was standing on the deck of a colorful pirate ship sailing on bright blue waters! But these were friendly pirates who sailed around helping people and sharing treasures they found. The pirate captain, who had a parrot on [HIS_HER] shoulder, taught [CHILD_NAME] how to tie sailor knots and read a treasure map.",
        imagePrompt:
          "On pirate ship deck with friendly pirate captain and colorful parrot, learning to tie sailor knots, bright blue ocean and treasure map visible",
        imageUrl: "/images/placeholders/book-template-placeholder.jpg",
      },
      {
        pageNumber: 5,
        content:
          "The pirate ship sailed to a tropical island where [CHILD_NAME] helped dig up a treasure chest filled with shiny coins and pretty jewels. But the best treasure was the friendship [HE_SHE] made with the crew! They shared tropical fruit and told funny stories under the palm trees. 'Being a pirate is about adventure and helping friends,' the captain explained as they watched dolphins play in the waves.",
        imagePrompt:
          "On tropical island digging up treasure chest with pirate crew, palm trees and dolphins in background, sharing tropical fruits, happy friendship scene",
        imageUrl: "/images/placeholders/book-template-placeholder.jpg",
      },
      {
        pageNumber: 6,
        content:
          "When [CHILD_NAME] pressed the 'Dinosaur Time' button, [HE_SHE] traveled to a world full of gentle, plant-eating dinosaurs! [HE_SHE] met a friendly long-neck dinosaur who was as tall as a tree and loved to eat leaves. The dinosaur let [CHILD_NAME] pet [HIS_HER] neck, which felt like warm, bumpy leather. 'Dinosaurs are much friendlier than I thought!' [CHILD_NAME] said with delight.",
        imagePrompt:
          "Petting friendly long-neck dinosaur in prehistoric landscape with palm trees, dinosaur bending down gently, other plant-eating dinosaurs in background",
        imageUrl: "/images/placeholders/book-template-placeholder.jpg",
      },
      {
        pageNumber: 7,
        content:
          "In dinosaur land, [CHILD_NAME] also met baby dinosaurs who were playful and curious, just like puppies! [HE_SHE] played gentle games with them, throwing soft fruits for them to catch and watching them splash in a warm lagoon. The mama dinosaurs watched protectively but seemed to trust [CHILD_NAME]. At [CHILD_AGE] years old, [HE_SHE] felt very special to be friends with real dinosaurs!",
        imagePrompt:
          "Playing with baby dinosaurs by warm lagoon, throwing soft fruits, baby dinosaurs splashing in water, mama dinosaurs watching peacefully nearby",
        imageUrl: "/images/placeholders/book-template-placeholder.jpg",
      },
      {
        pageNumber: 8,
        content:
          "The time machine's 'Wild West' button took [CHILD_NAME] to a frontier town with wooden buildings and dusty streets. [HE_SHE] met a kind sheriff who showed [HIM_HER] around the peaceful town. [CHILD_NAME] learned how to ride a gentle horse, helped tend to chickens, and watched a friendly cowboy demonstrate lasso tricks. Everyone in the Wild West town was welcoming and helpful.",
        imagePrompt:
          "In Wild West town with wooden buildings, riding gentle horse with kind sheriff, watching cowboy demonstrate lasso tricks, peaceful frontier setting",
        imageUrl: "/images/placeholders/book-template-placeholder.jpg",
      },
      {
        pageNumber: 9,
        content:
          "Next, [CHILD_NAME] decided to visit the future by pressing the 'Space Colony' button. [HE_SHE] found [HIM_HER]self in a beautiful space station with big windows showing Earth and stars outside! The people wore shiny silver clothes and traveled around in floating chairs. A friendly robot named Beep showed [CHILD_NAME] how everything worked in the future, from growing food in space gardens to talking to computers.",
        imagePrompt:
          "In space station with large windows showing Earth and stars, meeting friendly robot named Beep, people in silver clothes floating by, space garden visible",
        imageUrl: "/images/placeholders/book-template-placeholder.jpg",
      },
      {
        pageNumber: 10,
        content:
          "In the future space colony, [CHILD_NAME] helped tend to a zero-gravity garden where vegetables floated while they grew! [HE_SHE] wore special magnetic boots to walk on the walls and ceiling. The space food tasted like [HIS_HER] favorite flavors but came in fun floating bubbles. 'The future is amazing!' [CHILD_NAME] said, catching floating juice bubbles in [HIS_HER] mouth.",
        imagePrompt:
          "In zero-gravity garden with floating vegetables, wearing magnetic boots walking on ceiling, catching floating juice bubbles, space plants around",
        imageUrl: "/images/placeholders/book-template-placeholder.jpg",
      },
      {
        pageNumber: 11,
        content:
          "The 'Ancient Egypt' button transported [CHILD_NAME] to a land of golden sand and amazing pyramids. [HE_SHE] met friendly people who showed [HIM_HER] how they built the pyramids using ramps and teamwork. [CHILD_NAME] helped decorate pottery with beautiful patterns and learned to write [HIS_HER] name using picture symbols called hieroglyphs. The warm sun felt wonderful on [HIS_HER] face.",
        imagePrompt:
          "Near golden pyramids decorating pottery with Egyptian patterns, learning hieroglyphs on stone tablet, friendly people in colorful Egyptian clothes helping",
        imageUrl: "/images/placeholders/book-template-placeholder.jpg",
      },
      {
        pageNumber: 12,
        content:
          "After visiting so many wonderful time periods, [CHILD_NAME] realized [HE_SHE] had learned something important from each era. The medieval times taught [HIM_HER] about courage and helping others. The pirates showed [HIM_HER] the value of friendship and adventure. The dinosaurs taught [HIM_HER] that different doesn't mean scary. Each time period had its own special magic and lessons to share.",
        imagePrompt:
          "Standing by time machine thinking about all adventures, seeing glimpses of different time periods in thought bubbles around head, wise thoughtful expression",
        imageUrl: "/images/placeholders/book-template-placeholder.jpg",
      },
      {
        pageNumber: 13,
        content:
          "Finally, [CHILD_NAME] pressed the 'Home' button on the time machine. [HE_SHE] found [HIM_HER]self back in the attic, wearing [HIS_HER] regular clothes again. But in [HIS_HER] pocket was a small souvenir from each time period [HE_SHE] had visited! [CHILD_NAME] smiled, knowing that anytime [HE_SHE] wanted another adventure, the magical time machine would be waiting. History was full of friends and wonders to discover!",
        imagePrompt:
          "Back in attic next to time machine, looking at collection of small souvenirs from different time periods in hands, satisfied adventurous smile",
        imageUrl: "/images/placeholders/book-template-placeholder.jpg",
      },
    ],
  },
  {
    title: "Music Maker",
    description:
      "Strike up the band! Your child discovers the magical world of music and becomes a talented musician. From playing piano keys to shaking tambourines, from singing songs to conducting orchestras, this musical adventure shows that everyone can make beautiful music. With different instruments to try and melodies to create, this story celebrates the joy of music-making and shows that practice makes progress. Perfect for little musicians ages 3-8.",
    pageCount: 26, // 13 text/image pairs
    coverPrompt:
      "Standing in music room surrounded by various instruments including piano, drums, guitar, and tambourine, holding microphone and singing, musical notes floating around",
    coverImage: "/images/placeholders/book-template-placeholder.jpg",
    published: false,
    characterGender: "girl",
    minAge: 3,
    maxAge: 8,
    genres: ["Adventure", "Educational"],
    pages: [
      {
        pageNumber: 1,
        content:
          "[CHILD_NAME] loved all the sounds around [HIM_HER] - birds singing, rain pattering, and even the rhythmic tick-tock of the clock. One day, [HE_SHE] discovered a special room in [HIS_HER] house filled with musical instruments [HE_SHE] had never seen before. A shiny piano, colorful drums, a guitar with strings, and many other instruments were waiting. 'I wonder what beautiful sounds they make,' [CHILD_NAME] thought excitedly.",
        imagePrompt:
          "Discovering music room filled with piano, drums, guitar and various instruments, looking around with wonder and excitement, instruments gleaming in sunlight",
        imageUrl: "/images/placeholders/book-template-placeholder.jpg",
      },
      {
        pageNumber: 2,
        content:
          "[CHILD_NAME] approached the piano first and gently pressed one of the white keys. A clear, beautiful note rang out! [HE_SHE] tried pressing different keys and discovered that some made high sounds and others made low sounds. Soon, [CHILD_NAME] was playing simple melodies by pressing the keys one at a time. 'Each key has its own special voice!' [HE_SHE] said with delight.",
        imagePrompt:
          "Sitting at piano bench pressing white and black keys, listening carefully to different notes, musical notes floating above piano, concentrated happy expression",
        imageUrl: "/images/placeholders/book-template-placeholder.jpg",
      },
      {
        pageNumber: 3,
        content:
          "Next, [CHILD_NAME] picked up a pair of drumsticks and tried the colorful drum set. [HE_SHE] tapped gently on the big drum - BOOM! Then [HE_SHE] tried the smaller drums - tap, tap, tap! Each drum made a different sound. [CHILD_NAME] started creating rhythms, keeping time like a heartbeat. 'Music has a beat just like when I run!' [HE_SHE] realized, drumming along to [HIS_HER] own pulse.",
        imagePrompt:
          "Playing colorful drum set with drumsticks, different sized drums around, keeping rhythm with big smile, drumsticks in both hands mid-beat",
        imageUrl: "/images/placeholders/book-template-placeholder.jpg",
      },
      {
        pageNumber: 4,
        content:
          "The guitar looked tricky, but [CHILD_NAME] was brave enough to try. [HE_SHE] held it carefully and plucked the strings one by one. Each string sang a different note! A kind music teacher appeared and showed [CHILD_NAME] how to hold the guitar properly and press the strings to make even more beautiful sounds. 'Every instrument needs gentle care and practice,' the teacher explained kindly.",
        imagePrompt:
          "Holding guitar properly with music teacher helping show finger positions, plucking strings carefully, teacher pointing to guitar neck, learning together",
        imageUrl: "/images/placeholders/book-template-placeholder.jpg",
      },
      {
        pageNumber: 5,
        content:
          "[CHILD_NAME] discovered that [HE_SHE] had a musical instrument [HE_SHE] carried everywhere - [HIS_HER] own voice! The music teacher taught [HIM_HER] simple songs and showed [HIM_HER] how to sing high notes and low notes. [CHILD_NAME] practiced singing scales: 'Do, Re, Mi, Fa, So, La, Ti, Do!' [HIS_HER] voice got stronger and clearer with each try.",
        imagePrompt:
          "Standing with music teacher practicing singing, mouth open in song, hand gestures showing high and low notes, musical staff with notes visible on wall",
        imageUrl: "/images/placeholders/book-template-placeholder.jpg",
      },
      {
        pageNumber: 6,
        content:
          "The tambourine was [CHILD_NAME]'s next favorite instrument. [HE_SHE] shook it gently and it made a cheerful jingling sound. [HE_SHE] could tap it, shake it, or even toss it gently in the air and catch it while it jingled. [CHILD_NAME] danced around the room with the tambourine, making music with [HIS_HER] whole body. Dancing and music went perfectly together!",
        imagePrompt:
          "Dancing around room holding tambourine up in air, shaking it with joyful expression, musical notes and movement lines showing dance and rhythm",
        imageUrl: "/images/placeholders/book-template-placeholder.jpg",
      },
      {
        pageNumber: 7,
        content:
          "[CHILD_NAME] tried the violin next, placing it carefully under [HIS_HER] chin like the music teacher showed [HIM_HER]. Drawing the bow across the strings created sweet, singing sounds. It took practice to make it sound just right, but [CHILD_NAME] didn't give up. 'Even when it doesn't sound perfect, I'm learning!' [HE_SHE] said with determination, trying again and again.",
        imagePrompt:
          "Holding violin under chin with bow, concentrating hard on making music, music teacher encouraging nearby, violin strings visible and bow in motion",
        imageUrl: "/images/placeholders/book-template-placeholder.jpg",
      },
      {
        pageNumber: 8,
        content:
          "The music room had fun percussion instruments too! [CHILD_NAME] tried wooden blocks that clicked together, triangles that rang like tiny bells, and maracas that shook with a sandy sound. [HE_SHE] learned that [HE_SHE] could make an entire percussion orchestra all by [HIM_HER]self! Each instrument added a different texture to [HIS_HER] musical creations.",
        imagePrompt:
          "Surrounded by various percussion instruments including wooden blocks, triangle, and maracas, playing multiple instruments at once, rhythm and joy in movement",
        imageUrl: "/images/placeholders/book-template-placeholder.jpg",
      },
      {
        pageNumber: 9,
        content:
          "The music teacher introduced [CHILD_NAME] to the recorder, a simple wind instrument perfect for beginners. [HE_SHE] learned to cover the holes with [HIS_HER] fingers and blow gently to make clear notes. [CHILD_NAME] practiced simple songs like 'Hot Cross Buns' and 'Mary Had a Little Lamb.' At [CHILD_AGE] years old, [HE_SHE] felt proud of every note [HE_SHE] played correctly.",
        imagePrompt:
          "Playing recorder with fingers covering holes, blowing gently into instrument, music sheet with simple songs nearby, focused concentration",
        imageUrl: "/images/placeholders/book-template-placeholder.jpg",
      },
      {
        pageNumber: 10,
        content:
          "[CHILD_NAME] learned that music wasn't just about playing instruments - it was also about conducting! The music teacher gave [HIM_HER] a conductor's baton and taught [HIM_HER] how to wave it to keep time. [CHILD_NAME] pretended to conduct an invisible orchestra, moving [HIS_HER] arms gracefully to lead imaginary musicians through a beautiful symphony.",
        imagePrompt:
          "Holding conductor's baton conducting imaginary orchestra, arms raised gracefully, pretending to lead musicians, confident leadership expression",
        imageUrl: "/images/placeholders/book-template-placeholder.jpg",
      },
      {
        pageNumber: 11,
        content:
          "For [HIS_HER] first recital, [CHILD_NAME] decided to create a special song using all the instruments [HE_SHE] had learned. [HE_SHE] started with a gentle piano melody, added drumbeats for rhythm, hummed along with [HIS_HER] voice, and finished with a joyful tambourine shake. The music teacher clapped enthusiastically. 'You've become a real musician!' [HE_SHE] said proudly.",
        imagePrompt:
          "Performing at small recital using multiple instruments in sequence, music teacher and small audience clapping, confident performer expression",
        imageUrl: "/images/placeholders/book-template-placeholder.jpg",
      },
      {
        pageNumber: 12,
        content:
          "[CHILD_NAME] realized that music was everywhere - in the chirping of birds, the rhythm of footsteps, and even in the melody of laughter. [HE_SHE] had learned that making music wasn't about being perfect; it was about expressing feelings and having fun. Every practice session made [HIM_HER] a little bit better, and every song [HE_SHE] played brought joy to [HIS_HER] heart.",
        imagePrompt:
          "Sitting in music room surrounded by all instruments, listening to sounds of nature through window, peaceful understanding expression, musical notes floating around",
        imageUrl: "/images/placeholders/book-template-placeholder.jpg",
      },
      {
        pageNumber: 13,
        content:
          "That evening, [CHILD_NAME] played a gentle lullaby on the piano for [HIS_HER] family. As the beautiful notes filled the room, everyone smiled and felt peaceful. [CHILD_NAME] knew that [HE_SHE] would continue making music every day, because music made the world a more beautiful place. 'I can't wait to learn even more songs tomorrow!' [HE_SHE] said happily, already planning [HIS_HER] next musical adventure.",
        imagePrompt:
          "Playing gentle lullaby on piano for family in evening, family listening peacefully, warm home setting, satisfied musician expression",
        imageUrl: "/images/placeholders/book-template-placeholder.jpg",
      },
    ],
  },
  {
    title: "Dream Adventure",
    description:
      "Journey into the magical world of dreams! Your child discovers that dreams can take you anywhere and let you be anything you want to be. From flying through cotton candy clouds to swimming with friendly dream creatures, this enchanting bedtime story shows that imagination has no limits. With gentle adventures and peaceful dream sequences, this story helps children see sleep and dreams as exciting adventures rather than something to fear. Perfect for sweet dreams ages 3-7.",
    pageCount: 26, // 13 text/image pairs
    coverPrompt:
      "Floating peacefully on fluffy cloud wearing pajamas, surrounded by gentle glowing stars and dream bubbles, serene sleeping expression",
    coverImage: "/images/placeholders/book-template-placeholder.jpg",
    published: false,
    characterGender: "boy",
    minAge: 3,
    maxAge: 7,
    genres: ["Adventure", "Fantasy"],
    pages: [
      {
        pageNumber: 1,
        content:
          "Every night when [CHILD_NAME] went to bed, [HE_SHE] wondered what dreams would come. [HIS_HER] cozy bedroom felt safe and warm under the soft blankets. As [HE_SHE] closed [HIS_HER] eyes and listened to the gentle night sounds, [CHILD_NAME] began to drift off to sleep. 'I hope I have a wonderful adventure tonight,' [HE_SHE] whispered softly to [HIS_HER] teddy bear.",
        imagePrompt:
          "Lying in cozy bed with soft blankets and teddy bear, eyes closing peacefully, moonlight streaming through window, comfortable bedroom setting",
        imageUrl: "/images/placeholders/book-template-placeholder.jpg",
      },
      {
        pageNumber: 2,
        content:
          "Suddenly, [CHILD_NAME] found [HIM_HER]self floating gently above [HIS_HER] bed! [HE_SHE] wasn't scared at all - it felt like being carried by invisible, friendly hands. [HIS_HER] bedroom had transformed into a magical place where everything glowed softly with dream light. 'I'm dreaming!' [CHILD_NAME] realized with excitement. 'And in dreams, anything is possible!'",
        imagePrompt:
          "Floating gently above bed in magical bedroom with soft glowing light, everything sparkling with dream magic, peaceful floating expression",
        imageUrl: "/images/placeholders/book-template-placeholder.jpg",
      },
      {
        pageNumber: 3,
        content:
          "Dream [CHILD_NAME] discovered [HE_SHE] could fly! [HE_SHE] soared out through the window and into a sky filled with cotton candy clouds in pink and blue. The clouds were soft and sweet, and [HE_SHE] could actually bounce on them like trampolines! Flying felt as natural as walking, and [CHILD_NAME] giggled with joy as [HE_SHE] swooped and glided through the dreamy sky.",
        imagePrompt:
          "Flying through sky with arms spread wide, bouncing on pink and blue cotton candy clouds, joyful expression with wind in hair",
        imageUrl: "/images/placeholders/book-template-placeholder.jpg",
      },
      {
        pageNumber: 4,
        content:
          "In the dream sky, [CHILD_NAME] met a friendly cloud sheep with fluffy white wool and a gentle smile. 'Welcome to the Dream Realm!' said the cloud sheep in a voice like soft wind chimes. 'I'm Cumulus, and I'll show you around our magical world. In dreams, you can visit any place your imagination creates!' The cloud sheep offered [CHILD_NAME] a ride on [HIS_HER] fluffy back.",
        imagePrompt:
          "Meeting fluffy white cloud sheep with gentle smile, riding on sheep's soft woolly back through dream sky, magical sparkles around",
        imageUrl: "/images/placeholders/book-template-placeholder.jpg",
      },
      {
        pageNumber: 5,
        content:
          "Cumulus carried [CHILD_NAME] to a magical forest where the trees grew rainbow leaves and sang gentle lullabies. Friendly dream animals lived here - purple rabbits that glowed softly, silver squirrels that could talk, and golden butterflies as big as [HIS_HER] hand. Everything in the dream forest was peaceful and beautiful. 'This is where happy dreams grow,' Cumulus explained softly.",
        imagePrompt:
          "In magical forest with rainbow-leaved trees, meeting glowing purple rabbits and talking silver squirrels, large golden butterflies fluttering around peacefully",
        imageUrl: "/images/placeholders/book-template-placeholder.jpg",
      },
      {
        pageNumber: 6,
        content:
          "Next, [CHILD_NAME] found [HIM_HER]self in an underwater dream world where [HE_SHE] could breathe perfectly beneath the waves. The water was warm and crystal clear, filled with friendly dream fish that sparkled like living jewels. [HE_SHE] swam alongside gentle dream dolphins who sang beautiful melodies that bubbled up to the surface like liquid music.",
        imagePrompt:
          "Swimming underwater with sparkling jewel-like fish and gentle singing dolphins, breathing easily underwater, warm crystal-clear water around",
        imageUrl: "/images/placeholders/book-template-placeholder.jpg",
      },
      {
        pageNumber: 7,
        content:
          "In the deepest part of the dream ocean, [CHILD_NAME] discovered a palace made entirely of smooth, colorful pearls. A kind dream mermaid with flowing hair invited [HIM_HER] inside to see the wonders within. The palace rooms were filled with treasure chests that held not gold or jewels, but beautiful dreams that other children had shared. 'Every good dream makes our world more beautiful,' the mermaid explained.",
        imagePrompt:
          "Inside pearl palace with kind dream mermaid showing treasure chests filled with glowing dreams, colorful pearl walls and flowing mermaid hair",
        imageUrl: "/images/placeholders/book-template-placeholder.jpg",
      },
      {
        pageNumber: 8,
        content:
          "Dream [CHILD_NAME] then found [HIM_HER]self in a land made entirely of soft, bouncy marshmallows! [HE_SHE] could jump incredibly high and land softly every time. Giant gummy bears lived here, and they were the friendliest creatures [CHILD_NAME] had ever met. They offered [HIM_HER] sweet dream candy that tasted like [HIS_HER] favorite flavors all mixed together.",
        imagePrompt:
          "Bouncing high on marshmallow landscape with giant friendly gummy bears, eating colorful dream candy, everything soft and bouncy",
        imageUrl: "/images/placeholders/book-template-placeholder.jpg",
      },
      {
        pageNumber: 9,
        content:
          "The dream adventure continued as [CHILD_NAME] visited a magical library where books could fly and stories came to life! [HE_SHE] watched fairy tale characters step out of their pages to wave hello. Dragons read bedtime stories to baby unicorns, and wise owls helped organize the floating books. At [CHILD_AGE] years old, [CHILD_NAME] felt amazed by how dreams could make impossible things seem perfectly normal.",
        imagePrompt:
          "In magical library with flying books and fairy tale characters coming to life, dragons reading to unicorns, wise owls organizing floating books",
        imageUrl: "/images/placeholders/book-template-placeholder.jpg",
      },
      {
        pageNumber: 10,
        content:
          "In the dream world's art studio, [CHILD_NAME] discovered [HE_SHE] could paint with liquid starlight and sculpt with solidified giggles! Everything [HE_SHE] created came to life and danced around the room. [HIS_HER] paintings of flowers began to smell sweet, and [HIS_HER] clay animals started playing with each other. 'In dreams, creativity has no limits!' laughed a dream artist who appeared to help.",
        imagePrompt:
          "Painting with glowing liquid starlight in dream art studio, created flowers and clay animals coming to life and dancing around room",
        imageUrl: "/images/placeholders/book-template-placeholder.jpg",
      },
      {
        pageNumber: 11,
        content:
          "As the dream adventure neared its end, all the dream friends [CHILD_NAME] had met gathered together for a farewell party. Cumulus the cloud sheep, the singing dolphins, the pearl palace mermaid, and all the magical creatures celebrated [HIS_HER] visit with floating balloons made of soap bubbles and music that tasted like cotton candy. 'You can return anytime you dream,' they all said together.",
        imagePrompt:
          "At farewell party with all dream friends including cloud sheep, dolphins, mermaid and magical creatures, soap bubble balloons floating around, joyful celebration",
        imageUrl: "/images/placeholders/book-template-placeholder.jpg",
      },
      {
        pageNumber: 12,
        content:
          "Slowly, the dream world began to fade as morning approached. [CHILD_NAME] felt [HIM_HER]self gently floating back toward [HIS_HER] cozy bedroom. [HE_SHE] wasn't sad because [HE_SHE] knew the dream friends would always be there waiting for [HIM_HER]. 'Dreams are like a special door to magical places,' [HE_SHE] thought peacefully as [HE_SHE] drifted back to [HIS_HER] warm bed.",
        imagePrompt:
          "Floating gently back toward cozy bedroom as dream world fades softly around, peaceful transition from dream to waking, serene expression",
        imageUrl: "/images/placeholders/book-template-placeholder.jpg",
      },
      {
        pageNumber: 13,
        content:
          "[CHILD_NAME] woke up in [HIS_HER] own bed as the morning sun streamed through the window. [HE_SHE] could still remember every wonderful moment of [HIS_HER] dream adventure. [HIS_HER] teddy bear seemed to be smiling, as if [HE_SHE] had shared the adventure too. From that day forward, [CHILD_NAME] always looked forward to bedtime, knowing that incredible dream adventures were waiting for [HIM_HER] every single night.",
        imagePrompt:
          "Waking up peacefully in bed with morning sunlight, holding smiling teddy bear, remembering dream adventure with happy expression, cozy bedroom",
        imageUrl: "/images/placeholders/book-template-placeholder.jpg",
      },
    ],
  },
];
