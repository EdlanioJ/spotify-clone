'use client';

import clsx from 'clsx';
import { WarningCircle } from 'phosphor-react';
import { useEffect } from 'react';

export default function Error({ error, reset }: any) {
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
      <WarningCircle className="text-6xl" weight="bold" />
      <span className="text-3xl font-bold">
        Ocorreu um problema ao carregar essa pagina
      </span>
      <button
        className="p-2 px-4 uppercase rounded-full bg-gray-300 font-semibold text-white text-sm"
        onClick={() => reset()}
      >
        Recarregar
      </button>
    </div>
  );
}
