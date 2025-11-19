import type { ThemeId } from "../data/themes";

type ApiFactor =
  | "political"
  | "economic"
  | "social"
  | "technological"
  | "environmental"
  | "legal";

const themeToFactorMap: Partial<Record<ThemeId, ApiFactor>> = {
  politics: "political",
  economy: "economic",
  social: "social",
  tech: "technological",
  ecology: "environmental",
  law: "legal",
};

const factorToThemeMap: Record<ApiFactor, ThemeId> = {
  political: "politics",
  economic: "economy",
  social: "social",
  technological: "tech",
  environmental: "ecology",
  legal: "law",
};

export const mapThemeToFactor = (themeId: ThemeId): ApiFactor | undefined => {
  if (themeId === "all") {
    return undefined;
  }

  return themeToFactorMap[themeId];
};

export const mapFactorToTheme = (factor?: string | null): ThemeId => {
  if (!factor) {
    return "politics";
  }

  const normalized = factor.toLowerCase() as ApiFactor;

  return factorToThemeMap[normalized] ?? "politics";
};
