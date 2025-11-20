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
}
