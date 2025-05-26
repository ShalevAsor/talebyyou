// // src/services/book/__tests__/book-creation-service.test.ts

// import { createBookFromTemplate } from "./book-creation-service";
// import { BookStatus } from "@/generated/prisma";
// import { BookTemplateFull, PageType } from "@/types/book";
// import { BOOK_DEFAULT_PAGES } from "@/constants/bookConstants";
// import { CharacterData } from "@/schemas/character-schema";

// // Mock the logger to prevent console output during tests
// jest.mock("@/lib/logger", () => ({
//   logger: {
//     debug: jest.fn(),
//   },
// }));

// // Mock constants that might be imported
// jest.mock("@/constants/prompts", () => ({
//   IMAGE_STYLE: "high quality illustration",
//   IMAGE_STYLE_PROMPT: "highly detailed, vibrant colors",
// }));

// describe("Book Creation Service", () => {
//   test("should create a book with correct structure from template", () => {
//     // Arrange - Mock data
//     const mockTemplate: BookTemplateFull = {
//       id: "template1",
//       title: "Adventure Book",
//       description: "A fun adventure book",
//       pageCount: 2,
//       published: true,
//       coverImage: "https://example.com/cover.jpg",
//       coverPrompt: "A child going on an adventure",
//       minAge: 3,
//       maxAge: 8,
//       pages: [
//         {
//           id: "page1",
//           pageNumber: 1,
//           content: "Hello [CHILD_NAME], this is a story about a [BOY_GIRL].",
//           imagePrompt: "A child named [CHILD_NAME] playing",
//           imageUrl: "https://example.com/image1.jpg",
//           createdAt: new Date(),
//           updatedAt: new Date(),
//           templateId: "template1",
//         },
//       ],
//       createdAt: new Date(),
//       updatedAt: new Date(),
//       genres: [],
//     };

//     const mockCharacterData: CharacterData = {
//       name: "emma",
//       age: 6,
//       gender: "girl",
//       hairColor: "brown",
//       eyeColor: "blue",
//       skinTone: "light",
//       wearingGlasses: true,
//     };

//     // Act
//     const result = createBookFromTemplate(
//       mockTemplate,
//       mockCharacterData,
//       "user123"
//     );

//     // Assert
//     expect(result).toBeDefined();
//     expect(result.title).toBe("Adventure Book");
//     expect(result.status).toBe(BookStatus.CUSTOMIZING);
//     expect(result.templateId).toBe("template1");
//     expect(result.userId).toBe("user123");

//     // Check page structure
//     expect(result.pages.length).toBe(2 + BOOK_DEFAULT_PAGES); // template pages * 2 + default pages

//     // Check that placeholders are replaced correctly in text content
//     const textPage = result.pages.find((p) => p.type === PageType.TEXT);
//     expect(textPage?.textContent).toContain("Emma");
//     expect(textPage?.textContent).toContain("girl");

//     // Check that image prompts contain character details
//     const imagePage = result.pages.find((p) => p.type === PageType.IMAGE);
//     expect(imagePage?.imagePrompt).toContain("brown hair");
//     expect(imagePage?.imagePrompt).toContain("blue eyes");
//   });
// });
// src/services/book/__tests__/book-creation-service.test.ts

import { createBookFromTemplate } from "./book-creation-service";
import { BookStatus } from "@prisma/client";
import { BookTemplateFull, PageType } from "@/types/book";
import { BOOK_DEFAULT_PAGES } from "@/constants/bookConstants";
import { CharacterData } from "@/schemas/character-schema";

// Mock the logger to prevent console output during tests
jest.mock("@/lib/logger", () => ({
  logger: {
    debug: jest.fn(),
  },
}));

// Mock constants that might be imported
jest.mock("@/constants/prompts", () => ({
  IMAGE_STYLE: "high quality illustration",
  IMAGE_STYLE_PROMPT: "highly detailed, vibrant colors",
}));

describe("Book Creation Service", () => {
  // Common test data - template with multiple pages and character placeholders
  const createMockTemplate = (pageCount: number = 2): BookTemplateFull => ({
    id: "template1",
    title: "Adventure Book",
    description: "A fun adventure book",
    pageCount: pageCount,
    published: true,
    characterGender: "boy",
    slug: "adventure-book",
    coverImage: "https://example.com/cover.jpg",
    coverPrompt: "A child named [CHILD_NAME] going on an adventure",
    minAge: 3,
    maxAge: 8,
    pages: [
      {
        id: "page1",
        pageNumber: 1,
        content:
          "Hello [CHILD_NAME], this is a story about a [BOY_GIRL] who is [CHILD_AGE] years old.",
        imagePrompt: "A child named [CHILD_NAME] playing in a garden",
        imageUrl: "https://example.com/image1.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
        templateId: "template1",
      },
      {
        id: "page2",
        pageNumber: 2,
        content:
          "[HE_SHE] loves to play with [HIS_HER] toys. [HE_SHE] is a wonderful [SON_DAUGHTER].",
        imagePrompt: "A [BOY_GIRL] playing with toys",
        imageUrl: "https://example.com/image2.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
        templateId: "template1",
      },
    ].slice(0, pageCount),
    createdAt: new Date(),
    updatedAt: new Date(),
    genres: [],
  });

  test("should create a book with correct structure from template", () => {
    // Arrange - Mock data
    const mockTemplate = createMockTemplate(1);

    const mockCharacterData: CharacterData = {
      name: "emma",
      age: 6,
      gender: "girl",
      hairColor: "brown",
      eyeColor: "blue",
      skinTone: "light",
      wearingGlasses: true,
    };

    // Act
    const result = createBookFromTemplate(
      mockTemplate,
      mockCharacterData,
      "user123"
    );

    // Assert
    expect(result).toBeDefined();
    expect(result.title).toBe("Adventure Book");
    expect(result.status).toBe(BookStatus.CUSTOMIZING);
    expect(result.templateId).toBe("template1");
    expect(result.userId).toBe("user123");

    // Check page structure - should have 1 template page (text+image) + 2 default pages
    expect(result.pages.length).toBe(2 + BOOK_DEFAULT_PAGES);

    // Check dedication page and empty page exist
    expect(result.pages[0].type).toBe(PageType.DEDICATION);
    expect(result.pages[1].type).toBe(PageType.GENERAL);

    // Check that placeholders are replaced correctly in text content
    const textPage = result.pages.find((p) => p.type === PageType.TEXT);
    expect(textPage?.textContent).toContain("Emma");
    expect(textPage?.textContent).toContain("girl");
    expect(textPage?.textContent).toContain("6 years old");

    // Check that image prompts contain character details
    const imagePage = result.pages.find((p) => p.type === PageType.IMAGE);
    expect(imagePage?.imagePrompt).toContain("brown hair");
    expect(imagePage?.imagePrompt).toContain("blue eyes");
    expect(imagePage?.imagePrompt).toContain("wearing glasses");
  });

  test("should correctly handle male pronouns in text replacement", () => {
    // Arrange
    const mockTemplate = createMockTemplate(2);
    const boyCharacterData: CharacterData = {
      name: "lucas",
      age: 5,
      gender: "boy",
      hairColor: "black",
      eyeColor: "brown",
      skinTone: "medium",
      wearingGlasses: false,
    };

    // Act
    const result = createBookFromTemplate(
      mockTemplate,
      boyCharacterData,
      "user456"
    );

    // Assert - Check pronoun replacement
    const secondTextPage = result.pages.find(
      (p) => p.type === PageType.TEXT && p.pageNumber > 3
    );

    expect(secondTextPage?.textContent).toContain(
      "He loves to play with his toys"
    );
    expect(secondTextPage?.textContent).toContain("He is a wonderful son");
  });

  test("should correctly handle female pronouns in text replacement", () => {
    // Arrange
    const mockTemplate = createMockTemplate(2);
    const girlCharacterData: CharacterData = {
      name: "olivia",
      age: 7,
      gender: "girl",
      hairColor: "blonde",
      eyeColor: "green",
      skinTone: "medium",
      wearingGlasses: true,
    };

    // Act
    const result = createBookFromTemplate(
      mockTemplate,
      girlCharacterData,
      "user789"
    );

    // Assert - Check pronoun replacement
    const secondTextPage = result.pages.find(
      (p) => p.type === PageType.TEXT && p.pageNumber > 3
    );

    expect(secondTextPage?.textContent).toContain(
      "She loves to play with her toys"
    );
    expect(secondTextPage?.textContent).toContain(
      "She is a wonderful daughter"
    );
  });

  test("should handle a template with multiple pages correctly", () => {
    // Arrange - Template with multiple pages
    const mockTemplate = createMockTemplate(2);
    const mockCharacterData: CharacterData = {
      name: "noah",
      age: 4,
      gender: "boy",
      hairColor: "red",
      eyeColor: "hazel",
      skinTone: "medium",
      wearingGlasses: false,
    };

    // Act
    const result = createBookFromTemplate(
      mockTemplate,
      mockCharacterData,
      "user123"
    );

    // Assert - Check page count and structure
    // 2 template pages (each becomes text+image) + 2 default pages = 6 total
    expect(result.pages.length).toBe(4 + BOOK_DEFAULT_PAGES);

    // Check page numbers sequence
    const pageNumbers = result.pages
      .map((p) => p.pageNumber)
      .sort((a, b) => a - b);
    expect(pageNumbers).toEqual([1, 2, 3, 4, 5, 6]);

    // Check text pages have content
    const textPages = result.pages.filter((p) => p.type === PageType.TEXT);
    expect(textPages.length).toBe(2);

    // Check first page contains the name (we know this page has the name placeholder)
    const firstTextPage = textPages.find((p) => p.pageNumber === 3);
    expect(firstTextPage?.textContent).toContain("Noah");

    // Check second page contains expected pronouns for a boy
    const secondTextPage = textPages.find((p) => p.pageNumber === 5);
    expect(secondTextPage?.textContent).toContain(
      "He loves to play with his toys"
    );

    // Check all image pages have prompts
    const imagePages = result.pages.filter((p) => p.type === PageType.IMAGE);
    expect(imagePages.length).toBe(2);
    imagePages.forEach((page) => {
      expect(page.imagePrompt).toBeDefined();
      expect(page.imagePrompt).toContain("red hair");
    });
  });

  test("should handle anonymous users correctly", () => {
    // Arrange
    const mockTemplate = createMockTemplate(1);
    const mockCharacterData: CharacterData = {
      name: "alex",
      age: 6,
      gender: "boy",
    };

    // Act - Empty user ID for anonymous user
    const result = createBookFromTemplate(mockTemplate, mockCharacterData, "");

    // Assert
    expect(result.userId).toBe("");
  });

  test("should handle character image reference correctly", () => {
    // Arrange
    const mockTemplate = createMockTemplate(1);
    const mockCharacterData: CharacterData = {
      name: "mia",
      age: 7,
      gender: "girl",
    };
    const characterImageRef = "character-image-123";

    // Act
    const result = createBookFromTemplate(
      mockTemplate,
      mockCharacterData,
      "user123",
      characterImageRef
    );

    // Assert
    expect(result.characterImageReference).toBe(characterImageRef);
  });
  test("should capitalize the first letter of each sentence", () => {
    // Arrange
    const mockTemplate: BookTemplateFull = {
      id: "template1",
      title: "Capitalization Test",
      description: "Testing sentence capitalization",
      pageCount: 1,
      published: true,
      coverImage: "https://example.com/cover.jpg",
      coverPrompt: "A child having an adventure",
      minAge: 3,
      maxAge: 8,
      pages: [
        {
          id: "page1",
          pageNumber: 1,
          content:
            "[HE_SHE] is amazing. [HE_SHE] loves to play. [HIS_HER] toys are fun. [CHILD_NAME], [CHILD_NAME] [CHILD_NAME].",
          imagePrompt: "A [BOY_GIRL] playing",
          imageUrl: "https://example.com/image.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
          templateId: "template1",
        },
      ],
      createdAt: new Date(),
      updatedAt: new Date(),
      genres: [],
    };

    const characterData: CharacterData = {
      name: "jake",
      age: 5,
      gender: "boy",
    };

    // Act
    const result = createBookFromTemplate(
      mockTemplate,
      characterData,
      "user123"
    );

    // Assert - Check proper capitalization at sentence beginnings
    const textPage = result.pages.find((p) => p.type === PageType.TEXT);
    expect(textPage?.textContent).toBe(
      "He is amazing. He loves to play. His toys are fun. Jake, Jake Jake."
    );
  });
});
