/**
 * Fetches signals feed from the API and maps them to ContentItem entries.
 */
import { apiClient } from "./client";
import type { ContentItem } from "../types";
import { formatDate } from "../utils/formatDate";
import { mapFactorToTheme } from "../utils/themeMappings";

interface SignalApiResponse {
  id: number;
  created_at: string;
  title: string;
  summary: string;
  source?: string;
  sourceUrl?: string;
  date: string;
  factor?: string;
}

export interface FetchSignalsOptions {
  factor?: string;
}

export const fetchSignals = async (
  options?: FetchSignalsOptions
): Promise<ContentItem[]> => {
  const searchParams = new URLSearchParams();
  if (options?.factor) {
    searchParams.append("factor", options.factor);
  }

  const query = searchParams.toString();
  const endpoint = `/signals${query ? `?${query}` : ""}`;

  const data = await apiClient<SignalApiResponse[]>({ endpoint });

  return data.map((signal) => ({
    id: signal.id,
    theme: mapFactorToTheme(signal.factor),
    title: signal.title,
    summary: signal.summary,
    time: formatDate(signal.date ?? signal.created_at),
    source: signal.source ?? undefined,
    sourceUrl: signal.sourceUrl,
  }));
};
