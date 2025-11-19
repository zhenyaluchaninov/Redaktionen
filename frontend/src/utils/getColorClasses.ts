import type { ThemeColor } from "../data/themes";

type ColorVariants = {
  bg: string;
  text: string;
  light: string;
  border: string;
};

const colors: Record<ThemeColor, ColorVariants> = {
  red: {
    bg: "bg-red-500",
    text: "text-red-500",
    light: "bg-red-50",
    border: "border-red-200",
  },
  cyan: {
    bg: "bg-cyan-600",
    text: "text-cyan-600",
    light: "bg-cyan-50",
    border: "border-cyan-200",
  },
  blue: {
    bg: "bg-blue-500",
    text: "text-blue-500",
    light: "bg-blue-50",
    border: "border-blue-200",
  },
  violet: {
    bg: "bg-violet-500",
    text: "text-violet-500",
    light: "bg-violet-50",
    border: "border-violet-200",
  },
  green: {
    bg: "bg-green-500",
    text: "text-green-500",
    light: "bg-green-50",
    border: "border-green-200",
  },
  amber: {
    bg: "bg-amber-500",
    text: "text-amber-500",
    light: "bg-amber-50",
    border: "border-amber-200",
  },
  gray: {
    bg: "bg-gray-500",
    text: "text-gray-500",
    light: "bg-gray-50",
    border: "border-gray-200",
  },
  magenta: {
    bg: "bg-fuchsia-500",
    text: "text-fuchsia-500",
    light: "bg-fuchsia-50",
    border: "border-fuchsia-200",
  },
};

/**
 * Provides Tailwind utility classes for specific brand colors.
 */
export const getColorClasses = (
  color: ThemeColor,
  variant: keyof ColorVariants = "bg"
) => colors[color][variant];
