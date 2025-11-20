/**
 * Reports page mirrors the original prototype layout and behavior.
 */
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { fetchReports } from "../../api/reports";
import { ContentCard } from "../../components/ContentCard/ContentCard";
import { MasonryGrid } from "../../components/MasonryGrid/MasonryGrid";
import { ThemeFilters } from "../../components/ThemeFilters/ThemeFilters";
import type { ThemeId } from "../../data/themes";
import { useDarkMode } from "../../hooks/useDarkMode";
import { mapThemeToFactor } from "../../utils/themeMappings";
import type { ContentItem } from "../../types";
import { reportsSection } from "./mockData";

const Reports = () => {
  const { isDarkMode } = useDarkMode();
  const [activeTheme, setActiveTheme] = useState<ThemeId>("all");
  const activeFactor = mapThemeToFactor(activeTheme);

  const {
    data: reports = [],
    isLoading,
    isError,
  } = useQuery<ContentItem[]>({
    queryKey: ["reports", activeFactor ?? "all"],
    queryFn: () => fetchReports({ factor: activeFactor }),
    staleTime: 0,
  });

  const shouldRenderGrid = !isLoading && !isError && reports.length > 0;

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
            {reportsSection.title}
          </h1>
          <p
            className={`text-sm leading-relaxed max-w-2xl ${
              isDarkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            {reportsSection.description}
          </p>
        </div>
      </section>

      <ThemeFilters activeTheme={activeTheme} onThemeChange={setActiveTheme} />

      <section className="max-w-6xl mx-auto px-6 py-8">
        {isLoading && (
          <p className={isDarkMode ? "text-gray-400" : "text-gray-600"}>
            Loading reports...
          </p>
        )}

        {isError && (
          <p className="text-sm text-red-500">
            Something went wrong while loading reports.
          </p>
        )}

        {shouldRenderGrid ? (
          <MasonryGrid
            items={reports}
            renderItem={(item) => <ContentCard key={item.id} item={item} />}
          />
        ) : null}

        {!isLoading && !isError && reports.length === 0 && (
          <p className={isDarkMode ? "text-gray-400" : "text-gray-600"}>
            No reports to show right now.
          </p>
        )}
      </section>
    </>
  );
};

export default Reports;
