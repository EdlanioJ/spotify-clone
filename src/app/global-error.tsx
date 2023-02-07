'use client';

import { Montserrat } from '@next/font/google';
import clsx from 'clsx';
import Link from 'next/link';
import { SpotifyLogo } from 'phosphor-react';
import { useEffect } from 'react';

type Props = {
  error: Error;
  reset: () => void;
};

const montserrat = Montserrat({
  style: ['normal'],
  subsets: ['latin'],
  weight: ['400', '600', '700', '800'],
  display: 'swap',
});

export default function GlobalError({ error, reset }: Props) {
  useEffect(() => {
    console.log('logging error:', error);
  }, [error]);
  return (
    <html className={montserrat.className}>
      <head>
        <title>Pagina não disponível</title>
      </head>
      <body
        className={clsx(
          'absolute top-0 w-full h-full',
          ' flex flex-col gap-4 items-center justify-center text-center',
          'bg-gray-700 text-gray-100 px-4'
        )}
      >
        <SpotifyLogo className="text-6xl text-green-500" weight="bold" />
        <span className="text-3xl font-bold">Página não disponível</span>

        <span>Ocorreu um problema, tenta novamente mais tarde.</span>

        <Link
          href="/"
          className="p-2 px-4 rounded-full bg-white font-semibold text-gray-700 text-sm"
        >
          Início
        </Link>
      </body>
    </html>
  );
}
