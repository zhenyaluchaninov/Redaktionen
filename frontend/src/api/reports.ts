/**
 * Fetches reports and adapts them to the shared card format.
 */
import { apiClient } from "./client";
import type { ContentItem } from "../types";
import { formatDate } from "../utils/formatDate";
import { mapFactorToTheme } from "../utils/themeMappings";

interface ReportSource {
  id: number;
  url: string;
  type: string;
  factor?: string;
  source?: string;
}

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
  sources?: ReportSource[];
}

export const fetchReports = async (): Promise<ContentItem[]> => {
  const data = await apiClient<ReportApiResponse[]>({ endpoint: "/reports" });

  return data.map((report) => ({
    id: report.id,
    theme: mapFactorToTheme(report.factors?.[0]),
    title: report.title,
    summary: report.lede,
    time: formatDate(report.created_at),
    source: report.sources?.[0]?.source,
    sources: report.sources?.length,
    posterUrl: report.posterUrl,
  }));
};
