/**
 * Houses shared TypeScript contracts for the Redaktionen frontend.
 */
import type { ThemeId } from "../data/themes";

export interface ContentItem {
  id: number | string;
  theme: ThemeId;
  title: string;
  summary: string;
  time: string;
  posterUrl?: string;
  source?: string;
  sourceUrl?: string;
  scope?: string;
  signals?: number;
  sources?: number;
  confidence?: number;
  readingTimeMinutes?: number;
  sourceList?: ReportSource[];
}

export interface ReportSource {
  id: number;
  url: string;
  type: string;
  factor?: string;
  source?: string;
}

export interface Report extends ContentItem {
  lede?: string;
  body: string;
  createdAt: string;
  author?: string;
  type?: string;
  factors?: string[];
  perspective?: string | null;
  sourceList?: ReportSource[];
}
