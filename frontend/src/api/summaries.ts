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

export interface FetchSummariesOptions {
  factor?: string;
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

export const fetchSummaries = async (
  options?: FetchSummariesOptions
): Promise<ContentItem[]> => {
  const searchParams = new URLSearchParams();
  if (options?.factor) {
    searchParams.append("factor", options.factor);
  }

  const query = searchParams.toString();
  const endpoint = `/summaries${query ? `?${query}` : ""}`;

  const data = await apiClient<SummaryApiResponse[]>({ endpoint });

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
