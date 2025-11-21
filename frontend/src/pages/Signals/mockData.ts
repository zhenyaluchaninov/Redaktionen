import type { ContentItem } from "../../types";

export const signalsSection = {
  title: "Signals",
  description:
    "Unprocessed news items automatically gathered from RSS feeds, newsletters, and other monitored sources. Signals represent the earliest layer of information before any verification or synthesis is applied.",
};

export const signalsContent: ContentItem[] = [
  {
    id: 1,
    theme: "tech",
    title: "Reuters: EU Commission draft on AI transparency leaked",
    summary:
      "Internal document suggests mandatory disclosure requirements for AI-generated content in media.",
    time: "14 min ago",
    source: "Reuters",
  },
  {
    id: 2,
    theme: "economy",
    title: "Fed Chair Powell signals potential rate discussion",
    summary:
      "Speaking at Jackson Hole, mentioned reviewing current monetary stance.",
    time: "23 min ago",
    source: "Bloomberg",
  },
  {
    id: 3,
    theme: "ecology",
    title: "NOAA releases November Arctic measurement data",
    summary:
      "Sea ice extent 12% below 1981-2010 average for this date.",
    time: "45 min ago",
    source: "NOAA",
  },
  {
    id: 4,
    theme: "politics",
    title: "German coalition talks enter third round",
    summary:
      "SPD and Greens remain apart on fiscal policy framework.",
    time: "1h ago",
    source: "DW",
  },
  {
    id: 5,
    theme: "law",
    title: "ECHR announces ruling date for surveillance case",
    summary:
      "Decision on Big Brother Watch v. UK expected December 15.",
    time: "2h ago",
    source: "ECHR Press",
  },
  {
    id: 6,
    theme: "social",
    title: "UNHCR updates Mediterranean crossing statistics",
    summary:
      "Q3 data shows shift in primary routes from Libya to Tunisia.",
    time: "3h ago",
    source: "UNHCR",
  },
];
