"use client";

import React from "react";
import clsx from "clsx";

interface RibbonProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  onClick?: () => void;
}

const SCRibbon: React.FC<RibbonProps> = ({
  children,
  onClick,
  className,
  ...props
}) => {
  return (
    <div
      onClick={onClick}
      className={clsx(
        "overflow-hidden",
        onClick ? "cursor-pointer" : "",
        className,
      )}
      {...props}
    >
      <div className="animate-ribbon-drop w-full">
        <div className="bg-[#FF6900] dark:bg-[#FF6900] w-full py-[0.94118em] text-center relative">
          <div className="text-black dark:text-white text-[14px] leading-[1.42859] font-normal tracking-[-0.016em] font-sans">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SCRibbon;
