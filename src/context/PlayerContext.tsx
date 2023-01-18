'use client';

import React, { createContext, useState } from 'react';

const PlayerContext = createContext({} as any);

type Props = {
  children: React.ReactNode;
};

export function PlayerProvider({ children }: Props) {
  const [currentTrack, setCurrentTrack] =
    useState<SpotifyApi.TrackLinkObject | null>(null);
  const [currentTrackAudio, setCurrentTrackAudio] =
    useState<HTMLAudioElement | null>(null);

  return (
    <PlayerContext.Provider value={{ currentTrackAudio, currentTrack }}>
      {children}
    </PlayerContext.Provider>
  );
}
