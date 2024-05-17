/**
 * Truncate a string if it exceeds a specified length and append '...'.
 * @param text - The text to truncate.
 * @param maxLength - The maximum length of the text before truncation.
 * @returns The truncated text with '...' appended if it exceeds maxLength.
 */
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) {
    return text
  }
  return text.slice(0, maxLength) + '...'
}
