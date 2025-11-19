/**
 * Shared theme configuration used across filters and cards.
 */
export type ThemeColor =
  | "magenta"
  | "red"
  | "cyan"
  | "blue"
  | "violet"
  | "green"
  | "amber"
  | "gray";

export type ThemeId =
  | "all"
  | "politics"
  | "economy"
  | "social"
  | "tech"
  | "ecology"
  | "law";

export interface ThemeOption {
  id: ThemeId;
  name: string;
  color: ThemeColor;
}

export const themes: ThemeOption[] = [
  { id: "all", name: "All", color: "magenta" },
  { id: "politics", name: "Politics", color: "red" },
  { id: "economy", name: "Economy", color: "cyan" },
  { id: "social", name: "Society", color: "blue" },
  { id: "tech", name: "Technology", color: "violet" },
  { id: "ecology", name: "Climate", color: "green" },
  { id: "law", name: "Legal", color: "amber" },
];
