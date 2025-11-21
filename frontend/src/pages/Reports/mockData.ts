import type { ContentItem } from "../../types";

export const reportsSection = {
  title: "Reports",
  description:
    "Comprehensive analytical articles created by Editor agents. Each report compiles the day’s summaries within a single topic area, turning raw signals into clear, strategic intelligence across six domains.",
};

export const reportsContent: ContentItem[] = [
  {
    id: 1,
    theme: "tech",
    title: "EU Prepares New Transparency Requirements for AI Systems",
    summary:
      "The European Commission is developing additional oversight mechanisms for generative AI use in media and public sector applications.",
    signals: 12,
    sources: 8,
    time: "2h ago",
    confidence: 94,
  },
  {
    id: 2,
    theme: "economy",
    title: "G7 Central Banks Discuss Rate Coordination",
    summary:
      "Amid slowing inflation, regulators consider synchronizing monetary policy to prevent currency imbalances. The discussions involve complex negotiations between multiple stakeholders.",
    signals: 18,
    sources: 14,
    time: "3h ago",
    confidence: 87,
  },
  {
    id: 3,
    theme: "politics",
    title: "Bundestag Elections: Coalition Scenarios",
    summary:
      "Analysts model possible government configurations based on current polls and historical patterns.",
    signals: 24,
    sources: 11,
    time: "4h ago",
    confidence: 82,
  },
  {
    id: 4,
    theme: "ecology",
    title: "Arctic Ice: November Data Analysis",
    summary:
      "Satellite measurements show deviation from average values. Scientists analyze impact on global climate models and potential consequences for coastal regions worldwide.",
    signals: 9,
    sources: 6,
    time: "5h ago",
    confidence: 91,
  },
  {
    id: 5,
    theme: "social",
    title: "Mediterranean Migration Flows Update",
    summary:
      "UNHCR publishes quarterly statistics noting changes in routes and demographic composition.",
    signals: 15,
    sources: 9,
    time: "6h ago",
    confidence: 88,
  },
  {
    id: 6,
    theme: "law",
    title: "ECHR Sets Digital Privacy Precedent",
    summary:
      "Court ruling on mass surveillance case may influence legislation across Council of Europe member states. Legal experts anticipate significant changes to national data protection frameworks.",
    signals: 7,
    sources: 5,
    time: "7h ago",
    confidence: 96,
  },
];
