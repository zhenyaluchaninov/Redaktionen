import { Fragment, useEffect, useMemo, useState, type ReactNode } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import type { ThemeId, ThemeOption } from "../../data/themes";
import { themes } from "../../data/themes";
import { useDarkMode } from "../../hooks/useDarkMode";
import { getColorClasses } from "../../utils/getColorClasses";
import { getArrowVariants } from "./animations";

type IconProps = {
  className?: string;
};

type AgentChannel = {
  label: string;
  type: "RSS" | "Email";
};

type AgentProfile = {
  name: string;
  title: string;
  bio: string;
  modelNote?: string;
  prompt?: string;
  channels?: AgentChannel[];
  themeFocus?: ThemeId[];
};

type PipelineStep = {
  id: string;
  title: string;
  summary: string;
  icon: ReactNode;
  metric?: {
    value: number;
    label?: string;
  };
  showThemes?: boolean;
  agent?: AgentProfile;
};

const BustIcon = ({ className }: IconProps) => (
  <svg
    className={className ?? "w-6 h-6"}
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <ellipse cx="16" cy="11" rx="6" ry="7" stroke="currentColor" strokeWidth="2" />
    <ellipse cx="16" cy="24" rx="10" ry="5.5" stroke="currentColor" strokeWidth="2" />
  </svg>
);

const RssIcon = ({ className }: IconProps) => (
  <svg
    className={`w-5 h-5 ${className ?? ""}`}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M6 5c7.18 0 13 5.82 13 13M6 11a7 7 0 017 7m-6 0a1 1 0 11-2 0 1 1 0 012 0z"
    />
  </svg>
);

const DocumentIcon = ({ className }: IconProps) => (
  <svg
    className={`w-5 h-5 ${className ?? ""}`}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
    />
  </svg>
);

const NewspaperIcon = ({ className }: IconProps) => (
  <svg
    className={`w-5 h-5 ${className ?? ""}`}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
    />
  </svg>
);

const MailIcon = ({ className }: IconProps) => (
  <svg
    className={`w-4 h-4 ${className ?? ""}`}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
    />
  </svg>
);

const pipelineSteps: PipelineStep[] = [
  {
    id: "sources",
    title: "Sources",
    summary: "RSS feeds and email newsletters ingested continuously.",
    icon: <RssIcon />,
    metric: { value: 12, label: "active" },
  },
  {
    id: "tipster",
    title: "Tipster agent",
    summary:
      "Filters, deduplicates, and tags new items by theme before they turn into signals.",
    icon: <BustIcon />,
    showThemes: true,
    agent: {
      name: "Greger Palki",
      title: "Politics tipster",
      bio: "Monitors Swedish and EU policy streams, catching committee notes, pressers, and opinion swings early.",
      channels: [
        { label: "Government press releases", type: "RSS" },
        { label: "European Parliament briefings", type: "RSS" },
        { label: "Ministry newsletters", type: "Email" },
      ],
      modelNote: "Model: GPT-5-mini",
      prompt:
        "Keep only actionable political moves, tag affected policy areas, and surface signals with plain-language context.",
      themeFocus: ["politics", "law"],
    },
  },
  {
    id: "signals",
    title: "Signals",
    summary: "Raw news cards ready for tagging, triaged in chronological order.",
    icon: <DocumentIcon />,
    metric: { value: 247, label: "queued" },
  },
  {
    id: "correspondent",
    title: "Correspondent agent",
    summary:
      "Adds context, verifies sources, and drafts lean abstracts with theme coverage.",
    icon: <BustIcon />,
    showThemes: true,
    agent: {
      name: "Alexandra Strom",
      title: "Politics correspondent",
      bio: "15 years covering EU policy and international relations; writes concise explainers on why a signal matters.",
      modelNote: "Model: GPT-5-mini",
      prompt:
        "Cluster matching signals, outline background, and produce two-sentence abstracts with potential impact.",
      themeFocus: ["politics", "economy", "social"],
    },
  },
  {
    id: "summaries",
    title: "Summaries",
    summary: "Crisp abstracts ready for editorial review.",
    icon: <DocumentIcon />,
    metric: { value: 156, label: "ready" },
  },
  {
    id: "editor",
    title: "Editor agent",
    summary:
      "Synthesizes summaries, checks claims, and enforces the newsroom tone.",
    icon: <BustIcon />,
    agent: {
      name: "Ruben Razz",
      title: "PESTEL editor",
      bio: "Assembles sources, verifies facts, and shapes balanced story arcs with supporting quotes.",
      modelNote: "Model: GPT-5",
      prompt:
        "Rewrite drafts into newsroom-ready reports, note evidence, and call out missing context to request follow-ups.",
      themeFocus: ["tech", "economy", "law", "ecology"],
    },
  },
  {
    id: "reports",
    title: "Reports",
    summary: "Publish-ready articles delivered to News and Research pages.",
    icon: <NewspaperIcon />,
    metric: { value: 6, label: "live now" },
  },
];

const AgentAvatar = () => (
  <div className="w-12 h-12 rounded-full flex items-center justify-center text-gray-500">
    <BustIcon className="w-8 h-8" />
  </div>
);

type PipelineStepCardProps = {
  step: PipelineStep;
  delayMs: number;
  themeLegend: ThemeOption[];
  isDarkMode: boolean;
};

const PipelineStepCard = ({
  step,
  delayMs,
  themeLegend,
  isDarkMode,
}: PipelineStepCardProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setIsVisible(true), delayMs);
    return () => window.clearTimeout(timer);
  }, [delayMs]);

  const heading = isDarkMode ? "text-gray-100" : "text-gray-900";
  const body = isDarkMode ? "text-gray-300" : "text-gray-700";
  const muted = isDarkMode ? "text-gray-500" : "text-gray-500";
  const chipBg = isDarkMode
    ? "bg-gray-800 text-gray-200"
    : "bg-gray-100 text-gray-700";
  const hasAgent = Boolean(step.agent);

  const cardBackground = isDarkMode ? "bg-gray-900" : "bg-white";
  const cardBorder =
    hasAgent && !isDarkMode
      ? "border border-transparent"
      : hasAgent && isDarkMode
      ? "border border-transparent"
      : isDarkMode
      ? "border border-gray-800"
      : "border border-gray-200";
  const gradientBorderStyle = hasAgent
    ? {
        backgroundImage: `linear-gradient(${isDarkMode ? "#111827" : "#ffffff"}, ${
          isDarkMode ? "#111827" : "#ffffff"
        }), linear-gradient(135deg, #A855F7 0%, #EC4899 100%)`,
        backgroundOrigin: "border-box",
        backgroundClip: "padding-box, border-box",
      }
    : undefined;

  return (
    <article
      className={`w-full max-w-[440px] md:max-w-[460px] mx-auto transition-all duration-500 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
      }`}
    >
      <div
        className={`${cardBackground} ${cardBorder} rounded-xl shadow-sm p-4`}
        style={gradientBorderStyle}
      >
        <div className="flex items-start gap-3">
          <div
            className={`w-11 h-11 rounded-lg flex items-center justify-center ${
              isDarkMode ? "bg-gray-800 text-gray-100" : "bg-gray-100 text-gray-700"
            }`}
          >
            {step.icon}
          </div>

          <div className="flex-1 space-y-2">
            <div className="flex items-center gap-2">
              <h3 className={`text-base font-semibold leading-none ${heading}`}>
                {step.title}
              </h3>
              {step.showThemes ? (
                <div className="flex items-center gap-1 ml-1">
                  {themeLegend.slice(0, 6).map((theme) => (
                    <span
                      key={theme.id}
                      className={`w-1.5 h-1.5 rounded-full ${getColorClasses(
                        theme.color,
                        "bg"
                      )}`}
                    />
                  ))}
                </div>
              ) : null}
            </div>
            <p className={`text-sm leading-snug ${body}`}>{step.summary}</p>
          </div>

          {step.metric ? (
            <div className="text-right ml-2">
              <p className={`text-xl font-semibold ${heading}`}>
                {step.metric.value}
              </p>
              {step.metric.label ? (
                <p className={`text-sm ${muted}`}>{step.metric.label}</p>
              ) : null}
            </div>
          ) : null}
        </div>

        {step.agent ? (
          <div
            className={`mt-2 pt-2 border-t ${
              isDarkMode ? "border-gray-800" : "border-gray-100"
            }`}
          >
            <div className="flex justify-center">
              <button
                type="button"
                onClick={() => setExpanded((prev) => !prev)}
                className={`inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-normal ${
                  isDarkMode
                    ? "text-gray-400 hover:text-gray-300"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {expanded ? "Hide agent details" : "Show agent details"}
                {expanded ? (
                  <ChevronUpIcon className="w-4 h-4" />
                ) : (
                  <ChevronDownIcon className="w-4 h-4" />
                )}
              </button>
            </div>

            {expanded ? (
              <div className="mt-2 space-y-3 text-start">
                <div className="flex items-start gap-3">
                  <AgentAvatar />
                  <div>
                    <p className={`text-base font-semibold ${heading}`}>
                      {step.agent.name}
                    </p>
                    <p className={`text-sm ${muted}`}>{step.agent.title}</p>
                  </div>
                </div>

                <p className={`text-sm leading-snug ${body}`}>
                  {step.agent.bio}
                </p>

                {step.agent.themeFocus && step.agent.themeFocus.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {step.agent.themeFocus.map((themeId) => {
                      const theme = themeLegend.find((item) => item.id === themeId);
                      if (!theme) return null;
                      return (
                        <span
                          key={theme.id}
                          className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${chipBg}`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${getColorClasses(
                              theme.color,
                              "bg"
                            )}`}
                          />
                          {theme.name}
                        </span>
                      );
                    })}
                  </div>
                ) : null}

                {step.agent.channels && step.agent.channels.length > 0 ? (
                  <div className="grid gap-2">
                    {step.agent.channels.map((channel) => (
                      <div
                        key={`${channel.label}-${channel.type}`}
                        className={`flex items-center gap-2 px-3 py-2 rounded-lg border ${
                          isDarkMode
                            ? "border-gray-800 bg-gray-900"
                            : "border-gray-200 bg-gray-50"
                        }`}
                      >
                        {channel.type === "RSS" ? (
                          <RssIcon className="w-4 h-4" />
                        ) : (
                          <MailIcon className="w-4 h-4" />
                        )}
                        <span
                          className={`text-sm ${
                            isDarkMode ? "text-gray-100" : "text-gray-800"
                          }`}
                        >
                          {channel.label}
                        </span>
                        <span
                          className={`ml-auto text-xs px-2 py-0.5 rounded-full border ${
                            isDarkMode
                              ? "border-gray-700 bg-gray-800 text-gray-300"
                              : "border-gray-200 bg-white text-gray-500"
                          }`}
                        >
                          {channel.type}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : null}

                {step.agent.modelNote ? (
                  <div
                    className={`inline-flex items-center gap-2 text-xs font-medium px-3 py-2 rounded-lg ${chipBg}`}
                  >
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ background: "linear-gradient(135deg, #A855F7 0%, #EC4899 100%)" }}
                    />
                    {step.agent.modelNote}
                  </div>
                ) : null}

                {step.agent.prompt ? (
                  <div
                    className={`border rounded-xl p-3 ${
                      isDarkMode
                        ? "bg-gray-900 border-gray-800"
                        : "bg-gray-50 border-gray-200"
                    }`}
                  >
                    <p
                      className={`text-xs uppercase font-semibold tracking-wide mb-1 ${muted}`}
                    >
                      System directive
                    </p>
                    <p
                      className={`text-sm leading-snug ${
                        isDarkMode ? "text-gray-200" : "text-gray-800"
                      }`}
                    >
                      {step.agent.prompt}
                    </p>
                  </div>
                ) : null}
              </div>
            ) : null}
          </div>
        ) : null}
      </div>
    </article>
  );
};

type ArrowConnectorProps = {
  isActive: boolean;
};

const ArrowConnector = ({ isActive }: ArrowConnectorProps) => {
  const variants = getArrowVariants(isActive);

  return (
    <div className="flex justify-center py-1">
      <motion.svg
        width="26"
        height="10"
        viewBox="0 0 26 10"
        variants={variants}
        initial="initial"
        animate="animate"
        aria-hidden="true"
      >
        <polygon points="13,10 2,2 24,2" fill="currentColor" />
      </motion.svg>
    </div>
  );
};

const Home = () => {
  const { isDarkMode } = useDarkMode();
  const themeLegend = useMemo(
    () => themes.filter((theme) => theme.id !== "all"),
    []
  );
  const totalConnectors = pipelineSteps.length - 1;
  const [activeArrowIndex, setActiveArrowIndex] = useState(0);

  useEffect(() => {
    if (totalConnectors <= 0) return;

    const intervalMs = 2300;
    const intervalId = window.setInterval(() => {
      setActiveArrowIndex((prev) => (prev + 1) % totalConnectors);
    }, intervalMs);

    return () => window.clearInterval(intervalId);
  }, [totalConnectors]);

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <section className="text-center mb-6">
        <h1
          className={`text-3xl font-semibold ${
            isDarkMode ? "text-gray-100" : "text-gray-900"
          }`}
        >
          Redaktionen AI newsroom pipeline
        </h1>
        <p
          className={`mt-2 text-sm leading-relaxed ${
            isDarkMode ? "text-gray-400" : "text-gray-600"
          }`}
        >
          A compact walkthrough from sources to publish-ready reports, mirroring the prototype pipeline.
        </p>
      </section>

      <section className="mt-10 space-y-2 flex flex-col items-center">
        {pipelineSteps.map((step, index) => (
          <Fragment key={step.id}>
            <PipelineStepCard
              step={step}
              delayMs={index * 90}
              themeLegend={themeLegend}
              isDarkMode={isDarkMode}
            />
            {index < pipelineSteps.length - 1 ? (
              <ArrowConnector isActive={index === activeArrowIndex} />
            ) : null}
          </Fragment>
        ))}
      </section>

      <p
        className={`mt-8 text-center text-sm ${
          isDarkMode ? "text-gray-500" : "text-gray-500"
        }`}
      >
        Use "Show agent details" to expand prompts, channels, and theme focus for
        each AI colleague.
      </p>
    </div>
  );
};

export default Home;
