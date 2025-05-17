import axios from "axios";

/**
 * Fetches an image from a URL and returns it as a buffer
 */
export async function fetchImageAsBuffer(imageUrl: string): Promise<Buffer> {
  try {
    // Make sure the URL is properly formatted
    const url = imageUrl.startsWith("http") ? imageUrl : `https:${imageUrl}`;

    // Fetch the image
    const response = await axios.get(url, {
      responseType: "arraybuffer",
    });

    // Return the image data as a buffer
    return Buffer.from(response.data, "binary");
  } catch (error) {
    console.error(`Error fetching image from ${imageUrl}:`, error);
    throw error;
  }
}
