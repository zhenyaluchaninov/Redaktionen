import type { ContentItem } from "../../types";

export const summariesSection = {
  title: "Summaries",
  description:
    "Condensed briefings produced by Correspondent agents. Each summary synthesizes multiple signals, verifies facts across sources, and presents key insights in a structured, readable format.",
};

export const summariesContent: ContentItem[] = [
  {
    id: 1,
    theme: "tech",
    title: "EU AI Transparency Framework Takes Shape",
    summary:
      "Multiple signals indicate the European Commission is finalizing comprehensive disclosure requirements for AI systems used in media and public communications.",
    signals: 8,
    time: "1h ago",
  },
  {
    id: 2,
    theme: "economy",
    title: "Central Bank Coordination Discussions Intensify",
    summary:
      "G7 monetary authorities increasingly aligned on need for coordinated approach to rate adjustments. December meetings may produce joint framework.",
    signals: 12,
    time: "2h ago",
  },
  {
    id: 3,
    theme: "politics",
    title: "German Coalition Negotiations: Current State",
    summary:
      "Third round of talks focusing on fiscal policy disagreements. Climate spending and debt brake reform remain key sticking points.",
    signals: 15,
    time: "3h ago",
  },
  {
    id: 4,
    theme: "ecology",
    title: "Arctic Conditions: November Assessment",
    summary:
      "Latest satellite data confirms continued decline in sea ice extent. Scientists note acceleration in seasonal melt patterns compared to previous decade.",
    signals: 6,
    time: "4h ago",
  },
  {
    id: 5,
    theme: "law",
    title: "Digital Privacy Litigation: European Overview",
    summary:
      "Pending ECHR ruling expected to establish new standards for governmental surveillance across EU member states.",
    signals: 5,
    time: "5h ago",
  },
  {
    id: 6,
    theme: "social",
    title: "Mediterranean Migration: Q3 Patterns",
    summary:
      "UNHCR quarterly data reveals significant route changes. Tunisian departure points now account for majority of crossings.",
    signals: 9,
    time: "6h ago",
  },
];
