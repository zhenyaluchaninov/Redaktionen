import { useMemo } from "react";
import ReactMarkdown from "react-markdown";
import type { Components } from "react-markdown";
import { useDarkMode } from "../../hooks/useDarkMode";
import type { Report } from "../../types";
import { estimateReadingTime } from "../../utils/readingTime";

type ReportArticleProps = {
  report: Report;
};

const capitalize = (value?: string) => {
  if (!value) return undefined;
  return value.charAt(0).toUpperCase() + value.slice(1);
};

export const ReportArticle = ({ report }: ReportArticleProps) => {
  const { isDarkMode } = useDarkMode();

  const readingTimeMinutes = useMemo(() => {
    if (report.readingTimeMinutes) return report.readingTimeMinutes;
    const totalText = [report.lede ?? report.summary, report.body]
      .filter(Boolean)
      .join(" ");
    return estimateReadingTime(totalText);
  }, [report.body, report.lede, report.readingTimeMinutes, report.summary]);

  const metaTokens = [
    report.author,
    report.time,
    `${readingTimeMinutes} min read`,
    capitalize(report.type),
  ].filter(Boolean);

  const headingColor = isDarkMode ? "text-gray-100" : "text-gray-900";
  const bodyColor = isDarkMode ? "text-gray-200" : "text-gray-800";
  const mutedColor = isDarkMode ? "text-gray-400" : "text-gray-600";

  const components: Components = {
    h2: ({ node, ...props }) => (
      <h2
        className={`text-xl font-semibold mb-3 mt-8 ${headingColor}`}
        {...props}
      />
    ),
    h3: ({ node, ...props }) => (
      <h3
        className={`text-lg font-semibold mb-2 mt-6 ${headingColor}`}
        {...props}
      />
    ),
    p: ({ node, ...props }) => (
      <p className={`mb-4 leading-relaxed ${bodyColor}`} {...props} />
    ),
    ul: ({ node, ...props }) => (
      <ul
        className={`pl-5 mb-4 space-y-2 ${bodyColor} list-disc [&_li::marker]:content-['-'] [&_li::marker]:text-current [&_li::marker]:text-base`}
        {...props}
      />
    ),
    ol: ({ node, ...props }) => (
      <ol
        className={`list-decimal pl-5 mb-4 space-y-2 ${bodyColor}`}
        {...props}
      />
    ),
    li: ({ node, ...props }) => <li className="leading-relaxed" {...props} />,
    a: ({ node, ...props }) => (
      <a
        className="underline decoration-2 underline-offset-2 text-indigo-500 hover:text-indigo-600 transition-colors"
        target="_blank"
        rel="noreferrer"
        {...props}
      />
    ),
    strong: ({ node, ...props }) => (
      <strong className={headingColor} {...props} />
    ),
  };

  return (
    <article
      className={`${
        isDarkMode ? "bg-gray-900 text-gray-100" : "bg-white text-gray-900"
      } rounded-xl border ${
        isDarkMode ? "border-gray-800" : "border-gray-200"
      } p-6 md:p-8 shadow-sm`}
    >
      {report.posterUrl ? (
        <div className="mb-6 overflow-hidden rounded-lg">
          <img
            src={report.posterUrl}
            alt={report.title}
            className="w-full h-auto block"
            loading="lazy"
          />
        </div>
      ) : null}

      <header className="mb-6 space-y-3">
        <h1
          className={`text-3xl font-semibold leading-tight ${headingColor}`}
        >
          {report.title}
        </h1>
        {report.lede ? (
          <p className={`text-lg leading-relaxed ${mutedColor}`}>
            {report.lede}
          </p>
        ) : null}
        {metaTokens.length > 0 ? (
          <p className={`text-sm ${mutedColor}`}>{metaTokens.join(" • ")}</p>
        ) : null}
      </header>

      <div className="max-w-3xl">
        <ReactMarkdown components={components}>{report.body}</ReactMarkdown>
      </div>
    </article>
  );
};
