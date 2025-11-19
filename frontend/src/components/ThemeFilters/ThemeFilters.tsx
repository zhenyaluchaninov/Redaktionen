/**
 * Sticky filter bar that mirrors the prototype chip layout.
 */
import { themes } from "../../data/themes";
import type { ThemeColor, ThemeId } from "../../data/themes";
import { useDarkMode } from "../../hooks/useDarkMode";

type FilterColor = Exclude<ThemeColor, "magenta" | "gray">;

const colorPalette: Record<FilterColor, string> = {
  red: "#EF4444",
  cyan: "#0891B2",
  blue: "#3B82F6",
  violet: "#8B5CF6",
  green: "#22C55E",
  amber: "#F59E0B",
};

type ThemeFiltersProps = {
  activeTheme: ThemeId;
  onThemeChange: (theme: ThemeId) => void;
};

export const ThemeFilters = ({
  activeTheme,
  onThemeChange,
}: ThemeFiltersProps) => {
  const { isDarkMode } = useDarkMode();

  return (
    <div
      className={`${
        isDarkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"
      } border-b sticky top-[73px] z-10`}
    >
      <div className="max-w-6xl mx-auto px-6 py-3">
        <div className="flex items-center gap-2 overflow-x-auto">
          {themes.map((theme) => {
            const isActive = activeTheme === theme.id;

            return (
              <button
                key={theme.id}
                type="button"
                onClick={() => onThemeChange(theme.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                  isActive
                    ? "text-white"
                    : isDarkMode
                    ? "bg-gray-800 text-gray-300 hover:bg-gray-700"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
                style={
                  isActive
                    ? theme.id === "all"
                      ? {
                          background:
                            "linear-gradient(135deg, #A855F7 0%, #EC4899 100%)",
                        }
                      : {
                          backgroundColor:
                            colorPalette[theme.color as FilterColor],
                        }
                    : undefined
                }
              >
                {theme.name}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
