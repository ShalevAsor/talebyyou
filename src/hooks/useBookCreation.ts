// import { useState } from "react";
// import { useMutation } from "@tanstack/react-query";
// import { useRouter } from "next/navigation";
// import { CharacterData } from "@/schemas/character-schema";
// import { createPersonalizedBook } from "@/actions/book-actions";
// import {
//   generateBookCoverImage,
//   generateBookFirstPageImage,
//   uploadCharacterImage,
// } from "@/actions/image-actions";
// import { BookCreationStage } from "@/components/customization/BookCreationLoader";
// import { logger } from "@/lib/logger";
// import { toast } from "react-toastify";
// import { addBookToGuestSession } from "@/actions/guest-actions";
// import { useAuth } from "@clerk/nextjs";

// /**
//  * Custom hook to manage the book creation process with React Query
//  */
// export function useBookCreation(templateId: string) {
//   const [creationStage, setCreationStage] = useState<BookCreationStage | null>(
//     null
//   );
//   const router = useRouter();
//   const { isSignedIn } = useAuth();

//   const createBookMutation = useMutation({
//     mutationFn: async (data: CharacterData & { image: File }) => {
//       try {
//         // Step 1: Upload character image

//         setCreationStage("uploading");
//         console.log("Cropped image:", data.image);
//         // Generate a filename based on the child's name
//         const filename = `${data.name.toLowerCase()}-${Date.now()}-character`;

//         // Upload the image to Leonardo AI
//         const uploadResult = await uploadCharacterImage(data.image, filename);
//         console.log("Upload to leonardo ai result:", uploadResult);

//         if (!uploadResult.success) {
//           throw new Error(
//             `Failed to upload character image: ${uploadResult.error}`
//           );
//         }

//         const characterImageId = uploadResult.data;

//         // Step 2: Create the book with optional character image reference
//         setCreationStage("creating");
//         const bookResult = await createPersonalizedBook(
//           templateId,
//           data,
//           characterImageId
//         );

//         if (!bookResult.success) {
//           throw new Error(`Failed to create book: ${bookResult.error}`);
//         }

//         const bookId = bookResult.data;

//         // If not logged in, add book to guest session
//         if (!isSignedIn) {
//           const guestSessionResult = await addBookToGuestSession(bookId);

//           if (!guestSessionResult.success) {
//             logger.warn(
//               { error: guestSessionResult.error, bookId },
//               "Failed to add book to guest session, but continuing"
//             );
//             // Don't throw error here - we still want to continue with book creation
//           }
//         }

//         // Step 3: Start image generation for the cover and first page
//         setCreationStage("generating");
//         const coverGenResult = await generateBookCoverImage(
//           bookId,
//           characterImageId
//         );

//         if (!coverGenResult.success) {
//           logger.error(
//             { error: coverGenResult.error, bookId },
//             "Cover generation request failed"
//           );
//           throw new Error(
//             `Failed to generate cover image: ${coverGenResult.error}`
//           );
//         }

//         // Generate first page image
//         const firstPageGenResult = await generateBookFirstPageImage(
//           bookId,
//           characterImageId
//         );

//         if (!firstPageGenResult.success) {
//           logger.error(
//             { error: firstPageGenResult.error, bookId },
//             "First page generation request failed"
//           );
//           // Don't throw error for first page - we can still continue
//           logger.warn("First page generation failed, continuing anyway");
//         }

//         return bookId;
//       } catch (error) {
//         // Log the error for debugging
//         logger.error({ error }, "Error in book creation process");
//         throw error; // Re-throw to let React Query handle it
//       }
//     },
//     onSuccess: (bookId) => {
//       toast.success(
//         "Your personalized book has been created! Continue customizing in preview mode"
//       );
//       // Navigate directly to preview without showing "completed" stage
//       router.push(`/library/preview/${bookId}`);
//     },
//     onError: (error) => {
//       setCreationStage(null);
//       toast.error(
//         "Something went wrong while creating your book. Please try again in a moment."
//       );
//       logger.error({ error }, "Book creation failed");
//     },
//   });

//   return {
//     createBook: createBookMutation.mutate,
//     isCreating: createBookMutation.isPending,
//     error:
//       createBookMutation.error instanceof Error
//         ? createBookMutation.error.message
//         : createBookMutation.error
//         ? String(createBookMutation.error)
//         : null,
//     creationStage,
//     resetCreation: () => {
//       createBookMutation.reset();
//       setCreationStage(null);
//     },
//   };
// }
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { CharacterData } from "@/schemas/character-schema";
import { createPersonalizedBook } from "@/actions/book-actions";
import {
  generateBookCoverImage,
  generateBookFirstPageImage,
  uploadCharacterImage,
} from "@/actions/image-actions";
import { BookCreationStage } from "@/components/customization/BookCreationLoader";
import { logger } from "@/lib/logger";
import { toast } from "react-toastify";
import { addBookToGuestSession } from "@/actions/guest-actions";
import { useAuth } from "@clerk/nextjs";

/**
 * Custom hook to manage the book creation process with React Query
 */
export function useBookCreation(templateId: string) {
  const [creationStage, setCreationStage] = useState<BookCreationStage | null>(
    null
  );
  const router = useRouter();
  const { isSignedIn } = useAuth();

  const createBookMutation = useMutation({
    mutationFn: async (data: CharacterData & { image: File }) => {
      try {
        // Step 1: Upload character image

        setCreationStage("uploading");

        // Generate a filename based on the child's name
        const filename = `${data.name.toLowerCase()}-${Date.now()}-character`;
        // Upload the image to Leonardo AI
        const uploadResult = await uploadCharacterImage(data.image, filename);

        if (!uploadResult.success) {
          throw new Error(
            `Failed to upload character image: ${uploadResult.error}`
          );
        }

        const characterImageId = uploadResult.data;

        // Step 2: Create the book with optional character image reference
        setCreationStage("creating");
        const bookResult = await createPersonalizedBook(
          templateId,
          data,
          characterImageId
        );

        if (!bookResult.success) {
          throw new Error(`Failed to create book: ${bookResult.error}`);
        }

        const bookId = bookResult.data;

        // If not logged in, add book to guest session
        if (!isSignedIn) {
          const guestSessionResult = await addBookToGuestSession(bookId);

          if (!guestSessionResult.success) {
            logger.debug(
              { error: guestSessionResult.error, bookId },
              "Failed to add book to guest session, but continuing"
            );
            // Don't throw error here - we still want to continue with book creation
          }
        }

        // Step 3: Start image generation for the cover and first page
        setCreationStage("generating");
        const coverGenResult = await generateBookCoverImage(
          bookId,
          characterImageId
        );

        if (!coverGenResult.success) {
          logger.error(
            { error: coverGenResult.error, bookId },
            "Cover generation request failed"
          );
          throw new Error(
            `Failed to generate cover image: ${coverGenResult.error}`
          );
        }

        // Generate first page image
        const firstPageGenResult = await generateBookFirstPageImage(
          bookId,
          characterImageId
        );

        if (!firstPageGenResult.success) {
          logger.error(
            { error: firstPageGenResult.error, bookId },
            "First page generation request failed"
          );
          // Don't throw error for first page - we can still continue
          logger.warn("First page generation failed, continuing anyway");
        }

        return bookId;
      } catch (error) {
        // Log the error for debugging
        logger.error({ error }, "Error in book creation process");
        throw error; // Re-throw to let React Query handle it
      }
    },
    onSuccess: (bookId) => {
      toast.success(
        "Your personalized book has been created! Continue customizing in preview mode"
      );
      // Navigate directly to preview without showing "completed" stage
      router.push(`/library/preview/${bookId}`);
    },
    onError: (error) => {
      setCreationStage(null);
      toast.error(
        "Something went wrong while creating your book. Please try again in a moment."
      );
      logger.error({ error }, "Book creation failed");
    },
  });

  return {
    createBook: createBookMutation.mutate,
    isCreating: createBookMutation.isPending,
    error:
      createBookMutation.error instanceof Error
        ? createBookMutation.error.message
        : createBookMutation.error
        ? String(createBookMutation.error)
        : null,
    creationStage,
    resetCreation: () => {
      createBookMutation.reset();
      setCreationStage(null);
    },
  };
}
