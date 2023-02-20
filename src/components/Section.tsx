'use client';

import React from 'react';
import clsx from 'clsx';

type SectionProps = {
  children: React.ReactNode;
};
function Section({ children }: SectionProps) {
  return (
    <section className="flex flex-col gap-4 px-4 mt-6 overflow-y-hidden">
      {children}
    </section>
  );
}

type HeaderProps = {
  children?: React.ReactNode;
};

function Header({ children }: HeaderProps) {
  return (
    <header className="flex flex-1 items-baseline justify-between">
      {children}
    </header>
  );
}

type ContentProps = {
  children: React.ReactNode;
  className?: string;
  isFull?: boolean;
};
function Content({ children, className, isFull = false }: ContentProps) {
  return (
    <div
      className={clsx('grid-container', className, {
        'auto-rows-fr gap-y-4': isFull,
        'grid-rows-[1fr]': !isFull,
      })}
    >
      {children}
    </div>
  );
}

type TextProps = {
  variant?: 'heading' | 'link';
  children?: React.ReactNode;
};

function Text({ variant = 'heading', children }: TextProps) {
  return (
    <span
      className={clsx('text-zinc-300 hover:underline cursor-pointer', {
        'font-semibold text-2xl': variant === 'heading',
        'uppercase font-semibold text-xs text-zinc-500': variant === 'link',
      })}
    >
      {children}
    </span>
  );
}

Section.Header = Header;
Section.Content = Content;
Section.Text = Text;

export default Section;
