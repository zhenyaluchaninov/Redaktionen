const DEFAULT_WPM = 230;

export const estimateReadingTime = (
  text: string,
  wordsPerMinute: number = DEFAULT_WPM
): number => {
  const words = text
    .replace(/\s+/g, " ")
    .trim()
    .split(" ")
    .filter(Boolean).length;

  const minutes = Math.ceil(words / wordsPerMinute);
  return Math.max(1, minutes);
};
