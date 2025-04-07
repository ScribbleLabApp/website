import React from "react";
import clsx from "clsx";

interface ColumnProps {
    gap?: string | string[];
    width?: string | string[];
    offset?: string | string[];
    children: React.ReactNode;
}

const getSpacing = (gap: string) => {
    const spacingMap: { [key: string]: string } = {
        sm: "0.5rem",
        md: "1rem",
        lg: "2rem",
        xl: "3rem",
    };
    return spacingMap[gap] || "1rem";
};

const getResponsivePropStyles = (prop: string | string[], style: (val: string) => string) => {
    if (Array.isArray(prop)) {
        return prop.map((val) => style(val)).join(" ");
    }
    return style(prop as string);
};

const SCColumn: React.FC<ColumnProps> = ({ gap, width, offset, children }) => {
    return (
        <div
            className={clsx(
                "box-border flex-shrink-0",
                gap && getResponsivePropStyles(gap, (val) => `px-[${parseFloat(getSpacing(val)) / 2}px]`),
                width && getResponsivePropStyles(width, (val) => `flex-basis-[${(Number(val ?? 1) / 12) * 100}%] max-w-[${(Number(val ?? 1) / 12) * 100}%]`),
                offset && getResponsivePropStyles(offset, (val) => `ml-[${(Number(val ?? 1) / 12) * 100}%]`)
            )}
        >
            {children}
        </div>
    );
};

export default SCColumn;