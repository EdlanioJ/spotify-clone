'use client';

import React from 'react';
import { MusicNotes, Play } from 'phosphor-react';
import NextImage, { ImageProps as NextImageProps } from 'next/image';
import clsx from 'clsx';
import { Slot } from '@radix-ui/react-slot';
import PlayButton from './PlayButton';

type CardProps = {
  children?: React.ReactNode;
};
function Card({ children }: CardProps) {
  return (
    <div className="flex flex-1 flex-col h-full p-3 rounded-lg hover:bg-zinc-800 delay-100 duration-100 shadow-xl bg-zinc-800/60 overflow-hidden relative group transition-colors select-none">
      {children}
    </div>
  );
}

type ImageProps = {
  variant?: 'cover' | 'avatar';
  playBtn: React.ReactNode;
} & NextImageProps;
function Image({ variant = 'cover', playBtn, ...rest }: ImageProps) {
  return (
    <div className="relative w-full">
      <NextImage
        className={clsx(
          'w-full object-cover h-full shadow-[0px_8px_24px_rgba(0,0,0,0.5)]',
          {
            'rounded ': variant === 'cover',
            'rounded-full': variant === 'avatar',
          }
        )}
        width={100}
        height={100}
        {...rest}
      />
      {playBtn}
    </div>
  );
}

type CoverProps = {
  variant?: 'playlist' | 'artist';
  playBtn: React.ReactNode;
};
function Cover({ variant = 'playlist', playBtn }: CoverProps) {
  return (
    <div
      className={clsx(
        'relative w-full h-full rounded flex items-center justify-center bg-zinc-900 shadow-[0px_8px_24px_rgba(0,0,0,0.5)]',
        'text-gray-200 py-4 text-3xl'
      )}
    >
      {variant === 'playlist' && <MusicNotes className="" weight="bold" />}

      {playBtn}
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
        'text-sm text-gray-200 font-bold truncate mt-2 mb-1',
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
    <span className="font-medium line-clamp-2 text-xs text-gray-400 capitalize">
      {children}
    </span>
  );
}

Card.Title = Title;
Card.Image = Image;
Card.Cover = Cover;
Card.Description = Description;

export default Card;
