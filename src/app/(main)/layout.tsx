import '../../styles/globals.css';

import React from 'react';
import { Montserrat } from '@next/font/google';
import { unstable_getServerSession } from 'next-auth';

import { authOptions } from '@api/auth/[...nextauth]';
import { spotifyApi } from '@libs/spotify';

import Sidebar from '@components/Sidebar';
import Navbar from '@components/Navbar';
import Player from '@components/Player';

import { ColorProvider } from '@context/ColorContext';
import { SessionProvider } from '@context/SessionContext';
import { ScrollProvider } from '@context/ScrollContext';

const montserrat = Montserrat({
  style: ['normal'],
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  display: 'swap',
});

async function fetchData() {
  const session = await unstable_getServerSession(authOptions);
  const accessToken = session?.accessToken as string;

  spotifyApi.setAccessToken(accessToken);
  const [{ body: playlists }, { body: currentPlayingTrack }] =
    await Promise.all([
      spotifyApi.getUserPlaylists(),
      spotifyApi.getMyCurrentPlayingTrack(),
    ]);

  return { playlists, currentPlayingTrack, user: session?.user };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { currentPlayingTrack, playlists, user } = await fetchData();

  return (
    <html className={montserrat.className}>
      <head />
      <body>
        <SessionProvider>
          <div className="h-screen bg-gray-700 overflow-hidden">
            <div className="flex h-[90vh]">
              {/* Sidebar */}
              <Sidebar playlists={playlists} />
              {/* Main */}
              <main className="w-full h-full relative overflow-y-scroll overflow-x-hidden scrollbar scrollbar-track-transparent scrollbar-thumb-gray-100">
                <ScrollProvider>
                  <ColorProvider>
                    {/** Navbar */}
                    <Navbar user={user} />
                    {children}
                  </ColorProvider>
                </ScrollProvider>
              </main>
            </div>
            {/* Player */}
            <Player currentPlayingTrack={currentPlayingTrack} />
          </div>
        </SessionProvider>
      </body>
    </html>
  );
}
