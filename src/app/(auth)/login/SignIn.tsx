'use client';

import { useCallback } from 'react';
import { signIn } from 'next-auth/react';

export function SignIn() {
  return (
    <button
      type="button"
      onClick={() => signIn('spotify', { callbackUrl: '/' })}
      className="p-4 px-6 font-bold text-sm transition-all bg-white rounded-full text-black hover:scale-105 ring-2 ring-white"
    >
      Entrar com Spotify
    </button>
  );
}
