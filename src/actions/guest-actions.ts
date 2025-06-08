// src/actions/guest-actions.ts
"use server";

import { cookies } from "next/headers";
import { v4 as uuidv4 } from "uuid";
import prisma from "@/lib/prisma";
import {
  ActionResult,
  createSuccessResult,
  createErrorResult,
} from "@/types/actions";
import { logger } from "@/lib/logger";
import { BookFull, BookStatus } from "@/types/book";
import { serializeBooks } from "@/utils/serializers";
import { BOOK_CREATION_LIMIT } from "@/constants/bookConstants";
import { SESSION_COOKIE_NAME, SESSION_DURATION_DAYS } from "@/constants/user";
import config from "@/lib/config";

/**
 * Gets or creates a guest session
 * If a valid session exists in cookies, returns it
 * Otherwise creates a new session
 *
 * @returns ActionResult with session ID
 */
export async function getOrCreateGuestSession(): Promise<
  ActionResult<{ sessionId: string }>
> {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME);

    // If we have a session ID in cookies, try to find it
    if (sessionCookie) {
      const session = await prisma.guestSession.findUnique({
        where: { sessionId: sessionCookie.value },
      });

      // If session exists and isn't expired, update lastActive and return it
      if (session && new Date() < session.expiresAt) {
        // Update the session's last active timestamp
        await prisma.guestSession.update({
          where: { id: session.id },
          data: {
            lastActive: new Date(),
            // Optionally extend expiration date on activity
            expiresAt: new Date(
              Date.now() + SESSION_DURATION_DAYS * 24 * 60 * 60 * 1000
            ),
          },
        });

        logger.debug(
          { sessionId: session.sessionId },
          "Retrieved existing guest session"
        );

        return createSuccessResult({ sessionId: session.sessionId });
      }
    }

    // Create a new session if we don't have one or it's expired
    const newSessionId = uuidv4();
    const expiresAt = new Date(
      Date.now() + SESSION_DURATION_DAYS * 24 * 60 * 60 * 1000
    );

    await prisma.guestSession.create({
      data: {
        sessionId: newSessionId,
        expiresAt,
      },
    });

    // Set the cookie
    cookieStore.set(SESSION_COOKIE_NAME, newSessionId, {
      expires: expiresAt,
      path: "/",
      sameSite: "lax",
      secure: config.APP.NODE_ENV === "production",
      httpOnly: true,
    });

    logger.info({ sessionId: newSessionId }, "Created new guest session");

    return createSuccessResult({ sessionId: newSessionId });
  } catch (error) {
    logger.error({ error }, "Error managing guest session");
    return createErrorResult(
      error instanceof Error ? error.message : "Unknown error occurred"
    );
  }
}

/**
 * Gets all books for the current guest session
 *
 * @returns ActionResult with an array of books associated with the current session
 */
export async function getGuestSessionBooks(): Promise<
  ActionResult<BookFull[]>
> {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME);

    // If no session cookie exists, return empty array
    if (!sessionCookie) {
      logger.debug(
        "No guest session cookie found, returning empty books array"
      );
      return createSuccessResult([]);
    }

    // Get the session with its books
    const session = await prisma.guestSession.findUnique({
      where: { sessionId: sessionCookie.value },
      include: {
        books: {
          include: {
            order: true,
            printJob: true,
            pages: {
              orderBy: { pageNumber: "asc" },
            },
            template: {
              include: {
                genres: true,
              },
            },
            character: true,
            imageGenerations: {
              orderBy: { createdAt: "desc" },
            },
          },
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });

    // If session doesn't exist or is expired, return empty array
    if (!session || new Date() > session.expiresAt) {
      // Clean up the invalid cookie if it exists
      if (session && new Date() > session.expiresAt) {
        logger.debug(
          { sessionId: sessionCookie.value },
          "Guest session expired, clearing cookie"
        );
        cookieStore.delete(SESSION_COOKIE_NAME);
      } else {
        logger.debug(
          { sessionId: sessionCookie.value },
          "Guest session not found in database"
        );
      }

      return createSuccessResult([]);
    }

    // Update the session's last active timestamp
    await prisma.guestSession.update({
      where: { id: session.id },
      data: {
        lastActive: new Date(),
      },
    });

    logger.debug(
      {
        sessionId: session.sessionId,
        bookCount: session.books.length,
      },
      "Retrieved guest session books"
    );

    // Serialize the books to handle Decimal values in Order and PrintJob
    const serializedBooks = serializeBooks(session.books);

    return createSuccessResult(serializedBooks as BookFull[]);
  } catch (error) {
    logger.error({ error }, "Error fetching guest session books");
    return createErrorResult(
      error instanceof Error ? error.message : "Unknown error occurred"
    );
  }
}

/**
 * Associates a book with the current guest session
 * Creates a session if one doesn't exist
 *
 * @param bookId The ID of the book to associate with the guest session
 * @returns ActionResult indicating success or failure
 */
export async function addBookToGuestSession(
  bookId: string
): Promise<ActionResult<null>> {
  try {
    // First, validate that the book exists
    const book = await prisma.book.findUnique({
      where: { id: bookId },
      select: { id: true, userId: true, guestSessionId: true },
    });

    if (!book) {
      return createErrorResult(`Book with ID ${bookId} not found`);
    }

    // Check if book is already associated with a user or session
    if (book.userId) {
      logger.warn(
        { bookId, userId: book.userId },
        "Book already associated with a user, cannot add to guest session"
      );
      return createErrorResult("Book already associated with a user account");
    }

    if (book.guestSessionId) {
      logger.debug(
        { bookId, guestSessionId: book.guestSessionId },
        "Book already associated with a guest session"
      );
      // This isn't an error, it's already associated with a session
      return createSuccessResult(null, "Book already in guest session");
    }

    // Get or create a guest session
    const cookieStore = await cookies();
    let sessionId: string;

    // Check if we already have a session
    const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME);
    if (sessionCookie) {
      // Try to get the existing session
      const session = await prisma.guestSession.findUnique({
        where: { sessionId: sessionCookie.value },
      });

      // If session exists and isn't expired, use it
      if (session && new Date() < session.expiresAt) {
        sessionId = session.id;

        // Update the session's last active timestamp
        await prisma.guestSession.update({
          where: { id: sessionId },
          data: {
            lastActive: new Date(),
          },
        });
      } else {
        // Session doesn't exist or is expired, create a new one
        const result = await getOrCreateGuestSession();
        if (!result.success) {
          return createErrorResult(
            `Failed to create guest session: ${result.error}`
          );
        }

        // Get the newly created session
        const newSession = await prisma.guestSession.findUnique({
          where: { sessionId: result.data.sessionId },
        });

        if (!newSession) {
          return createErrorResult("Failed to retrieve newly created session");
        }

        sessionId = newSession.id;
      }
    } else {
      // No session exists, create a new one
      const result = await getOrCreateGuestSession();
      if (!result.success) {
        return createErrorResult(
          `Failed to create guest session: ${result.error}`
        );
      }

      // Get the newly created session
      const newSession = await prisma.guestSession.findUnique({
        where: { sessionId: result.data.sessionId },
      });

      if (!newSession) {
        return createErrorResult("Failed to retrieve newly created session");
      }

      sessionId = newSession.id;
    }

    // Associate the book with the session
    await prisma.book.update({
      where: { id: bookId },
      data: {
        guestSessionId: sessionId,
      },
    });

    logger.info(
      { bookId, guestSessionId: sessionId },
      "Successfully associated book with guest session"
    );

    return createSuccessResult(
      null,
      "Book successfully added to guest session"
    );
  } catch (error) {
    logger.error({ error, bookId }, "Error adding book to guest session");
    return createErrorResult(
      error instanceof Error ? error.message : "Unknown error occurred"
    );
  }
}
/**
 * Checks if the current guest session has reached the book creation limit
 *
 * @returns ActionResult with information about book creation limits
 */
export async function checkGuestBookLimit(): Promise<
  ActionResult<{
    canCreate: boolean;
    remainingBooks: number;
    totalCreated: number;
    message?: string;
  }>
> {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME);

    // If no session cookie exists, the guest can create books (starting fresh)
    if (!sessionCookie) {
      logger.debug("No guest session found, book limit not reached");
      return createSuccessResult({
        canCreate: true,
        remainingBooks: BOOK_CREATION_LIMIT,
        totalCreated: 0,
      });
    }

    // Get the session with non-ordered books
    const session = await prisma.guestSession.findUnique({
      where: { sessionId: sessionCookie.value },
      include: {
        books: {
          where: {
            status: BookStatus.CUSTOMIZING,
          },
        },
      },
    });

    // If session doesn't exist or is expired, guest can create books
    if (!session || new Date() > session.expiresAt) {
      return createSuccessResult({
        canCreate: true,
        remainingBooks: BOOK_CREATION_LIMIT,
        totalCreated: 0,
      });
    }

    // Count the books that haven't been ordered yet
    const totalCreated = session.books.length;
    const remainingBooks = Math.max(0, BOOK_CREATION_LIMIT - totalCreated);
    const canCreate = totalCreated < BOOK_CREATION_LIMIT;

    logger.debug(
      {
        sessionId: session.sessionId,
        totalCreated,
        remainingBooks,
        canCreate,
      },
      "Checked guest book creation limit"
    );

    return createSuccessResult({
      canCreate,
      remainingBooks,
      totalCreated,
      message: canCreate
        ? undefined
        : `You've reached the limit of ${BOOK_CREATION_LIMIT} books. Please order your existing books to create more.`,
    });
  } catch (error) {
    logger.error({ error }, "Error checking guest book limit");
    return createErrorResult(
      error instanceof Error
        ? error.message
        : "Failed to check book creation limit"
    );
  }
}

/**
 * Migrates books from a guest session to a user account
 * Used when a guest user signs up or logs in
 *
 * @param userId The ID of the user to migrate books to
 * @returns ActionResult with the number of books migrated
 */
export async function migrateGuestSessionToUser(
  userId: string
): Promise<ActionResult<{ migratedCount: number }>> {
  try {
    // Validate the user ID
    if (!userId) {
      return createErrorResult("Invalid user ID");
    }

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true },
    });

    if (!user) {
      return createErrorResult(`User with ID ${userId} not found`);
    }

    // Get the current guest session
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME);

    // If no session cookie exists, nothing to migrate
    if (!sessionCookie) {
      logger.debug({ userId }, "No guest session found, nothing to migrate");
      return createSuccessResult({ migratedCount: 0 });
    }

    // Find the guest session with its books
    const session = await prisma.guestSession.findUnique({
      where: { sessionId: sessionCookie.value },
      include: { books: true },
    });

    // If session doesn't exist or is expired, or has no books, nothing to migrate
    if (
      !session ||
      new Date() > session.expiresAt ||
      session.books.length === 0
    ) {
      // Clean up the invalid cookie if it exists
      if (sessionCookie) {
        logger.debug(
          { sessionId: sessionCookie.value },
          "Session expired or not found or has no books, clearing cookie"
        );
        cookieStore.delete(SESSION_COOKIE_NAME);
      }

      return createSuccessResult({ migratedCount: 0 });
    }

    // Transfer all books from guest session to user account
    // Use a transaction to ensure all books are migrated or none
    const bookIds = session.books.map((book) => book.id);

    await prisma.$transaction(async (tx) => {
      // Update all books in the session to belong to the user
      await tx.book.updateMany({
        where: {
          id: { in: bookIds },
        },
        data: {
          userId: userId,
          guestSessionId: null,
        },
      });

      // Delete the guest session
      await tx.guestSession.delete({
        where: { id: session.id },
      });
    });

    // Clear the session cookie
    cookieStore.delete(SESSION_COOKIE_NAME);

    logger.info(
      {
        userId,
        sessionId: session.sessionId,
        migratedCount: bookIds.length,
      },
      "Successfully migrated books from guest session to user account"
    );

    return createSuccessResult(
      {
        migratedCount: bookIds.length,
      },
      `Successfully migrated ${bookIds.length} books to your account`
    );
  } catch (error) {
    logger.error({ error, userId }, "Error migrating guest session to user");
    return createErrorResult(
      error instanceof Error ? error.message : "Unknown error occurred"
    );
  }
}

/**
 * Clean up expired guest sessions (can be run via admin or cron job)
 */
export async function cleanupExpiredGuestSessions(): Promise<
  ActionResult<{ cleanedCount: number }>
> {
  try {
    const result = await prisma.guestSession.deleteMany({
      where: {
        expiresAt: {
          lt: new Date(),
        },
      },
    });

    logger.info(
      { deletedCount: result.count },
      "Cleaned up expired guest sessions"
    );

    return createSuccessResult({ cleanedCount: result.count });
  } catch (error) {
    logger.error({ error }, "Error cleaning up expired guest sessions");
    return createErrorResult(
      error instanceof Error ? error.message : "Unknown error occurred"
    );
  }
}

// Add this to your guest-actions.ts file

/**
 * Server-side migration that can access httpOnly cookies
 * Called when a user signs up and lands on my-books page
 */
export async function attemptGuestMigration(
  userId: string
): Promise<ActionResult<{ migratedCount: number; message?: string }>> {
  try {
    // Validate the user ID
    if (!userId) {
      return createErrorResult("Invalid user ID");
    }

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true },
    });

    if (!user) {
      return createErrorResult(`User with ID ${userId} not found`);
    }

    // Get the current guest session from httpOnly cookie
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME);

    // If no session cookie exists, nothing to migrate
    if (!sessionCookie) {
      logger.debug({ userId }, "No guest session found, nothing to migrate");
      return createSuccessResult({
        migratedCount: 0,
        message: "No guest session found",
      });
    }

    // Find the guest session with its books
    const session = await prisma.guestSession.findUnique({
      where: { sessionId: sessionCookie.value },
      include: { books: true },
    });

    // If session doesn't exist or is expired, or has no books, nothing to migrate
    if (
      !session ||
      new Date() > session.expiresAt ||
      session.books.length === 0
    ) {
      // Clean up the invalid cookie if it exists
      if (sessionCookie) {
        logger.debug(
          { sessionId: sessionCookie.value },
          "Session expired or not found or has no books, clearing cookie"
        );
      }

      return createSuccessResult({
        migratedCount: 0,
        message:
          session?.books.length === 0
            ? "No books to migrate"
            : "Session expired",
      });
    }

    // Transfer all books from guest session to user account
    // Use a transaction to ensure all books are migrated or none
    const bookIds = session.books.map((book) => book.id);

    await prisma.$transaction(async (tx) => {
      // Update all books in the session to belong to the user
      await tx.book.updateMany({
        where: {
          id: { in: bookIds },
        },
        data: {
          userId: userId,
          guestSessionId: null,
        },
      });

      // Delete the guest session
      await tx.guestSession.delete({
        where: { id: session.id },
      });
    });

    logger.info(
      {
        userId,
        sessionId: session.sessionId,
        migratedCount: bookIds.length,
      },
      "Successfully migrated books from guest session to user account"
    );

    return createSuccessResult({
      migratedCount: bookIds.length,
      message: `Successfully migrated ${bookIds.length} books to your account`,
    });
  } catch (error) {
    logger.error({ error, userId }, "Error migrating guest session to user");
    return createErrorResult(
      error instanceof Error ? error.message : "Unknown error occurred"
    );
  }
}
