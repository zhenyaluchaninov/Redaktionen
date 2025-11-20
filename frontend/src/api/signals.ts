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

export const fetchSignals = async (): Promise<ContentItem[]> => {
  const data = await apiClient<SignalApiResponse[]>({ endpoint: "/signals" });

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
