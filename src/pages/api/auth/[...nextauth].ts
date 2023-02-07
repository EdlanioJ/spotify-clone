import NextAuth, { NextAuthOptions } from 'next-auth';
import SpotifyProvider from 'next-auth/providers/spotify';
import { loginUrl, spotifyApi } from '../../../libs/spotify';

async function refreshAccessToken(token: any) {
  try {
    spotifyApi.setAccessToken(token.accessToken);
    spotifyApi.setRefreshToken(token.refreshToken);
    const { body } = await spotifyApi.refreshAccessToken();

    return {
      ...token,
      accessToken: body.access_token,
      accessTokenExpires: Date.now() + body.expires_in * 1000,
      refreshToken: body.refresh_token ?? token.refreshToken,
    };
  } catch (error) {
    console.log(error);
    return {
      ...token,
      error: 'RefreshAccessTokenError',
    };
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    SpotifyProvider({
      clientId: String(process.env.SPOTIFY_CLIENT_ID),
      clientSecret: String(process.env.SPOTIFY_CLIENT_SECRET),
      authorization: loginUrl,
    }),
  ],
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async jwt({ token, account, user }) {
      if (account && user) {
        return {
          email: user.email,
          name: user.name,
          picture: user.image,
          sub: user.id,
          accessToken: account.access_token,
          refreshToken: account.refresh_token,
          username: account.providerAccountId,
          accessTokenExpires: Number(account.expires_at) * 1000,
        };
      }

      if (new Date() < new Date(token.accessTokenExpires)) {
        return token;
      }

      return await refreshAccessToken(token);
    },
    async session({ session, token }) {
      return {
        ...session,
        error: token.error,
        accessToken: token.accessToken,
        refreshToken: token.refreshToken,
        accessTokenExpires: token.accessTokenExpires,
        user: {
          ...session.user,
          username: token.username,
        },
      };
    },
  },
  debug: process.env.NODE_ENV !== 'production',
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
