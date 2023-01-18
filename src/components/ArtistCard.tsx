'use client';

import Image from 'next/image';
import { PlayButton } from './Card';

type Props = {
  artist: SpotifyApi.ArtistObjectFull;
};

export default function ArtistCard({ artist }: Props) {
  return (
    <div className="flex flex-col p-3 pb-5 rounded-lg hover:bg-zinc-800 delay-100 duration-100 shadow-xl bg-zinc-800/60 relative group transition-colors select-none overflow-hidden">
      <div className="relative w-full">
        <div className=" w-full">
          <Image
            alt={artist.name}
            src={artist.images[2].url}
            width={artist.images[2].width}
            height={artist.images[2].width}
            className="w-36 h-36 object-cover shadow-[0px_8px_24px_rgba(0,0,0,0.5)] rounded-full"
          />
        </div>
        <PlayButton />
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
