'use client';

import { useEffect } from 'react';
import clsx from 'clsx';
import Link from 'next/link';
import { WarningCircle } from 'phosphor-react';

export default function Error({ error, reset }: any) {
  useEffect(() => {
    console.log(error);
  }, [error]);
  return (
    <div
      className={clsx(
        'absolute top-0 w-full h-full',
        ' flex flex-col gap-4 items-center justify-center text-center',
        'text-white px-4'
      )}
    >
      <WarningCircle className="text-6xl" weight="bold" />
      <span className="text-3xl font-bold">
        Ocorreu um problema ao carregar o album.
      </span>

      <span className="font-medium">Queres procurar outra coisa?</span>
      <Link href="/">
        <div
          className={clsx(
            'p-2 px-4 rounded-full',
            'bg-white text-gray-700 text-sm font-semibold',
            'transition-all hover:scale-105'
          )}
        >
          Início
        </div>
      </Link>
    </div>
  );
}
