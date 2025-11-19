import { themes } from "../data/themes";
import type { ThemeId, ThemeOption } from "../data/themes";

/**
 * Returns the color token of a given theme identifier.
 */
export const getThemeColor = (themeId: ThemeId | ThemeOption["id"]) => {
  const theme = themes.find((t) => t.id === themeId);
  return theme?.color ?? "gray";
};
