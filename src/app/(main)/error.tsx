'use client';

import { useEffect } from 'react';

export default function Error({ error, reset }: any) {
  useEffect(() => {
    console.log({ error });
  }, [error]);
  return (
    <div className="flex h-full justify-center items-center text-center">
      <strong>{error?.message}</strong>
    </div>
  );
}
