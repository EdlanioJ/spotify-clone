'use client';

import clsx from 'clsx';
import {
  ButtonHTMLAttributes,
  ChangeEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { CaretLeft, MagnifyingGlass } from 'phosphor-react';
import debounce from 'lodash/debounce';
import { Slot } from '@radix-ui/react-slot';
import { useRouter, usePathname } from 'next/navigation';
import type { Session } from 'next-auth';

import { useScroll } from '@context/ScrollContext';
import { useColor } from '@context/ColorContext';

import Menu from './Menu';

type Props = {
  user?: Session['user'];
};

export default function Navbar({ user }: Props) {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const pathname = usePathname();
  const router = useRouter();
  const { scrollY } = useScroll();
  const { color } = useColor();

  useEffect(() => {
    if (pathname === '/search') {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }
  }, [pathname]);

  useEffect(() => {
    if (query.trim().length !== 0) {
      router.push(`/search/${query}`);
    }
  }, [query, router]);

  useEffect(() => {
    if (
      pathname &&
      pathname.includes('/search/') &&
      query.trim().length === 0
    ) {
      router.back();
    }
  }, [pathname, router, query]);

  function searchInputHandler(event: ChangeEvent<HTMLInputElement>) {
    setQuery(event.target.value);
  }

  const onChangeSearchInput = useMemo(
    () => debounce(searchInputHandler, 150),
    []
  );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onChange = useCallback(debounce(searchInputHandler, 150), []);

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

      <div className="relative flex gap-2">
        <IconButton onClick={handleGoBack} disabled>
          <CaretLeft weight="bold" />
        </IconButton>
        {pathname?.includes('/search') && (
          <div className="flex items-center justify-center h-7 w-72 pl-2 bg-white rounded-full overflow-hidden">
            <MagnifyingGlass className="text-gray-700" weight="bold" />
            <input
              className="outline-none h-full w-full pl-1 text-sm font-medium text-gray-700"
              type="text"
              placeholder="O que queres ouvir?"
              onChange={onChange}
              defaultValue={query}
              ref={inputRef}
            />
          </div>
        )}
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
