/**
 * Converts a given text into a URL-friendly slug.
 * @param text - The text to convert into a slug.
 * @returns The slugified version of the text.
 */
export const title2slug = (text: string): string => {
  return text
    .toLowerCase() // Convert to lowercase
    .normalize('NFD') // Normalize to NFD (Canonical Decomposition)
    .replace(/[\u0300-\u036f]/g, '') // Remove diacritical marks
    .trim() // Trim whitespace from both ends
    .replace(/[\s\W-]+/g, '-') // Replace spaces and non-word characters with a single dash
    .replace(/^-+|-+$/g, '') // Remove leading and trailing dashes
}
