/**
 * Placeholder hook for managing the currently selected theme filter.
 */
import { useState } from "react";

export const useTheme = () => {
  const [theme, setTheme] = useState<string | null>(null);
  return { theme, setTheme };
};
