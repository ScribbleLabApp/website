import React from 'react';
import clsx from 'clsx';
import useVisibilityProps from "@/hooks/useVisibilityProps";

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  contained?: boolean;
  gutter?: number | string;
  gutterTop?: number | string;
  gutterBottom?: number | string;
  gutterLeft?: number | string;
  gutterRight?: number | string;
  gutterX?: number | string;
  gutterY?: number | string;
  accentColor?: string;
  [key: string]: any;
}

const SCSection: React.FC<SectionProps> = ({
    children,
    className,
    contained,
    gutter = 8,
    gutterTop,
    gutterBottom,
    gutterLeft,
    gutterRight,
    gutterX = true,
    gutterY,
    accentColor = "azure",
    ...rest
  }) => {
    const isVisible = useVisibilityProps(rest);
  
    if (!isVisible) return null;
  
    const defaultGutterX = 3;
    const defaultGutterY = 8;
  
    const getGutterValue = (gutterProp: any, defaultValue: number) => {
      if (gutterProp === true) return defaultValue;
      if (gutterProp === false) return 0;
      return gutterProp ?? gutter;
    };
  
    const finalGutterX = getGutterValue(gutterX, defaultGutterX);
    const finalGutterY = getGutterValue(gutterY, defaultGutterY);
    const finalGutterTop = getGutterValue(gutterTop, defaultGutterY);
    const finalGutterBottom = getGutterValue(gutterBottom, defaultGutterY);
    const finalGutterLeft = getGutterValue(gutterLeft, defaultGutterX);
    const finalGutterRight = getGutterValue(gutterRight, defaultGutterX);
  
    const paddingClasses = clsx(
      finalGutterTop && `pt-${finalGutterTop}`,
      finalGutterBottom && `pb-${finalGutterBottom}`,
      finalGutterLeft && `pl-${finalGutterLeft}`,
      finalGutterRight && `pr-${finalGutterRight}`,
      finalGutterX && `px-${finalGutterX}`,
      finalGutterY && `py-${finalGutterY}`,
      accentColor && `bg-${accentColor}`,
      className
    );
  
    const Container = contained ? 'container mx-auto' : 'w-full px-4';
  
    return (
      <section className={paddingClasses} {...rest}>
        <div className={Container}>
          {children}
        </div>
      </section>
    );
  };

  export default SCSection;