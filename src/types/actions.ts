/**
 * Generic type for server action results
 * @template T - The type of data returned on success
 */
export type ActionResult<T> =
  | { success: true; data: T; message?: string }
  | { success: false; error: string };

/**
 * Helper function to create a successful action result
 * @param data - The data to return
 */
export const createSuccessResult = <T>(
  data: T,
  message?: string
): ActionResult<T> => ({
  success: true,
  data,
  message,
});

/**
 * Helper function to create a failed action result
 * @param error - The error message
 */
export const createErrorResult = <T>(error: string): ActionResult<T> => ({
  success: false,
  error,
});
