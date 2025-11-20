import type { Transition } from "framer-motion";

export const cardEnterTransition: Transition = { duration: 0.16 };
export const cardExitTransition: Transition = { duration: 0.12 };

export const cardMotion = {
  initial: { opacity: 0, y: 12, scale: 0.97 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: -10, scale: 0.97 },
};

export const buildCardTransition = (index: number) => ({
  ...cardEnterTransition,
  delay: index * 0.03,
});
