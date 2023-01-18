import NextAuth, { DefaultSession } from 'next-auth';
import { JWT } from 'next-auth/jwt';

declare module 'next-auth' {
  interface Session {
    refreshToken: string;
    accessToken: string;
    accessTokenExpires: number;
    error?: string;
    user?: DefaultSession['user'];
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    refreshToken: string;
    accessToken: string;
    accessTokenExpires: number;
    username: string;
    error?: string;
  }
}
