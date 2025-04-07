import React from 'react';
import clsx from 'clsx';

interface RowProps {
  children: React.ReactNode;
  gap?: number | string;
  gutter?: number | string;
  gutterTop?: number | string;
  gutterBottom?: number | string;
  align?: 'start' | 'center' | 'end';
  distribute?: 'start' | 'center' | 'end' | 'between' | 'around';
  [key: string]: any;
}

const SCRow: React.FC<RowProps> = ({
  children,
  gap,
  gutter,
  gutterTop,
  gutterBottom,
  align,
  distribute,
  ...props
}) => {
  const itemCount = React.Children.count(children);

  const childrenWithProps = React.Children.map(children, (child) =>
    React.isValidElement(child)
      ? React.cloneElement(child, {
          $gap: gap,
          $itemCount: itemCount,
        } as any)
      : child
  );

  return (
    <div
      className={clsx(
        'flex flex-wrap box-border',
        gap ? `-mx-${gap} gap-x-0 gap-y-${gap}` : '',
        gutter || gutterTop || gutterBottom
          ? `mt-${gutterTop ?? gutter} mb-${gutterBottom ?? gutter}`
          : '',
        align === 'center' ? 'justify-center text-center' : '',
        align === 'end' ? 'justify-end text-end' : '',
        distribute ? `justify-${distribute}` : '',
        props.className
      )}
      {...props}
    >
      {childrenWithProps}
    </div>
  );
};

export default SCRow;