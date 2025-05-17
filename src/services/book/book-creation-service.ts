// import {
//   BookCreateData,
//   PageCreateData,
//   BookTemplateFull,
//   PageType,
// } from "@/types/book";
// import { BookStatus } from "@/generated/prisma";
// import { CharacterData } from "@/schemas/character-schema";
// import { IMAGE_STYLE } from "@/constants/prompts";
// import { logger } from "@/lib/logger";
// import { IMAGE_STYLE_PROMPT } from "@/constants/image";
// import { BOOK_DEFAULT_PAGES } from "@/constants/bookConstants";

// /**
//  * Creates a book from a template with personalized content
//  *
//  * @param template The book template to use
//  * @param characterData The character customization data
//  * @param userId The user ID (can be empty string for anonymous users)
//  * @param characterImageReference Optional Leonardo image ID for character reference
//  * @returns Complete book data ready for database insertion
//  */
// export function createBookFromTemplate(
//   template: BookTemplateFull,
//   characterData: CharacterData,
//   userId: string,
//   characterImageReference?: string
// ): BookCreateData {
//   logger.debug(
//     {
//       templateId: template.id,
//       characterName: characterData.name,
//       hasCharacterImage: !!characterImageReference,
//     },
//     "Creating book from template"
//   );

//   // Create personalized pages with explicit types (text/image)
//   const pages: PageCreateData[] = [];
//   const dedicationPage: PageCreateData = {
//     pageNumber: 1,
//     type: PageType.DEDICATION,
//     textContent: null,
//     imagePrompt: null,
//   };
//   // empty page
//   const emptyPage: PageCreateData = {
//     pageNumber: 2,
//     type: PageType.GENERAL,
//     textContent: null,
//     imagePrompt: null,
//   };
//   pages.push(dedicationPage, emptyPage);

//   // Process template pages and create text/image page pairs
//   template.pages.forEach((templatePage, index) => {
//     // Create a text page
//     const textPage: PageCreateData = {
//       pageNumber: index * 2 + 3, // start from page 2, odd numbers for text pages
//       type: PageType.TEXT,
//       textContent: personalizeText(templatePage.content, characterData),
//       imagePrompt: null, // Text pages don't have image prompts
//     };

//     // Create a matching image page
//     const imagePage: PageCreateData = {
//       pageNumber: index * 2 + 4, // start from 3, odd numbers for image pages
//       type: PageType.IMAGE,
//       textContent: null, // Image pages don't have text content
//       imagePrompt: enhanceImagePrompt(templatePage.imagePrompt, characterData),
//     };

//     // Add both pages to the book
//     pages.push(textPage, imagePage);
//   });

//   // Create the book data
//   const bookData: BookCreateData = {
//     title: template.title, // Could be personalized if desired
//     status: BookStatus.CUSTOMIZING,
//     pageCount: template.pageCount + BOOK_DEFAULT_PAGES, // Double the page count (text + image pages) , add default pages
//     coverPrompt: enhanceImagePrompt(template.coverPrompt, characterData),
//     pages: pages,
//     templateId: template.id,
//     userId: userId,
//     characterImageReference: characterImageReference || null,
//   };
//   console.log(
//     "Created book with pages-",
//     template.pageCount * 2 + BOOK_DEFAULT_PAGES
//   );
//   return bookData;
// }

// /**
//  * Replaces placeholders in text with character data values
//  *
//  * @param text The template text containing placeholders
//  * @param characterData The character customization data
//  * @returns Personalized text with placeholders replaced
//  */
// function personalizeText(text: string, characterData: CharacterData): string {
//   // Define a mapping of placeholders to actual values
//   const placeholders: Record<string, string> = {
//     "[CHILD_NAME]":
//       characterData.name.charAt(0).toUpperCase() + characterData.name.slice(1),
//     "[CHILD_AGE]": characterData.age?.toString() || "young",
//     "[CHILD_GENDER]": characterData.gender || "",
//     "[HE_SHE]": characterData.gender === "boy" ? "he" : "she",
//     "[HIS_HER]": characterData.gender === "boy" ? "his" : "her",
//     "[HIM_HER]": characterData.gender === "boy" ? "him" : "her",
//   };

//   // Starting with the original text
//   let personalized = text;

//   // Replace each placeholder with its corresponding value
//   // Use string replace instead of regex to avoid potential issues
//   Object.entries(placeholders).forEach(([placeholder, value]) => {
//     // Use split and join to avoid regex issues
//     personalized = personalized.split(placeholder).join(value);
//   });

//   return personalized;
// }

// /**
//  * Enhances image prompts with character details
//  *
//  * @param basePrompt The base image prompt from the template
//  * @param characterData The character customization data
//  * @returns Enhanced image prompt with character details
//  */
// function enhanceImagePrompt(
//   basePrompt: string,
//   characterData: CharacterData
// ): string {
//   // Build character description first
//   const traits: string[] = [];

//   traits.push(`a young ${characterData.age} years old ${characterData.gender}`);

//   if (characterData.hairColor) {
//     traits.push(`${characterData.hairColor} hair`);
//   }

//   if (characterData.hairStyle) {
//     traits.push(`${characterData.hairStyle} hairstyle`);
//   }

//   if (characterData.eyeColor) {
//     traits.push(`${characterData.eyeColor} eyes`);
//   }

//   if (characterData.skinTone) {
//     traits.push(`${characterData.skinTone} skin color`);
//   }

//   if (characterData.wearingGlasses) {
//     traits.push("wearing glasses");
//   }

//   // Combine traits with base prompt
//   // Place character description at the beginning of the prompt
//   const enhancedPrompt = `${IMAGE_STYLE} of ${traits.join(
//     ", "
//   )}. ${basePrompt}, ${IMAGE_STYLE_PROMPT}`;

//   return enhancedPrompt;
// }
import {
  BookCreateData,
  PageCreateData,
  BookTemplateFull,
  PageType,
} from "@/types/book";
import { BookStatus } from "@/generated/prisma";
import { CharacterData } from "@/schemas/character-schema";
import { IMAGE_STYLE, IMAGE_STYLE_PROMPT } from "@/constants/prompts";
import { logger } from "@/lib/logger";
import { BOOK_DEFAULT_PAGES } from "@/constants/bookConstants";

/**
 * Creates a book from a template with personalized content
 *
 * @param template The book template to use
 * @param characterData The character customization data
 * @param userId The user ID (can be empty string for anonymous users)
 * @param characterImageReference Optional Leonardo image ID for character reference
 * @returns Complete book data ready for database insertion
 */
export function createBookFromTemplate(
  template: BookTemplateFull,
  characterData: CharacterData,
  userId: string,
  characterImageReference?: string
): BookCreateData {
  logger.debug(
    {
      templateId: template.id,
      characterName: characterData.name,
      hasCharacterImage: !!characterImageReference,
    },
    "Creating book from template"
  );

  // Create personalized pages with explicit types (text/image)
  const pages: PageCreateData[] = [];
  const dedicationPage: PageCreateData = {
    pageNumber: 1,
    type: PageType.DEDICATION,
    textContent: null,
    imagePrompt: null,
  };
  // empty page
  const emptyPage: PageCreateData = {
    pageNumber: 2,
    type: PageType.GENERAL,
    textContent: null,
    imagePrompt: null,
  };
  pages.push(dedicationPage, emptyPage);

  // Process template pages and create text/image page pairs
  template.pages.forEach((templatePage, index) => {
    // Create a text page
    const textPage: PageCreateData = {
      pageNumber: index * 2 + 3, // start from page 2, odd numbers for text pages
      type: PageType.TEXT,
      textContent: personalizeText(templatePage.content, characterData),
      imagePrompt: null, // Text pages don't have image prompts
    };

    // Create a matching image page
    const imagePage: PageCreateData = {
      pageNumber: index * 2 + 4, // start from 3, odd numbers for image pages
      type: PageType.IMAGE,
      textContent: null, // Image pages don't have text content
      imagePrompt: enhanceImagePrompt(templatePage.imagePrompt, characterData),
    };

    // Add both pages to the book
    pages.push(textPage, imagePage);
  });

  // Create the book data
  const bookData: BookCreateData = {
    title: template.title, // Could be personalized if desired
    status: BookStatus.CUSTOMIZING,
    pageCount: template.pageCount + BOOK_DEFAULT_PAGES, // Double the page count (text + image pages) , add default pages
    coverPrompt: enhanceImagePrompt(template.coverPrompt, characterData),
    pages: pages,
    templateId: template.id,
    userId: userId,
    characterImageReference: characterImageReference || null,
  };
  console.log(
    "Created book with pages-",
    template.pageCount * 2 + BOOK_DEFAULT_PAGES
  );
  return bookData;
}

/**
 * Replaces placeholders in text with character data values
 * and ensures proper capitalization at the beginning of sentences
 *
 * @param text The template text containing placeholders
 * @param characterData The character customization data
 * @returns Personalized text with placeholders replaced
 */
function personalizeText(text: string, characterData: CharacterData): string {
  // Define a mapping of placeholders to actual values
  const placeholders: Record<string, string> = {
    "[CHILD_NAME]":
      characterData.name.charAt(0).toUpperCase() + characterData.name.slice(1),
    "[CHILD_AGE]": characterData.age?.toString() || "young",
    "[CHILD_GENDER]": characterData.gender || "",
    "[HE_SHE]": characterData.gender === "boy" ? "he" : "she",
    "[HIS_HER]": characterData.gender === "boy" ? "his" : "her",
    "[HIM_HER]": characterData.gender === "boy" ? "him" : "her",
    "[BOY_GIRL]": characterData.gender === "boy" ? "boy" : "girl",
    "[BROTHER_SISTER]": characterData.gender === "boy" ? "brother" : "sister",
    "[SON_DAUGHTER]": characterData.gender === "boy" ? "son" : "daughter",
  };

  // Starting with the original text
  let personalized = text;

  // Replace each placeholder with its corresponding value
  Object.entries(placeholders).forEach(([placeholder, value]) => {
    personalized = personalized.split(placeholder).join(value);
  });

  // Fix capitalization at the beginning of sentences
  personalized = personalized.replace(
    /(^|[.!?]\s+)([a-z])/g,
    (match, separator, letter) => separator + letter.toUpperCase()
  );

  return personalized;
}

/**
 * Enhances image prompts with character details
 *
 * @param basePrompt The base image prompt from the template
 * @param characterData The character customization data
 * @returns Enhanced image prompt with character details
 */
function enhanceImagePrompt(
  basePrompt: string,
  characterData: CharacterData
): string {
  // Build character description first
  const traits: string[] = [];

  traits.push(`a young ${characterData.age} years old ${characterData.gender}`);

  if (characterData.hairColor) {
    traits.push(`${characterData.hairColor} hair`);
  }

  if (characterData.hairStyle) {
    traits.push(`${characterData.hairStyle} hairstyle`);
  }

  if (characterData.eyeColor) {
    traits.push(`${characterData.eyeColor} eyes`);
  }

  if (characterData.skinTone) {
    traits.push(`${characterData.skinTone} skin color`);
  }

  if (characterData.wearingGlasses) {
    traits.push("wearing glasses");
  }

  // Combine traits with base prompt
  // Place character description at the beginning of the prompt
  const enhancedPrompt = `${IMAGE_STYLE} of ${traits.join(
    ", "
  )}. ${basePrompt}, ${IMAGE_STYLE_PROMPT}`;

  return enhancedPrompt;
}
