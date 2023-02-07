'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { SpotifyLogo } from 'phosphor-react';
import { useEffect } from 'react';

export default function Error({ error }: any) {
  useEffect(() => {
    console.log({ error });
  }, [error]);
  return (
    <div
      className={clsx(
        'absolute top-0 w-full h-full',
        ' flex flex-col gap-4 items-center justify-center text-center',
        'text-gray-100 px-4'
      )}
    >
      <SpotifyLogo className="text-6xl text-green-500" weight="bold" />
      <span className="text-3xl font-bold">
        Ocorreu um problema ao carregar o artista.
      </span>

      <span className="font-semibold">Queres procurar outra coisa?</span>

      <Link
        href="/"
        className="p-2 px-4 rounded-full bg-gray-300 font-semibold text-white text-sm"
      >
        Início
      </Link>
    </div>
  );
}
