'use client';

import clsx from 'clsx';
import { ButtonHTMLAttributes, useCallback } from 'react';
import { CaretLeft } from 'phosphor-react';
import { Slot } from '@radix-ui/react-slot';
import { useRouter } from 'next/navigation';
import { Session } from 'next-auth';

import { useScroll } from '@context/ScrollContext';
import { useColor } from '@context/ColorContext';

import Menu from '@components/Menu';

type Props = {
  user?: Session['user'];
};

export default function Navbar({ user }: Props) {
  const { scrollY } = useScroll();
  const router = useRouter();
  const { color } = useColor();
  const handleGoBack = useCallback(() => {
    router.back();
  }, [router]);

  return (
    <nav className="w-full sticky z-50 top-0 flex items-center justify-between px-4 py-2">
      <div
        className={clsx('absolute inset-0 transition-colors duration-[.25s]', {
          'bg-transparent': scrollY <= 90,
          'opacity-75': scrollY > 90 && scrollY <= 240,
          'opacity-100': scrollY > 240,
        })}
        style={{ backgroundColor: color }}
      >
        {scrollY > 90 && <div className="bg-black/60 h-full" />}
      </div>

      <div className="relative">
        <IconButton onClick={handleGoBack} disabled>
          <CaretLeft weight="bold" />
        </IconButton>
      </div>

      <div className="relative">
        <Menu user={user} />
      </div>
    </nav>
  );
}

type IconButtonProps = {} & ButtonHTMLAttributes<HTMLButtonElement>;

function IconButton({ children, ...rest }: IconButtonProps) {
  return (
    <button
      className="flex items-center justify-center w-6 h-6 rounded-full bg-black/75 disabled:bg-black/30"
      {...rest}
    >
      <Slot className="text-white">{children}</Slot>
    </button>
  );
}
