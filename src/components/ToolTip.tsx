'use client';

import React from 'react';
import clsx from 'clsx';

type Props = {
  children: React.ReactNode;
  tooltip?: string | null;
  position?: 'top' | 'bottom';
  isLeft?: boolean;
};

export function ToolTip({
  children,
  tooltip,
  position = 'top',
  isLeft = false,
}: Props) {
  return (
    <div
      data-tooltip={tooltip}
      className={clsx(
        'relative hover:before:visible before:left-1/2 before:whitespace-nowrap before:font-semibold before:text-xs before:content-[attr(data-tooltip)] before:group-hover:visible before:absolute transition-all before:invisible before:text-gray-100 before:bg-gray-300 before:rounded before:p-1 before:shadow-[0px_8px_24px_rgba(0,0,0,0.5)]',
        {
          'before:-translate-y-full before:-top-2': position === 'top',
          'before:translate-y-full before:top-2': position === 'bottom',
          'before:-translate-x-full': isLeft === true,
          'before:-translate-x-1/2': isLeft === false,
        }
      )}
    >
      {children}
    </div>
  );
}
