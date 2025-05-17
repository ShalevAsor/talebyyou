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
//     mutationFn: async (data: CharacterData & { croppedImage?: Blob }) => {
//       try {
//         // Step 1: Upload character image
//         let characterImageId: string | undefined = undefined;

//         if (data.croppedImage) {
//           setCreationStage("uploading");

//           // Generate a filename based on the child's name
//           const filename = `${data.name.toLowerCase()}-${Date.now()}-character`;

//           // Upload the image to Leonardo AI
//           const uploadResult = await uploadCharacterImage(
//             data.croppedImage,
//             filename
//           );

//           if (!uploadResult.success) {
//             throw new Error(
//               `Failed to upload character image: ${uploadResult.error}`
//             );
//           }

//           characterImageId = uploadResult.data;
//         }

//         // Step 2: Create the book with optional character image reference
//         setCreationStage("creating");
//         const bookResult = await createPersonalizedBook(
//           templateId,
//           data,
//           characterImageId,
//           undefined // imageId
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

//         // Add a small delay before navigation to ensure the user sees we're generating images
//         await new Promise((resolve) => setTimeout(resolve, 1000));

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
import { useState, useEffect, useRef } from "react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { CharacterData } from "@/schemas/character-schema";
import { createPersonalizedBook, deleteBook } from "@/actions/book-actions";
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
 * Ensures both cover and first page images are generated successfully
 */
export function useBookCreation(templateId: string) {
  const [creationStage, setCreationStage] = useState<BookCreationStage | null>(
    null
  );
  const router = useRouter();
  const { isSignedIn } = useAuth();

  // Track if component is mounted
  const isMounted = useRef(true);

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  const createBookMutation = useMutation({
    mutationFn: async (data: CharacterData & { croppedImage?: Blob }) => {
      let bookId: string | null = null;

      try {
        // Step 1: Upload character image
        let characterImageId: string | undefined = undefined;

        if (data.croppedImage) {
          setCreationStage("uploading");

          // Generate a filename based on the child's name
          const filename = `${data.name.toLowerCase()}-${Date.now()}-character`;

          // Upload the image to Leonardo AI
          const uploadResult = await uploadCharacterImage(
            data.croppedImage,
            filename
          );

          if (!uploadResult.success) {
            throw new Error(
              `Failed to upload character image: ${uploadResult.error}`
            );
          }

          characterImageId = uploadResult.data;
        }

        // Step 2: Create the book with optional character image reference
        setCreationStage("creating");
        const bookResult = await createPersonalizedBook(
          templateId,
          data,
          characterImageId,
          undefined // imageId
        );

        if (!bookResult.success) {
          throw new Error(`Failed to create book: ${bookResult.error}`);
        }

        bookId = bookResult.data;

        // If not logged in, add book to guest session
        if (!isSignedIn) {
          const guestSessionResult = await addBookToGuestSession(bookId);

          if (!guestSessionResult.success) {
            logger.warn(
              { error: guestSessionResult.error, bookId },
              "Failed to add book to guest session, but continuing"
            );
            // Don't throw error here - we still want to continue with book creation
          }
        }

        // Step 3: Generate images - BOTH must succeed
        setCreationStage("generating");

        // Try to generate the cover image
        const coverGenResult = await generateBookCoverImage(
          bookId,
          characterImageId
        );

        if (!coverGenResult.success) {
          // Check if it's an API token error
          if (
            coverGenResult.error &&
            (coverGenResult.error.includes("not enough api tokens") ||
              coverGenResult.error.includes("token") ||
              coverGenResult.error.includes("400"))
          ) {
            logger.error(
              { error: coverGenResult.error, bookId },
              "API token limit reached during cover generation"
            );

            // Delete the book
            if (bookId) {
              const deleteResult = await deleteBook(bookId);

              if (deleteResult.success) {
                logger.info(
                  { bookId },
                  "Successfully deleted book after cover generation API token error"
                );
              } else {
                logger.error(
                  { error: deleteResult.error, bookId },
                  "Failed to delete book after cover generation API token error"
                );
              }
            }

            throw new Error(
              "We've reached our image generation limit. Please try again later."
            );
          }

          // Handle other cover generation errors
          logger.error(
            { error: coverGenResult.error, bookId },
            "Cover generation failed with error"
          );

          // Delete the book
          if (bookId) {
            await deleteBook(bookId);
            logger.info(
              { bookId },
              "Deleted book after cover generation failure"
            );
          }

          throw new Error(
            `Failed to generate cover image: ${coverGenResult.error}`
          );
        }

        // Try to generate the first page image - this must also succeed
        const firstPageGenResult = await generateBookFirstPageImage(
          bookId,
          characterImageId
        );

        if (!firstPageGenResult.success) {
          // Check if it's an API token error
          if (
            firstPageGenResult.error &&
            (firstPageGenResult.error.includes("not enough api tokens") ||
              firstPageGenResult.error.includes("token") ||
              firstPageGenResult.error.includes("400"))
          ) {
            logger.error(
              { error: firstPageGenResult.error, bookId },
              "API token limit reached during first page generation"
            );

            // Delete the book
            if (bookId) {
              const deleteResult = await deleteBook(bookId);

              if (deleteResult.success) {
                logger.info(
                  { bookId },
                  "Successfully deleted book after first page API token error"
                );
              } else {
                logger.error(
                  { error: deleteResult.error, bookId },
                  "Failed to delete book after first page API token error"
                );
              }
            }

            throw new Error(
              "We've reached our image generation limit. Please try again later."
            );
          }

          // Handle other first page generation errors
          logger.error(
            { error: firstPageGenResult.error, bookId },
            "First page generation failed with error"
          );

          // Delete the book
          if (bookId) {
            await deleteBook(bookId);
            logger.info(
              { bookId },
              "Deleted book after first page generation failure"
            );
          }

          throw new Error(
            `Failed to generate first page image: ${firstPageGenResult.error}`
          );
        }

        // Short delay before navigation to ensure user sees progress
        await new Promise((resolve) => setTimeout(resolve, 1000));

        return bookId;
      } catch (error) {
        // Log the error for debugging
        logger.error({ error, bookId }, "Error in book creation process");

        // Additional cleanup if we have a book ID but something went wrong
        if (bookId) {
          try {
            const deleteResult = await deleteBook(bookId);

            if (deleteResult.success) {
              logger.info(
                { bookId },
                "Successfully cleaned up book after error"
              );
            } else {
              logger.error(
                { error, bookId },
                "Failed to clean up book after error"
              );
            }
          } catch (cleanupError) {
            logger.error(
              { error: cleanupError, bookId, originalError: error },
              "Error during book cleanup after creation failure"
            );
          }
        }

        throw error; // Re-throw to let React Query handle it
      }
    },
    onSuccess: (bookId) => {
      if (!isMounted.current) return;

      toast.success(
        "Your personalized book has been created! Continue customizing in preview mode"
      );

      // Navigate to the preview page
      router.push(`/library/preview/${bookId}`);
    },
    onError: (error) => {
      if (!isMounted.current) return;

      setCreationStage(null);

      // Check for specific error messages and provide user-friendly feedback
      const errorMessage =
        error instanceof Error ? error.message : String(error);

      if (errorMessage.includes("token") || errorMessage.includes("limit")) {
        toast.error(
          "We've reached our image generation limit. Please try again later or contact support."
        );
      } else {
        toast.error(
          "Something went wrong while creating your book. Please try again in a moment."
        );
      }

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
