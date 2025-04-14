"use server";

import prisma from "@/lib/prisma";

/**
 * Creates a new user in the database
 */
export async function createUser(clerkId: string, email: string) {
  try {
    const newUser = await prisma.user.create({
      data: {
        clerkId,
        email,
      },
    });

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
