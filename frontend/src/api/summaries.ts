/**
 * Fetches summaries and adapts them to the shared card format.
 */
import { apiClient } from "./client";
import type { ContentItem } from "../types";
import { formatDate } from "../utils/formatDate";
import { mapFactorToTheme } from "../utils/themeMappings";

interface SummaryApiResponse {
  id: number;
  created_at: string;
  title: string;
  body: string;
  signalId?: number;
  sourceUrl?: string;
  factor?: string;
  date: string;
  scope?: string;
  posterUrl?: string;
}

const extractSourceName = (url?: string): string | undefined => {
  if (!url) {
    return undefined;
  }

  try {
    const hostname = new URL(url).hostname.replace(/^www\./, "");
    return hostname;
  } catch {
    return undefined;
  }
};

export const fetchSummaries = async (): Promise<ContentItem[]> => {
  const data = await apiClient<SummaryApiResponse[]>({ endpoint: "/summaries" });

  return data.map((summary) => ({
    id: summary.id,
    theme: mapFactorToTheme(summary.factor),
    title: summary.title,
    summary: summary.body,
    time: formatDate(summary.date ?? summary.created_at),
    source: extractSourceName(summary.sourceUrl) ?? summary.scope,
    sourceUrl: summary.sourceUrl,
    scope: summary.scope,
    posterUrl: summary.posterUrl,
  }));
};
