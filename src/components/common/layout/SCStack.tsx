import React from "react";

interface StackProps {
  children: React.ReactNode;
  className?: string;
  align?: "start" | "center" | "end" | "stretch" | "baseline";
  distribute?: "start" | "center" | "end" | "between" | "around" | "evenly";
  direction?: "vertical" | "horizontal";
  divide?: boolean;
  fill?: boolean;
  gap?: number | string | [number | string, number | string];
  reverse?: boolean;
  wrap?: boolean;
  style?: React.CSSProperties;
}

const SCDivider = () => <hr className="border-t border-gray-300 my-0" />;

const SCStack: React.FC<StackProps> = ({
  children,
  className,
  align = "stretch",
  distribute = "start",
  direction = "vertical",
  divide = false,
  fill = false,
  gap = 4,
  reverse = false,
  wrap = false,
  style,
}) => {
  const flexDirection = direction === "vertical" ? "flex-col" : "flex-row";
  const flexAlign = `items-${align}`;
  const flexDistribute = `justify-${distribute}`;
  const flexWrap = wrap ? "flex-wrap" : "flex-nowrap";
  const flexReverse = reverse ? "flex-row-reverse" : "";
  const flexFill = fill ? "flex-1" : "";
  const gapClass = Array.isArray(gap)
    ? `gap-x-${gap[0]} gap-y-${gap[1]}`
    : `gap-${gap}`;

  const childrenWithDividers = divide
    ? React.Children.toArray(children).reduce<React.ReactNode[]>((output, child, index, array) => {
        output.push(child);
        if (index < array.length - 1) {
          output.push(<SCDivider key={`divider-${index}`} />);
        }
        return output;
      }, [])
    : children;

  return (
    <div
      className={`${flexDirection} ${flexAlign} ${flexDistribute} ${flexWrap} ${flexReverse} ${flexFill} ${gapClass} ${className}`}
      style={style}
    >
      {childrenWithDividers}
    </div>
  );
};

export default SCStack;