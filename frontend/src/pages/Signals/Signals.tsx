/**
 * Signals page mirrors the original prototype layout and behavior.
 */
import { useMemo, useState } from "react";
import { ContentCard } from "../../components/ContentCard/ContentCard";
import { MasonryGrid } from "../../components/MasonryGrid/MasonryGrid";
import { ThemeFilters } from "../../components/ThemeFilters/ThemeFilters";
import type { ThemeId } from "../../data/themes";
import { useDarkMode } from "../../hooks/useDarkMode";
import { signalsContent, signalsSection } from "./mockData";

const Signals = () => {
  const { isDarkMode } = useDarkMode();
  const [activeTheme, setActiveTheme] = useState<ThemeId>("all");

  const filteredContent = useMemo(() => {
    if (activeTheme === "all") {
      return signalsContent;
    }

    return signalsContent.filter((item) => item.theme === activeTheme);
  }, [activeTheme]);

  return (
    <>
      <section
        className={`${
          isDarkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"
        } border-b`}
      >
        <div className="max-w-6xl mx-auto px-6 py-8">
          <h1
            className={`text-3xl font-semibold mb-3 ${
              isDarkMode ? "text-gray-100" : "text-gray-900"
            }`}
          >
            {signalsSection.title}
          </h1>
          <p
            className={`text-sm leading-relaxed max-w-2xl ${
              isDarkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            {signalsSection.description}
          </p>
        </div>
      </section>

      <ThemeFilters activeTheme={activeTheme} onThemeChange={setActiveTheme} />

      <section className="max-w-6xl mx-auto px-6 py-8">
        <MasonryGrid
          items={filteredContent}
          renderItem={(item) => <ContentCard key={item.id} item={item} />}
        />

        <div className="flex justify-center mt-6">
          <button
            type="button"
            className={`px-6 py-3 rounded-lg text-sm font-medium transition-colors ${
              isDarkMode
                ? "border border-gray-700 text-gray-300 hover:bg-gray-800"
                : "border border-gray-300 text-gray-700 hover:bg-gray-100"
            }`}
          >
            Load more
          </button>
        </div>
      </section>
    </>
  );
};

export default Signals;
