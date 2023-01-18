'use client';

import Image from 'next/image';
import { useEffect } from 'react';

import { useColor } from '@context/ColorContext';
import { millisecondsToHuman } from '@utils/millisecondsToHuman';
import { ToolTip } from './ToolTip';
import { Heart, Play } from 'phosphor-react';

type Props = {
  album: SpotifyApi.AlbumObjectFull;
};
export default function AlbumCover({ album }: Props) {
  const { getColor, color: bgColor } = useColor();
  const albumDurationInMs = album.tracks.items.reduce((prevValue, track) => {
    return prevValue + track.duration_ms;
  }, 0);

  useEffect(() => {
    async function loadColor() {
      await getColor(album.images[1].url);
    }

    loadColor();
  }, [album, getColor]);

  return (
    <div className="w-full flex flex-col">
      <div className="w-full h-[30vh] border-none shadow-none max-h-[500px] min-h-[340px] relative px-6 pb-6 pt-4 text-white flex gap-6">
        {/** background and noise */}
        <div
          className="absolute inset-0"
          style={{ backgroundColor: bgColor }}
        ></div>
        <div className="absolute inset-0 noise"></div>
        {/** end background and noise */}

        <div className="w-36 h-36 shadow-2xl bg-gray-100 relative self-end">
          <Image alt="Capa" src={album.images[0].url} fill />
        </div>

        <div className="flex-1 relative self-end">
          <div className="mb-2">
            <span className="uppercase text-xs font-bold">álbum</span>
          </div>

          <div className="mb-4">
            <span className="text-2xl font-extrabold">{album.name}</span>
          </div>

          <div className="flex items-center gap-1 text-xs font-medium mt-2">
            <span className="font-bold">{album.artists[0].name}</span>
            <span className="font-extrabold text-sm">•</span>
            <span>{new Date(album.release_date).getFullYear()}</span>
            <span className="font-extrabold text-sm">•</span>
            <span>{`${album.tracks.total} músicas, ${millisecondsToHuman(
              albumDurationInMs
            )}`}</span>
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
          <ToolTip position="top" tooltip="Guardar em A tua Biblioteca">
            <Heart className="text-3xl font-bold text-white" />
          </ToolTip>
        </div>
      </div>
    </div>
  );
}
