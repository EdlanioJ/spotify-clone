'use client';

import { formatDuration } from '@utils/formatDuration';
import Image from 'next/image';
import { Heart, Play } from 'phosphor-react';
import { useState } from 'react';

type Props = {
  tracks: SpotifyApi.TrackObjectFull[];
};

export default function ArtistTopTracks({ tracks }: Props) {
  const [showAll, setShowAll] = useState(false);

  const filteredTracks = showAll ? tracks : tracks.slice(0, 5);

  function toggleShowAll() {
    setShowAll(!showAll);
  }

  return (
    <div className="flex flex-col w-full text-white px-6 mt-4 mb-4">
      <h2 className="font-semibold text-2xl mb-6">Populares</h2>
      <div className="mt-2 flex flex-col gap-1 mb-4">
        {filteredTracks.map((track, index) => (
          <div
            className="max-h-14 p-1 flex gap-2 rounded-lg hover:bg-gray-300 group"
            key={track.id}
          >
            <div className="flex w-8 items-center justify-center tracking-wider font-semibold text-sm">
              <span className="group-hover:hidden group-hover:opacity-0 block opacity-100">
                {index + 1}
              </span>
              <span className="hidden group-hover:block">
                <Play weight="fill" />
              </span>
            </div>
            <div className="flex gap-2 flex-1">
              <Image
                alt="Cover"
                src={track.album.images[0].url}
                width={track.album.images[0].width}
                height={track.album.images[0].height}
                className="w-10 h-10"
              />
              <div className="flex flex-col flex-1 text-sm font-semibold truncate">
                <div className="">
                  <span className="truncate">{track.name}</span>
                </div>
                {track.explicit && (
                  <div className="flex items-center justify-center h-3 w-2.5 rounded-sm text-center text-[10px] text-black bg-white">
                    <span>E</span>
                  </div>
                )}
              </div>
              <div className="flex items-center justify-center h-full text-center font-semibold gap-6 mr-4">
                <span className="cursor-pointer font-extrabold invisible group-hover:visible">
                  <Heart weight="bold" />
                </span>
                <span>{formatDuration(track.duration_ms)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={toggleShowAll}
        className="self-start bg-none border-none p-2"
      >
        <span className="uppercase text-xs font-semibold hover:text-white  text-white/70">
          {showAll ? 'mostrar menos' : 'ver mais'}
        </span>
      </button>
    </div>
  );
}
