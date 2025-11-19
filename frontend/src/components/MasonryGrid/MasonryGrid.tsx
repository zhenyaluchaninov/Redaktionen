/**
 * Responsive masonry grid that mirrors the prototype column layout.
 */
import type { ReactNode } from "react";

type MasonryGridProps<T> = {
  items: T[];
  renderItem: (item: T) => ReactNode;
};

export const MasonryGrid = <T,>({ items, renderItem }: MasonryGridProps<T>) => {
  const leftColumn = items.filter((_, index) => index % 2 === 0);
  const rightColumn = items.filter((_, index) => index % 2 === 1);

  return (
    <div className="flex gap-6">
      <div className="flex-1">{leftColumn.map((item) => renderItem(item))}</div>
      <div className="flex-1">
        {rightColumn.map((item) => renderItem(item))}
      </div>
    </div>
  );
};
