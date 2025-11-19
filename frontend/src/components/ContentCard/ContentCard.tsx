/**
 * Rich card component that mirrors the prototype design pixel-for-pixel.
 */
import { themes } from "../../data/themes";
import { useDarkMode } from "../../hooks/useDarkMode";
import type { ContentItem } from "../../types";
import { getColorClasses } from "../../utils/getColorClasses";
import { getThemeColor } from "../../utils/getThemeColor";

type ContentCardProps = {
  item: ContentItem;
};

const PlaceholderSVG = ({ isDarkMode }: { isDarkMode: boolean }) => (
  <svg viewBox="0 0 400 180" className="w-full h-auto rounded-lg mb-4">
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

export const ContentCard = ({ item }: ContentCardProps) => {
  const { isDarkMode } = useDarkMode();
  const color = getThemeColor(item.theme);
  const themeName = themes.find((theme) => theme.id === item.theme)?.name;

  return (
    <article
      className={`${
        isDarkMode
          ? "bg-gray-900 border-gray-800 hover:border-gray-700"
          : "bg-white border-gray-200 hover:border-gray-300"
      } border rounded-xl p-5 cursor-pointer transition-all hover:shadow-lg mb-5`}
    >
      <PlaceholderSVG isDarkMode={isDarkMode} />

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
        {item.summary}
      </p>

      <div
        className={`flex items-center gap-4 text-xs ${
          isDarkMode ? "text-gray-500" : "text-gray-400"
        }`}
      >
        {item.source && <span>{item.source}</span>}
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
        {item.confidence && (
          <span
            className={`flex items-center gap-1 ml-auto px-2 py-0.5 rounded ${
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
    </article>
  );
};
