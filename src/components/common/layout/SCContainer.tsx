import React from "react";
import clsx from "clsx";
import { mediaQueries } from "@/styles/breakpoints";

interface ContainerProps {
  width?: "lg" | "default";
  children: React.ReactNode;
}

const SCContainer: React.FC<ContainerProps> = ({ width = "default", children }) => {
  const gutter = 22;
  const smallGutter = 16;

  const containerClassNames = clsx(
    "mx-auto relative",
    width === "lg" ? `max-w-[calc(1440px-${gutter * 2}px)]` : `max-w-[980px]`,
    `w-[calc(100%-max(${gutter}px,env(safe-area-inset-left))-max(${gutter}px,env(safe-area-inset-right)))]`,
    `px-[${gutter}px]`,
    `pl-[max(${gutter}px,env(safe-area-inset-left))]`,
    `pr-[max(${gutter}px,env(safe-area-inset-right))]`,
    mediaQueries.md && "w-[692px]",
    mediaQueries.sm && `max-w-[366px] w-[calc(100%-${smallGutter * 2}px)] px-[${smallGutter}px] pl-[max(${smallGutter}px,env(safe-area-inset-left))] pr-[max(${smallGutter}px,env(safe-area-inset-right))]`
  );

  return <div className={containerClassNames}>{children}</div>;
};

export default SCContainer;