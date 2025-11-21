/**
 * Rich card component that mirrors the prototype design pixel-for-pixel.
 */
import { useState, type MouseEvent } from "react";
import {
  ArchiveBoxIcon,
  GlobeAltIcon,
  XMarkIcon,
  ArrowTopRightOnSquareIcon,
} from "@heroicons/react/24/outline";
import { themes } from "../../data/themes";
import { useDarkMode } from "../../hooks/useDarkMode";
import type { ContentItem } from "../../types";
import { getColorClasses } from "../../utils/getColorClasses";
import { getThemeColor } from "../../utils/getThemeColor";

type ContentCardProps = {
  item: ContentItem;
  showImage?: boolean;
  linkHref?: string;
  disableSourceChip?: boolean;
  onClick?: () => void;
  enableSourcePopover?: boolean;
  hideSourceLabel?: boolean;
};

const PlaceholderSVG = ({ isDarkMode }: { isDarkMode: boolean }) => (
  <svg viewBox="0 0 400 180" className="w-full h-auto rounded-lg">
    <rect width="400" height="180" fill={isDarkMode ? "#1F2937" : "#F3F4F6"} />
    <rect
      x="20"
      y="20"
      width="70"
      height="70"
      rx="8"
      fill={isDarkMode ? "#374151" : "#E5E7EB"}
    />
    <rect
      x="110"
      y="25"
      width="200"
      height="8"
      rx="4"
      fill={isDarkMode ? "#374151" : "#E5E7EB"}
    />
    <rect
      x="110"
      y="45"
      width="160"
      height="8"
      rx="4"
      fill={isDarkMode ? "#374151" : "#E5E7EB"}
    />
    <rect
      x="110"
      y="65"
      width="120"
      height="8"
      rx="4"
      fill={isDarkMode ? "#374151" : "#E5E7EB"}
    />
    <rect
      x="20"
      y="110"
      width="360"
      height="6"
      rx="3"
      fill={isDarkMode ? "#374151" : "#E5E7EB"}
    />
    <rect
      x="20"
      y="130"
      width="300"
      height="6"
      rx="3"
      fill={isDarkMode ? "#374151" : "#E5E7EB"}
    />
    <rect
      x="20"
      y="150"
      width="200"
      height="6"
      rx="3"
      fill={isDarkMode ? "#374151" : "#E5E7EB"}
    />
  </svg>
);

export const ContentCard = ({
  item,
  showImage = true,
  linkHref,
  disableSourceChip = false,
  onClick,
  enableSourcePopover = false,
  hideSourceLabel = false,
}: ContentCardProps) => {
  const { isDarkMode } = useDarkMode();
  const color = getThemeColor(item.theme);
  const themeName = themes.find((theme) => theme.id === item.theme)?.name;
  const [imageFailed, setImageFailed] = useState(false);
  const [showSourcesPopover, setShowSourcesPopover] = useState(false);

  const truncateSummary = (text: string, limit = 220) => {
    if (text.length <= limit) return text;
    const sliced = text.slice(0, limit);
    const lastSpace = sliced.lastIndexOf(" ");
    const safeCut = lastSpace > 0 ? sliced.slice(0, lastSpace) : sliced;
    return `${safeCut.trimEnd()}…`;
  };

  const shouldShowPoster = showImage && item.posterUrl && !imageFailed;

  const focusRingClasses = isDarkMode
    ? "focus-visible:ring-gray-500 focus-visible:ring-offset-gray-900"
    : "focus-visible:ring-gray-400 focus-visible:ring-offset-white";

  const wrapperClassName = `block w-full text-left no-underline focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${focusRingClasses}`;

  const Wrapper: React.ComponentType<{ children: React.ReactNode }> = linkHref
    ? ({ children }) => (
        <a
          href={linkHref}
          target="_blank"
          rel="noreferrer"
          className={wrapperClassName}
        >
          {children}
        </a>
      )
    : onClick
    ? ({ children }) => (
        <div
          role="button"
          tabIndex={0}
          onClick={onClick}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              onClick();
            }
          }}
          className={wrapperClassName}
        >
          {children}
        </div>
      )
    : ({ children }) => <>{children}</>;

  const primaryTextColor = isDarkMode ? "text-gray-500" : "text-gray-400";
  const secondaryTextColor = isDarkMode ? "text-gray-200" : "text-gray-400";

  const sources = item.sourceList ?? [];
  const sourceCount =
    sources.length > 0 ? sources.length : item.sources ?? sources.length;

  const toggleSourcesPopover = (e: MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setShowSourcesPopover((prev) => !prev);
  };

  const closePopover = () => setShowSourcesPopover(false);

  return (
    <Wrapper>
      <article
        className={`${
          isDarkMode
            ? "bg-gray-900 border-gray-800 hover:border-gray-700"
            : "bg-white border-gray-200 hover:border-gray-300"
        } border rounded-xl p-5 cursor-pointer transition-all hover:shadow-lg mb-5`}
      >
      {showImage ? (
        <div
          className={`mb-4 overflow-hidden rounded-lg ${
            isDarkMode ? "bg-gray-800" : "bg-gray-100"
          }`}
        >
          {shouldShowPoster ? (
            <img
              src={item.posterUrl}
              alt={item.title}
              className="w-full h-auto block"
              loading="lazy"
              onError={() => setImageFailed(true)}
            />
          ) : (
            <PlaceholderSVG isDarkMode={isDarkMode} />
          )}
        </div>
      ) : null}

      <div className="flex items-center gap-2 mb-3">
        <span
          className={`w-2 h-2 rounded-full ${getColorClasses(color, "bg")}`}
        ></span>
        <span
          className={`text-xs font-medium ${getColorClasses(color, "text")}`}
        >
          {themeName}
        </span>
        <span
          className={`text-xs ${
            isDarkMode ? "text-gray-500" : "text-gray-400"
          } ml-auto`}
        >
          {item.time}
        </span>
      </div>

      <h3
        className={`text-base font-semibold mb-2 ${
          isDarkMode ? "text-gray-100" : "text-gray-900"
        }`}
      >
        {item.title}
      </h3>

      <p
        className={`text-sm mb-4 leading-relaxed ${
          isDarkMode ? "text-gray-400" : "text-gray-600"
        }`}
      >
        {truncateSummary(item.summary)}
      </p>

      {!enableSourcePopover ? (
        <div
          className={`flex items-center gap-4 flex-wrap text-xs ${
            isDarkMode ? "text-gray-500" : "text-gray-400"
          }`}
        >
          {item.source && !disableSourceChip && !linkHref && !hideSourceLabel && (
            item.sourceUrl ? (
              <a
                href={item.sourceUrl}
                target="_blank"
                rel="noreferrer"
                className={`inline-flex items-center gap-1 px-2 py-1 rounded-full border transition-colors ${
                  isDarkMode
                    ? "border-gray-700/80 bg-gray-800 text-gray-200 hover:bg-gray-700"
                    : "border-[rgb(237,237,237)] bg-gray-50 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {item.source}
              </a>
            ) : (
              <span>{item.source}</span>
            )
          )}
          {item.source &&
            (disableSourceChip || linkHref || hideSourceLabel) && (
              <span className={isDarkMode ? "text-gray-200" : "text-gray-400"}>
                {item.source}
              </span>
            )}

          {item.signals && (
            <span className="flex items-center gap-1">
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
              {item.signals} signals
            </span>
          )}
          {item.sources && (
            <span className="flex items-center gap-1">
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                />
              </svg>
              {item.sources} sources
            </span>
          )}

          <div className="flex items-center gap-3 ml-auto">
            {item.scope && (
              <span
                className={`inline-flex items-center gap-1 ${
                  isDarkMode ? "text-gray-400" : "text-gray-500"
                }`}
              >
                <GlobeAltIcon className="w-4 h-4 text-gray-400" />
                {item.scope}
              </span>
            )}

            {item.confidence && (
              <span
                className={`flex items-center gap-1 px-2 py-0.5 rounded ${
                  item.confidence >= 90
                    ? isDarkMode
                      ? "bg-emerald-900/30 text-emerald-400"
                      : "bg-emerald-50 text-emerald-600"
                    : item.confidence >= 80
                    ? isDarkMode
                      ? "bg-amber-900/30 text-amber-400"
                      : "bg-amber-50 text-amber-600"
                    : isDarkMode
                    ? "bg-red-900/30 text-red-400"
                    : "bg-red-50 text-red-600"
                }`}
              >
                {item.confidence}%
              </span>
            )}
          </div>
        </div>
      ) : (
        <div
          className={`relative flex items-center gap-4 text-xs ${primaryTextColor}`}
        >
          <div className="relative">
            <button
              type="button"
              onClick={toggleSourcesPopover}
              className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border transition-colors ${
                isDarkMode
                  ? "border-gray-800 bg-gray-800 text-gray-200 hover:bg-gray-700"
                  : "border-gray-200 bg-gray-100 text-gray-500 hover:bg-gray-200"
              }`}
            >
              <ArchiveBoxIcon className="w-4 h-4" />
              {sourceCount ? `${sourceCount} sources` : "Sources"}
            </button>

            {showSourcesPopover && sourceCount > 0 ? (
              <div
                className={`absolute left-0 bottom-12 z-20 w-64 rounded-lg border shadow-lg ${
                  isDarkMode
                    ? "bg-gray-900 border-gray-800"
                    : "bg-white border-gray-200"
                }`}
              >
                <div className="p-3">
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <p className={`text-xs uppercase ${primaryTextColor}`}>
                      Sources
                    </p>
                    <button
                      type="button"
                      aria-label="Close sources list"
                      onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        closePopover();
                      }}
                      className={`p-1 rounded ${
                        isDarkMode
                          ? "bg-gray-800 text-gray-200 hover:bg-gray-700"
                          : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                      }`}
                    >
                      <XMarkIcon className="w-4 h-4" />
                    </button>
                  </div>
                  <ul className="mt-2 space-y-2">
                    {sources.map((src) => (
                      <li key={src.id} className="leading-relaxed">
                        <a
                          href={src.url}
                          target="_blank"
                          rel="noreferrer"
                          className={`block text-sm font-medium ${
                            isDarkMode ? "text-gray-100" : "text-gray-800"
                          } hover:underline flex items-center gap-2`}
                          onClick={(e) => e.stopPropagation()}
                        >
                          {src.source ?? src.url}
                          <ArrowTopRightOnSquareIcon className="w-3.5 h-3.5" />
                        </a>
                        {src.factor ? (
                          <span
                            className={`text-xs ${secondaryTextColor} block`}
                          >
                            {src.factor}
                          </span>
                        ) : null}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : null}
          </div>

          {item.readingTimeMinutes ? (
            <span className="flex items-center gap-2 ml-auto">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              {item.readingTimeMinutes} min read
            </span>
          ) : null}
        </div>
      )}

      {showSourcesPopover ? (
        <div
          className="fixed inset-0 z-10 bg-transparent"
          onClick={(e) => {
            e.stopPropagation();
            closePopover();
          }}
          aria-hidden="true"
        />
      ) : null}
      </article>
    </Wrapper>
  );
};
