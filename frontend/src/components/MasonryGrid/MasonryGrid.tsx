/**
 * Responsive masonry grid that mirrors the prototype column layout.
 */
import { AnimatePresence, motion } from "framer-motion";
import type { ReactNode } from "react";
import {
  buildCardTransition,
  cardExitTransition,
  cardMotion,
} from "./animations";

type MasonryGridProps<T> = {
  items: T[];
  renderItem: (item: T) => ReactNode;
  enableAnimations?: boolean;
};

const GridColumn = <T,>({
  items,
  renderItem,
  enableAnimations,
}: {
  items: T[];
  renderItem: (item: T) => ReactNode;
  enableAnimations: boolean;
}) => {
  if (!enableAnimations) {
    return (
      <>
        {items.map((item, index) => (
          <div key={(item as { id?: string | number }).id ?? index}>
            {renderItem(item)}
          </div>
        ))}
      </>
    );
  }

  return (
    <AnimatePresence mode="wait">
      {items.map((item, index) => (
        <motion.div
          key={(item as { id?: string | number }).id ?? index}
          layout
          initial={cardMotion.initial}
          animate={cardMotion.animate}
          exit={{ ...cardMotion.exit, transition: cardExitTransition }}
          transition={buildCardTransition(index)}
        >
          {renderItem(item)}
        </motion.div>
      ))}
    </AnimatePresence>
  );
};

export const MasonryGrid = <T,>({
  items,
  renderItem,
  enableAnimations = true,
}: MasonryGridProps<T>) => {
  const leftColumn = items.filter((_, index) => index % 2 === 0);
  const rightColumn = items.filter((_, index) => index % 2 === 1);

  return (
    <div className="flex gap-6">
      <div className="flex-1 space-y-0">
        <GridColumn
          items={leftColumn}
          renderItem={renderItem}
          enableAnimations={enableAnimations}
        />
      </div>
      <div className="flex-1 space-y-0">
        <GridColumn
          items={rightColumn}
          renderItem={renderItem}
          enableAnimations={enableAnimations}
        />
      </div>
    </div>
  );
};
