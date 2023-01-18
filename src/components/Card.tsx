'use client';

import React from 'react';
import { Play } from 'phosphor-react';
import NextImage, { ImageProps as NextImageProps } from 'next/image';
import clsx from 'clsx';

type CardProps = {
  children?: React.ReactNode;
};
function Card({ children }: CardProps) {
  return (
    <div className="flex flex-1 flex-col p-3 pb-5 rounded-lg hover:bg-zinc-800 delay-100 duration-100 shadow-xl bg-zinc-800/60 overflow-hidden relative group transition-colors select-none">
      {children}
    </div>
  );
}

type ImageProps = {
  variant?: 'cover' | 'avatar';
} & NextImageProps;
function Image({ variant = 'cover', ...rest }: ImageProps) {
  return (
    <div className="relative object-contain w-full">
      <NextImage
        className={clsx('w-full shadow-[0px_8px_24px_rgba(0,0,0,0.5)]', {
          'rounded ': variant === 'cover',
          'rounded-full': variant === 'avatar',
        })}
        width={100}
        height={100}
        {...rest}
      />
      <PlayButton />
    </div>
  );
}

type TitleProps = {
  children: React.ReactNode;
  className?: string;
};
function Title({ children, className }: TitleProps) {
  return (
    <h2
      className={clsx(
        'text-sm text-gray-200 font-bold truncate mt-3 mb-2',
        className
      )}
    >
      {children}
    </h2>
  );
}

type DescriptionProps = {
  children: React.ReactNode;
};
function Description({ children }: DescriptionProps) {
  return (
    <span className="font-semibold line-clamp-2 text-xs text-gray-400 capitalize">
      {children}
    </span>
  );
}

export function PlayButton() {
  return (
    <button className="w-11 h-11 rounded-full shadow-md bg-green-600 absolute top-[60%] right-[6%] grid place-content-center hover:scale-110 translate-y-2 drop-shadow-sm transition-all opacity-0 group-hover:opacity-100 group-hover:translate-y-0">
      <Play className="text-black text-2xl" weight="fill" />
    </button>
  );
}

Card.Title = Title;
Card.Image = Image;
Card.Description = Description;
Card.PlayButton = PlayButton;

export default Card;
