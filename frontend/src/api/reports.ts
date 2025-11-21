/**
 * Fetches reports and adapts them to the shared card format.
 */
import { apiClient } from "./client";
import type { Report } from "../types";
import { formatDate } from "../utils/formatDate";
import { estimateReadingTime } from "../utils/readingTime";
import { mapFactorToTheme } from "../utils/themeMappings";

interface ReportApiResponse {
  id: string;
  created_at: string;
  title: string;
  lede: string;
  body: string;
  posterUrl?: string;
  type?: string;
  factors?: string[];
  perspective?: string | null;
  sources?: Report["sourceList"];
  author?: string;
}

export const fetchReports = async (): Promise<Report[]> => {
  const data = await apiClient<ReportApiResponse[]>({ endpoint: "/reports" });

  return data.map((report) => ({
    id: report.id,
    theme: mapFactorToTheme(report.factors?.[0]),
    title: report.title,
    summary: report.lede,
    lede: report.lede,
    body: report.body,
    createdAt: report.created_at,
    time: formatDate(report.created_at),
    source: report.sources?.[0]?.source,
    sourceUrl: report.sources?.[0]?.url,
    sources: report.sources?.length,
    sourceList: report.sources,
    posterUrl: report.posterUrl,
    factors: report.factors,
    type: report.type,
    author: report.author,
    perspective: report.perspective,
    readingTimeMinutes: estimateReadingTime(
      [report.lede, report.body].filter(Boolean).join(" ")
    ),
  }));
};
