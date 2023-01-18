'use client';

import { useColor } from '@context/ColorContext';
import { Play } from 'phosphor-react';
import { useEffect } from 'react';

type Props = {
  artist: SpotifyApi.SingleArtistResponse;
};

export default function ArtistCover({ artist }: Props) {
  const { getColor, color: bgColor } = useColor();
  useEffect(() => {
    getColor(artist.images[0].url);
  }, [artist, getColor]);
  return (
    <div className="w-full flex flex-col">
      <div className="w-full h-[30vh] border-none shadow-none max-h-[500px] min-h-[340px] relative px-6 pb-6 pt-4 text-white flex gap-6">
        <div
          className="absolute inset-0 bg-no-repeat bg-cover bg-local"
          style={{ backgroundImage: `url(${artist.images[0].url})` }}
        ></div>
        <div className="absolute inset-0 noise"></div>
        <div className="flex-1 relative self-end text-white">
          <div className="mb-4">
            <span className="text-8xl font-extrabold">{artist.name}</span>
          </div>

          <div>
            <span className="font-medium">{`${artist.followers.total.toLocaleString(
              'pt-AO'
            )} Seguidores`}</span>
          </div>
        </div>
      </div>
      <div className="w-full relative">
        <div
          className="absolute inset-0 filter blur-3xl"
          style={{ backgroundColor: bgColor }}
        ></div>
        <div className="flex gap-6 px-4 py-2 items-center">
          <button className="bg-green-500 text-white rounded-full w-10 h-10 grid place-content-center">
            <Play weight="fill" className="text-xl" />
          </button>
        </div>
      </div>
    </div>
  );
}
