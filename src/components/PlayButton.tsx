'use client';

import { ButtonHTMLAttributes } from 'react';
import { Pause, Play } from 'phosphor-react';
import { Slot } from '@radix-ui/react-slot';
import clsx from 'clsx';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  isPaying?: boolean;
  variant?: 'card' | 'default' | 'recent';
}

export default function PlayButton({
  isPaying = false,
  variant = 'default',
  className,
  ...rest
}: Props) {
  return (
    <button
      className={clsx(
        'rounded-full shadow-md bg-green-600 grid place-content-center hover:scale-110 drop-shadow-sm transition-all',
        className,
        {
          'w-11 h-11': variant === 'default',
          'w-11 h-11 absolute top-[60%] right-[6%] translate-y-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0':
            variant === 'card',
          'w-9 h-9 absolute top-[12%] right-[4%] translate-y-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0':
            variant === 'recent',
        }
      )}
      {...rest}
    >
      <span
        className={clsx('text-black', {
          'text-2xl': variant === 'default' || variant === 'card',
          'text-xl': variant === 'recent',
        })}
      >
        {!isPaying && <Play weight="fill" />}
        {isPaying && <Pause weight="fill" />}
      </span>
    </button>
  );
}
