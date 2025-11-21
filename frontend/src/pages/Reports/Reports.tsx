/**
 * Reports page mirrors the original prototype layout and behavior.
 */
import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo, useRef, useState } from "react";
import { fetchReports } from "../../api/reports";
import { ContentCard } from "../../components/ContentCard/ContentCard";
import { MasonryGrid } from "../../components/MasonryGrid/MasonryGrid";
import { SkeletonMasonryGrid } from "../../components/MasonryGrid/SkeletonMasonryGrid";
import { ReportArticle } from "../../components/ReportArticle/ReportArticle";
import { ThemeFilters } from "../../components/ThemeFilters/ThemeFilters";
import type { ThemeId } from "../../data/themes";
import { useDarkMode } from "../../hooks/useDarkMode";
import type { Report } from "../../types";
import { reportsSection } from "./mockData";

const Reports = () => {
  const { isDarkMode } = useDarkMode();
  const [activeTheme, setActiveTheme] = useState<ThemeId>("all");
  const [selectedReportId, setSelectedReportId] = useState<
    string | number | null
  >(null);

  const {
    data: reports = [],
    isLoading,
    isError,
  } = useQuery<Report[]>({
    queryKey: ["reports"],
    queryFn: fetchReports,
    staleTime: 24 * 60 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  const hasAnimatedOnce = useRef(false);

  const filteredReports = useMemo(
    () =>
      activeTheme === "all"
        ? reports
        : reports.filter((item) => item.theme === activeTheme),
    [reports, activeTheme]
  );

  const selectedReport = useMemo(
    () => reports.find((item) => item.id === selectedReportId) ?? null,
    [reports, selectedReportId]
  );

  const enableAnimations =
    !hasAnimatedOnce.current && !isLoading && filteredReports.length > 0;

  useEffect(() => {
    if (!isLoading && filteredReports.length > 0) {
      hasAnimatedOnce.current = true;
    }
  }, [isLoading, filteredReports.length]);

  useEffect(() => {
    if (selectedReportId && !selectedReport) {
      setSelectedReportId(null);
    }
  }, [selectedReport, selectedReportId]);

  const shouldRenderGrid =
    !isError && filteredReports.length > 0 && !selectedReport;

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

      {selectedReport ? (
        <div
          className={`${
            isDarkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"
          } border-b sticky z-10`}
          style={{ top: "var(--header-height, 72px)" }}
        >
          <div className="max-w-6xl mx-auto px-6 py-3">
            <button
              type="button"
              onClick={() => setSelectedReportId(null)}
              className="px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all text-white"
              style={{
                background: "linear-gradient(135deg, #A855F7 0%, #EC4899 100%)",
              }}
            >
              ← All reports
            </button>
          </div>
        </div>
      ) : (
        <ThemeFilters activeTheme={activeTheme} onThemeChange={setActiveTheme} />
      )}

      <section className="max-w-6xl mx-auto px-6 py-8">
        {isLoading && reports.length === 0 && (
          <>
            <p className="sr-only">Loading reports...</p>
            <SkeletonMasonryGrid />
          </>
        )}

        {isError && (
          <p className="text-sm text-red-500">
            Something went wrong while loading reports.
          </p>
        )}

        {selectedReport ? <ReportArticle report={selectedReport} /> : null}

        {shouldRenderGrid ? (
          <MasonryGrid
            items={filteredReports}
            enableAnimations={enableAnimations}
            renderItem={(item) => (
              <ContentCard
                key={item.id}
                item={item}
                onClick={() => setSelectedReportId(item.id)}
                enableSourcePopover
                hideSourceLabel
              />
            )}
          />
        ) : null}

        {!isLoading &&
          !isError &&
          !selectedReport &&
          filteredReports.length === 0 && (
          <p className={isDarkMode ? "text-gray-400" : "text-gray-600"}>
            No reports to show right now.
          </p>
          )}
      </section>
    </>
  );
};

export default Reports;
