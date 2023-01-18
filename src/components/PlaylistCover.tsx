'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import { useColor } from '@context/ColorContext';
import { Heart, Play } from 'phosphor-react';
import { ToolTip } from './ToolTip';
import { millisecondsToHuman } from '@utils/millisecondsToHuman';

type Props = {
  playlist: SpotifyApi.SinglePlaylistResponse;
};

export default function PlaylistCover({ playlist }: Props) {
  const { getColor, color: bgColor } = useColor();
  const playlistDurationInMs = playlist.tracks.items.reduce(
    (prevValue, { track }) => {
      return prevValue + (track ? track?.duration_ms : 0);
    },
    0
  );

  useEffect(() => {
    async function loadColor() {
      await getColor(playlist.images[0].url);
    }

    loadColor();
  }, [playlist, getColor]);

  return (
    <div className="w-full flex flex-col">
      <div className="w-full h-[30vh] max-h-[500px] min-h-[340px] relative px-6 pb-6 pt-4 text-white flex gap-6">
        {/** background and noise */}
        <div
          className="absolute inset-0"
          style={{ backgroundColor: bgColor }}
        ></div>
        <div className="absolute inset-0 noise"></div>
        {/** end background and noise */}

        <div className="w-36 h-36 shadow-2xl bg-gray-100 relative self-end">
          <Image alt="Capa" src={playlist.images[0].url} fill />
        </div>
        <div className="flex-1 relative self-end">
          <div className="mb-2">
            <span className="uppercase text-xs font-bold">
              Lista de Reprodução
            </span>
          </div>
          <div className="mb-4">
            <span className="text-6xl font-extrabold">{playlist.name}</span>
          </div>
          <div>
            <p className="text-xs text-gray-50 font-semibold">
              {playlist.description}
            </p>
          </div>
          <div className="flex items-center overflow-hidden gap-1 text-[12px] font-semibold mt-2">
            {playlist.owner.images && (
              <Image
                alt="owner"
                src={playlist.owner.images[0].url}
                width={playlist.owner.images[0].width}
                height={playlist.owner.images[0].height}
                className="w-10 h-10 rounded-full self-end"
              />
            )}
            <span className="font-semibold">{playlist.owner.display_name}</span>
            <span className="font-extrabold text-sm">•</span>
            <span>{playlist.followers.total.toLocaleString('pt-AO')}</span>
            <span className="font-extrabold text-sm">•</span>
            <span className="truncate">{`${
              playlist.tracks.total
            } músicas, ${millisecondsToHuman(playlistDurationInMs)}`}</span>
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
