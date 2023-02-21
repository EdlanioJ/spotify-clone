'use client';

import { useScroll } from '@context/ScrollContext';
import { formatDuration } from '@utils/formatDuration';
import clsx from 'clsx';
import Link from 'next/link';
import { Clock, Heart, Play } from 'phosphor-react';

type Props = {
  tracks: SpotifyApi.AlbumObjectFull['tracks'];
};

export default function AlbumTrackTable({ tracks }: Props) {
  const { scrollY } = useScroll();
  return (
    <div className="w-full">
      <div
        className={clsx(
          'h-10 px-2 sticky top-10 transition-all border-transparent pb-1 border-solid border-gray-100 border-opacity-40 border-b grid gap-4 album-grid-template font-semibold text-sm text-gray-100 uppercase truncate mb-2',
          { 'bg-gray-900': scrollY >= 350 }
        )}
      >
        <div className="flex items-end justify-center tracking-wider">
          <span>#</span>
        </div>
        <div className="flex items-end overflow-hidden">
          <span className="truncate">Titulo</span>
        </div>
        <div className="flex items-end justify-center font-semibold text-base">
          <Clock weight="bold" />
        </div>
      </div>
      <ul className="px-2">
        {tracks.items.map(
          (track, index) =>
            track && (
              <li key={track.id}>
                <div className="grid album-grid-template gap-4 max-h-14 p-1 text-gray-100 text-xs rounded-lg hover:bg-gray-300 group">
                  <div className="flex items-center justify-center tracking-wider font-semibold text-sm">
                    <span className="group-hover:hidden group-hover:opacity-0 block opacity-100">
                      {index + 1}
                    </span>
                    <span className="hidden group-hover:block">
                      <Play weight="fill" />
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <div className="flex flex-col overflow-hidden gap-1">
                      <span className="truncate font-semibold text-sm hover:underline cursor-pointer text-white">
                        {track.name}
                      </span>
                      <span className="truncate font-semibold">
                        {track.artists.map((artist, index) => (
                          <span key={artist.id}>
                            <Link
                              href={`/artist/${artist.id}`}
                              className="hover:underline"
                            >
                              {artist.name}
                            </Link>
                            {track.artists.length - 1 !== index && ', '}
                          </span>
                        ))}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center font-semibold gap-6">
                    <span className="cursor-pointer font-extrabold invisible group-hover:visible">
                      <Heart weight="bold" />
                    </span>
                    <span>{formatDuration(track.duration_ms)}</span>
                  </div>
                </div>
              </li>
            )
        )}
      </ul>
    </div>
  );
}
