import { BookTemplateFull } from "@/types/book";

/**
 * Replaces all character-related placeholders in text with generic values
 * @param text - The text containing the placeholders
 * @param genericName - The name to replace the name placeholder with (defaults to "Alex")
 * @param genericAge - The age to replace the age placeholder with (defaults to "8")
 * @param genericGender - The gender to replace the gender placeholder with (defaults to "boy")
 * @returns The text with all placeholders replaced
 */
export const replaceCharacterPlaceholders = (
  text: string,
  genericName: string = "Alex",
  genericAge: string = "8",
  genericGender: string = "boy"
): string => {
  // Define a mapping of placeholders to generic values
  const placeholders: Record<string, string> = {
    "[CHILD_NAME]": genericName.charAt(0).toUpperCase() + genericName.slice(1),
    "[CHILD_AGE]": genericAge,
    "[CHILD_GENDER]": genericGender,
    "[HE_SHE]": genericGender === "boy" ? "he" : "she",
    "[HIS_HER]": genericGender === "boy" ? "his" : "her",
    "[HIM_HER]": genericGender === "boy" ? "him" : "her",
  };

  // Replace each placeholder with its corresponding value
  let processedText = text;
  Object.entries(placeholders).forEach(([placeholder, value]) => {
    processedText = processedText.split(placeholder).join(value);
  });

  return processedText;
};

/**
 * Processes the entire book template to replace all character-related placeholders
 * @param bookTemplate - The book template to process
 * @param genericName - The name to replace the name placeholder with (defaults to "Alex")
 * @param genericAge - The age to replace the age placeholder with (defaults to "8")
 * @param genericGender - The gender to replace the gender placeholder with (defaults to "boy")
 * @returns A new book template with all placeholders replaced
 */
export const processBookTemplateForPreview = (
  bookTemplate: BookTemplateFull,
  genericName: string = "Alex",
  genericAge: string = "8",
  genericGender: string = "boy"
): BookTemplateFull => {
  return {
    ...bookTemplate,
    pages: bookTemplate.pages.map((page) => ({
      ...page,
      content: replaceCharacterPlaceholders(
        page.content,
        genericName,
        genericAge,
        genericGender
      ),
    })),
  };
};
