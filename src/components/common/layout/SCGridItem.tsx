import React from 'react';
import clsx from 'clsx';

interface GridItemProps {
  children: React.ReactNode;
  width?: number | string;
  height?: number | string;
  as?: React.ElementType;
  [key: string]: any;
}

const GridItem: React.FC<GridItemProps> = ({ children, width, height, as = 'div', ...props }) => {
  const gridColumnStart = width ? `col-span-${width}` : 'col-span-1';
  const gridRowStart = height ? `row-span-${height}` : 'row-span-1';
  
  const isVisible = props.isVisible ?? true;

  if (!isVisible) {
    return null;
  }

  const Component = as;

  return (
    <Component
      className={clsx(
        'grid-item',
        gridColumnStart,
        gridRowStart,
        props.className
      )}
      {...props}
    >
      {children}
    </Component>
  );
};

export default GridItem;