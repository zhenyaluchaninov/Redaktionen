import type { Transition } from "framer-motion";

export const arrowBaseColor = "#D4D4D8";
export const arrowHighlightColor = "#EC4899";

export const arrowTransition: Transition = {
  duration: 0.35,
  ease: "easeInOut",
};

/**
 * Returns motion variants for an arrow, driven by a simple boolean "isActive".
 * Higher-level logic is responsible for rotating which arrow is active.
 */
export const getArrowVariants = (isActive: boolean) => ({
  initial: {
    opacity: 0.4,
    color: arrowBaseColor,
  },
  animate: {
    opacity: isActive ? 1 : 1.4,
    color: isActive ? arrowHighlightColor : arrowBaseColor,
    transition: arrowTransition,
  },
});

