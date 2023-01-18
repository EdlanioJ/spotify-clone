'use client';

import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { Clock, Heart, Play } from 'phosphor-react';
import { useScroll } from '@context/ScrollContext';
import { formatDuration } from '@utils/formatDuration';

type Props = {
  tracks: SpotifyApi.PlaylistObjectFull['tracks'];
};

export default function TrackTable({ tracks }: Props) {
  const { scrollY } = useScroll();

  return (
    <div className="w-full">
      <div
        className={clsx(
          'h-10 px-2 sticky top-10 transition-all border-transparent pb-1 border-solid border-gray-100 border-opacity-40 border-b grid gap-4 playlist-template font-semibold text-sm text-gray-100 uppercase truncate mb-2',
          { 'bg-gray-900': scrollY >= 350 }
        )}
      >
        <div className="flex items-end justify-center tracking-wider">
          <span>#</span>
        </div>
        <div className="flex items-end overflow-hidden">
          <span className="truncate">Titulo</span>
        </div>
        <div className="flex items-end overflow-hidden">
          <span className="truncate">Álbum</span>
        </div>
        <div className="flex items-end overflow-hidden">
          <span className="truncate">Data Adicionada</span>
        </div>
        <div className="flex items-end justify-center font-semibold text-base">
          <Clock weight="bold" />
        </div>
      </div>
      <ul className="px-2 mb-10">
        {tracks.items.map(
          (track, index) =>
            track.track && (
              <li key={track.track.id}>
                <div className="grid gap-4 max-h-14 p-1 playlist-template text-gray-100 text-xs rounded-lg hover:bg-gray-300 group">
                  <div className="flex items-center justify-center tracking-wider font-semibold text-sm">
                    <span className="group-hover:hidden group-hover:opacity-0 block opacity-100">
                      {index + 1}
                    </span>
                    <span className="hidden group-hover:block">
                      <Play weight="fill" />
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <Image
                      alt="cover"
                      src={track.track.album.images[1].url}
                      width={track.track.album.images[1].width}
                      height={track.track.album.images[1].height}
                      className="w-10 h-10"
                    />

                    <div className="flex md:w-32 lg:w-56 xl:w-full flex-col overflow-hidden gap-1">
                      <span className="truncate font-semibold text-sm hover:underline cursor-pointer text-white">
                        {track.track.name}
                      </span>
                      <span className="truncate font-semibold">
                        {track.track.artists.map((artist, index) => (
                          <span key={artist.id}>
                            <Link
                              href={`/artist/${artist.id}`}
                              className="hover:underline"
                            >
                              {artist.name}
                            </Link>
                            {track.track!.artists.length - 1 !== index && ', '}
                          </span>
                        ))}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center truncate font-semibold">
                    <Link href={`/album/${track.track.album.id}`}>
                      <span className="hover:underline cursor-pointer">
                        {track.track.album.name}
                      </span>
                    </Link>
                  </div>

                  <div className="flex items-center font-semibold">
                    <span>{new Date(track.added_at).toLocaleDateString()}</span>
                  </div>

                  <div className="flex items-center font-semibold gap-6">
                    <span className="cursor-pointer font-extrabold invisible group-hover:visible">
                      <Heart weight="bold" />
                    </span>
                    <span>{formatDuration(track.track.duration_ms)}</span>
                  </div>
                </div>
              </li>
            )
        )}
      </ul>
    </div>
  );
}
