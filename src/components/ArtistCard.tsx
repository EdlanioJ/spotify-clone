'use client';

import { Slot } from '@radix-ui/react-slot';
import Image from 'next/image';
import PlayButton from './PlayButton';

type Props = {
  artist: SpotifyApi.ArtistObjectFull;
};

export default function ArtistCard({ artist }: Props) {
  return (
    <div className="flex flex-col p-3 pb-5 rounded-lg hover:bg-zinc-800 delay-100 duration-100 shadow-xl bg-zinc-800/60 relative group transition-colors select-none overflow-hidden">
      <div className="relative w-full">
        <div className=" w-full">
          {!artist.images[0] ? (
            <div></div>
          ) : (
            <Image
              alt={artist.name}
              src={artist.images[0].url}
              width={artist.images[0].width}
              height={artist.images[0].width}
              className="w-36 h-36 object-cover shadow-[0px_8px_24px_rgba(0,0,0,0.5)] rounded-full"
            />
          )}
        </div>

        <PlayButton variant="card" />
      </div>
      <strong className="text-sm text-gray-200 font-bold truncate mt-2 mb-2">
        {artist.name}
      </strong>

      <span className="font-semibold line-clamp-2 text-xs text-gray-400 truncate">
        Artista
      </span>
    </div>
  );
}
