/**
 * Houses shared TypeScript contracts for the Redaktionen frontend.
 */
import type { ThemeId } from "../data/themes";

export interface ContentItem {
  id: number;
  theme: ThemeId;
  title: string;
  summary: string;
  time: string;
  source?: string;
  signals?: number;
  sources?: number;
  confidence?: number;
}
