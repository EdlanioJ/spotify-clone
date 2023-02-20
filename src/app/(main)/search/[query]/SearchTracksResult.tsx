'use client';

import { formatDuration } from '@utils/formatDuration';
import Image from 'next/image';
import Link from 'next/link';
import { Heart } from 'phosphor-react';

type Props = {
  tracks: SpotifyApi.TrackObjectFull[];
};
export default function SearchTracksResult({ tracks }: Props) {
  const filteredTracks = tracks.slice(0, 5);

  return (
    <div className="flex flex-col w-full text-white px-6 mt-4 mb-4">
      <h2 className="font-semibold text-2xl mb-4">Músicas</h2>

      <div className="mt-1 flex flex-col gap-1 mb-4">
        {filteredTracks.map((track) => (
          <div
            className="max-h-14 p-1 flex gap-2 rounded-lg hover:bg-gray-300 group"
            key={track.id}
          >
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
                <span className="truncate font-medium text-xs">
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
              <div className="flex items-center justify-center h-full text-center font-medium gap-6 mr-4">
                <span className="cursor-pointer font-extrabold invisible group-hover:visible">
                  <Heart weight="bold" />
                </span>
                <span className="text-md">{formatDuration(track.duration_ms)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
