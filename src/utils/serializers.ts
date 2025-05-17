// src/utils/serializers.ts

/**
 * Recursively serializes objects, converting Decimal values to numbers
 */
export function serializeData<T>(data: T): T {
  if (data === null || data === undefined) {
    return data;
  }

  // Handle arrays
  if (Array.isArray(data)) {
    return data.map(serializeData) as T;
  }

  // Handle Date objects (Next.js can handle these)
  if (data instanceof Date) {
    return data;
  }

  // Handle objects (including Decimal)
  if (typeof data === "object") {
    const result = {} as Record<string, unknown>;

    for (const key in data) {
      const value = data[key];

      // Check if the value might be a Decimal
      if (
        value !== null &&
        typeof value === "object" &&
        "toNumber" in value &&
        typeof value.toNumber === "function"
      ) {
        // Convert Decimal to Number
        result[key] = Number(value);
      } else if (typeof value === "object") {
        // Recursively process nested objects
        result[key] = serializeData(value);
      } else {
        // Keep primitive values as-is
        result[key] = value;
      }
    }

    return result as T;
  }

  // Return primitive values as-is
  return data;
}

/**
 * Serializes a book object and all its relations, ensuring Decimal values are converted to numbers
 */
export function serializeBook<T>(book: T | null): T | null {
  if (!book) return null;
  return serializeData(book);
}

/**
 * Serializes an array of book objects
 */
export function serializeBooks<T>(books: T[]): T[] {
  return books.map((book) => serializeData(book));
}

/**
 * Serializes an order object, ensuring Decimal values are converted to numbers
 */
export function serializeOrder<T>(order: T | null): T | null {
  if (!order) return null;
  return serializeData(order);
}

/**
 * Serializes an array of order objects
 */
export function serializeOrders<T>(orders: T[]): T[] {
  return orders.map((order) => serializeData(order));
}
