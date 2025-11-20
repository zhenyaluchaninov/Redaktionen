/**
 * Signals page mirrors the original prototype layout and behavior.
 */
import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo, useRef, useState } from "react";
import { fetchSignals } from "../../api/signals";
import { ContentCard } from "../../components/ContentCard/ContentCard";
import { MasonryGrid } from "../../components/MasonryGrid/MasonryGrid";
import { SkeletonMasonryGrid } from "../../components/MasonryGrid/SkeletonMasonryGrid";
import { ThemeFilters } from "../../components/ThemeFilters/ThemeFilters";
import type { ThemeId } from "../../data/themes";
import { useDarkMode } from "../../hooks/useDarkMode";
import type { ContentItem } from "../../types";
import { signalsSection } from "./mockData";

const Signals = () => {
  const { isDarkMode } = useDarkMode();
  const [activeTheme, setActiveTheme] = useState<ThemeId>("all");

  const {
    data: signals = [],
    isLoading,
    isError,
  } = useQuery<ContentItem[]>({
    queryKey: ["signals"],
    queryFn: fetchSignals,
    staleTime: 24 * 60 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  const hasAnimatedOnce = useRef(false);

  const filteredSignals = useMemo(
    () =>
      activeTheme === "all"
        ? signals
        : signals.filter((item) => item.theme === activeTheme),
    [signals, activeTheme]
  );

  const enableAnimations =
    !hasAnimatedOnce.current && !isLoading && filteredSignals.length > 0;

  useEffect(() => {
    if (!isLoading && filteredSignals.length > 0) {
      hasAnimatedOnce.current = true;
    }
  }, [isLoading, filteredSignals.length]);

  const shouldRenderGrid = !isError && filteredSignals.length > 0;

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
        {isLoading && signals.length === 0 && (
          <>
            <p className="sr-only">Loading signals...</p>
            <SkeletonMasonryGrid />
          </>
        )}

        {isError && (
          <p className="text-sm text-red-500">
            Something went wrong while loading signals.
          </p>
        )}

        {shouldRenderGrid ? (
          <MasonryGrid
            items={filteredSignals}
            enableAnimations={enableAnimations}
            renderItem={(item) => (
              <ContentCard
                key={item.id}
                item={item}
                showImage={false}
                linkHref={item.sourceUrl}
                disableSourceChip
              />
            )}
          />
        ) : null}

        {!isLoading && !isError && filteredSignals.length === 0 && (
          <p className={isDarkMode ? "text-gray-400" : "text-gray-600"}>
            No signals to show right now.
          </p>
        )}

      </section>
    </>
  );
};

export default Signals;
