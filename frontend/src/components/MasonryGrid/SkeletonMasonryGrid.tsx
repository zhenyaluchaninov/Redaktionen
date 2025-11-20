/**
 * Skeleton masonry grid to keep page height stable while content loads.
 */
import { useDarkMode } from "../../hooks/useDarkMode";

const COLUMN_PLACEHOLDERS = 5;

export const SkeletonMasonryGrid = () => {
  const { isDarkMode } = useDarkMode();

  const cardBaseClasses = `border rounded-xl p-5 mb-5 animate-pulse ${
    isDarkMode
      ? "bg-gray-900 border-gray-800"
      : "bg-white border-gray-200"
  }`;

  const blockBaseClasses = isDarkMode ? "bg-gray-800" : "bg-gray-100";

  const renderColumn = (columnKey: string) => (
    <>
      {Array.from({ length: COLUMN_PLACEHOLDERS }).map((_, index) => (
        <div key={`${columnKey}-${index}`} className={cardBaseClasses}>
          <div className={`mb-4 rounded-lg h-44 ${blockBaseClasses}`} />

          <div className="flex items-center gap-2 mb-3">
            <span
              className={`w-2 h-2 rounded-full ${blockBaseClasses}`}
            ></span>
            <span
              className={`h-3 w-20 rounded-full ${blockBaseClasses}`}
            ></span>
            <span
              className={`h-3 w-10 rounded-full ml-auto ${blockBaseClasses}`}
            ></span>
          </div>

          <div className="space-y-2 mb-4">
            <div className={`h-4 w-3/4 rounded-full ${blockBaseClasses}`} />
            <div className={`h-3 w-full rounded-full ${blockBaseClasses}`} />
            <div className={`h-3 w-5/6 rounded-full ${blockBaseClasses}`} />
          </div>

          <div className="flex items-center gap-3">
            <span
              className={`h-3 w-16 rounded-full ${blockBaseClasses}`}
            ></span>
            <span
              className={`h-3 w-12 rounded-full ${blockBaseClasses}`}
            ></span>
            <span
              className={`h-3 w-14 rounded-full ml-auto ${blockBaseClasses}`}
            ></span>
          </div>
        </div>
      ))}
    </>
  );

  return (
    <div className="flex gap-6">
      <div className="flex-1">{renderColumn("left")}</div>
      <div className="flex-1">{renderColumn("right")}</div>
    </div>
  );
};

