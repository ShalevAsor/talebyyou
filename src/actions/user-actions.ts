"use server";

import prisma from "@/lib/prisma";
import { logger } from "@/lib/logger";
import {
  ActionResult,
  createSuccessResult,
  createErrorResult,
} from "@/types/actions";

import { auth } from "@clerk/nextjs/server";
import { sendWelcomeEmail } from "./email-actions";
import { BookStatus, User } from "@/generated/prisma";
import { BookLimitResult } from "@/types/book";
import { BOOK_CREATION_LIMIT } from "@/constants/bookConstants";
/**
 * Gets the current user from the database based on Clerk authentication
 * If the user is not authenticated, returns null
 * If the user exists in Clerk but not in the database, returns null
 *
 * @returns The user object or null if not authenticated/not found
 */
export async function getCurrentUser() {
  try {
    // Get the current authentication session from Clerk
    const { userId } = await auth();

    // If no userId, user is not authenticated
    if (!userId) {
      logger.debug("getCurrentUser: No user authenticated");
      return null;
    }

    // Find the user in our database based on Clerk ID
    const user = await prisma.user.findUnique({
      where: {
        clerkId: userId,
      },
    });

    if (!user) {
      logger.debug(
        `getCurrentUser: User with clerkId ${userId} not found in database`
      );
      return null;
    }

    logger.debug(`getCurrentUser: Found user ${user.id}`);
    return user;
  } catch (error) {
    logger.error({ error }, "Error getting current user");
    return null;
  }
}
/**
 * Gets user by clerk id
 * @returns The user object or null if not authenticated/not found
 */
export async function getUserByClerkId(clerkId: string): Promise<User | null> {
  try {
    if (!clerkId) {
      logger.debug("getCurrentUser: No user authenticated");
      return null;
    }
    // Find the user in our database based on Clerk ID
    const user = await prisma.user.findUnique({
      where: {
        clerkId,
      },
    });

    if (!user) {
      logger.debug(
        `getCurrentUser: User with clerkId ${clerkId} not found in database`
      );
      return null;
    }
    logger.debug(`getCurrentUser: Found user ${user.id}`);
    return user;
  } catch (error) {
    logger.error({ error }, "Error getting current user");
    return null;
  }
}

/**
 * Creates a new user in the database and sends a welcome email
 */
export async function createUser(
  clerkId: string,
  email: string,
  firstName?: string,
  lastName?: string
) {
  try {
    const newUser = await prisma.user.create({
      data: {
        clerkId,
        email,
        firstName: firstName || null, // Store firstName if available
        lastName: lastName || null, // Store lastName if available
      },
    });

    // Send welcome email
    try {
      const name = firstName || "there"; // Use firstName for email if available
      await sendWelcomeEmail(email, name);
      console.log(`Welcome email sent to: ${email}`);
    } catch (emailError) {
      // Log email error but don't fail the user creation process
      console.error("Error sending welcome email:", emailError);
    }
    console.log(
      `Created new user with ID: ${newUser.id} for Clerk ID: ${clerkId}`
    );
    return { success: true, user: newUser };
  } catch (error) {
    console.error("Error creating user in database:", error);
    throw new Error("Failed to create user in database");
  }
}

/**
 * Updates an existing user in the database
 */
export async function updateUser(clerkId: string, email: string) {
  try {
    const updatedUser = await prisma.user.update({
      where: { clerkId },
      data: {
        email,
      },
    });

    console.log(`Updated user with ID: ${updatedUser.id}`);
    return { success: true, user: updatedUser };
  } catch (error) {
    console.error("Error updating user in database:", error);
    throw new Error("Failed to update user in database");
  }
}

/**
 * Deletes a user from the database
 */
export async function deleteUser(clerkId: string) {
  try {
    await prisma.user.delete({
      where: { clerkId },
    });

    console.log(`Deleted user with Clerk ID: ${clerkId}`);
    return { success: true };
  } catch (error) {
    console.error("Error deleting user from database:", error);
    throw new Error("Failed to delete user from database");
  }
}

/**
 * Get the total count of users in the system
 * @returns ActionResult with the count of users
 */
export async function getUsersCount(): Promise<ActionResult<number>> {
  try {
    // Assuming you have a User model in Prisma
    const count = await prisma.user.count();
    return createSuccessResult(count, "User count retrieved successfully");
  } catch (error) {
    console.error("Error fetching user count:", error);
    return createErrorResult("Failed to retrieve user count");
  }
}

/**
 * Checks if the current authenticated user can create a new book
 * Returns information about remaining books and creation limit
 */
export async function checkUserBookLimit(): Promise<
  ActionResult<BookLimitResult>
> {
  try {
    const user = await getCurrentUser();

    // If not authenticated, return an error
    if (!user?.id) {
      return createErrorResult("User not authenticated");
    }

    // Count books that haven't been ordered yet
    const totalCreated = await prisma.book.count({
      where: {
        userId: user.id,
        status: BookStatus.CUSTOMIZING,
      },
    });

    const remainingBooks = Math.max(0, BOOK_CREATION_LIMIT - totalCreated);
    const canCreate = totalCreated < BOOK_CREATION_LIMIT;

    logger.debug(
      { userId: user.id, totalCreated, remainingBooks, canCreate },
      "Checked book creation limit for user"
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
    logger.error({ error }, "Error checking user book limit");
    return createErrorResult(
      error instanceof Error
        ? error.message
        : "Failed to check book creation limit"
    );
  }
}
