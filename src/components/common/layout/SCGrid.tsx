import React from "react";
import clsx from "clsx";

interface GridProps {
  columns?: number | string;
  rowHeight?: string;
  gap?: string | number;
  children: React.ReactNode;
}

const SCGrid: React.FC<GridProps> = ({ columns = 3, rowHeight = "auto", gap = 4, children }) => {
  const gridGap = typeof gap === "number" ? gap : parseInt(gap);

  const gridTemplateColumns = `grid-cols-${columns}`;

  return (
    <div
      className={clsx(
        "grid",
        gridTemplateColumns,
        rowHeight !== "auto" && `grid-rows-${rowHeight}`,
        `gap-${gridGap}`
      )}
    >
      {children}
    </div>
  );
};

export default SCGrid;