'use client';

import Card from '@components/Card';
import PlayButton from '@components/PlayButton';
import Section from '@components/Section';
import Image from 'next/image';
import Link from 'next/link';

type Props = {
  playHistory: SpotifyApi.PlayHistoryObject[];
  artists: {
    [key: string]: SpotifyApi.ArtistObjectFull;
  };
  playlists: { [key: string]: SpotifyApi.PlaylistObjectSimplified };
};
export default function MyRecentlyPlayed({
  playHistory,
  artists,
  playlists,
}: Props) {
  const filteredPlayHistory = [
    ...new Map(
      playHistory
        .filter((value) => value.context)
        .map((item) => [item.context.uri, item])
    ).values(),
  ].slice(0, 6);
  return (
    <Section>
      <Section.Header>
        <Section.Text>Reproduzido recentemente</Section.Text>
      </Section.Header>
      <div className="grid grid-cols-2 grid-rows-3 lg:grid-cols-3 lg:grid-rows-2 gap-4 overflow-hidden">
        {filteredPlayHistory.map((item) => {
          let imageSrc: string;
          let name: string;
          if (item.context.type === 'playlist') {
            const playlist = playlists[item.context.uri];
            imageSrc = playlist.images[0].url;
            name = playlist.name;
          } else if (item.context.type === 'artist') {
            const artist = artists[item.context.uri];
            imageSrc = artist.images[0].url;
            name = artist.name;
          } else {
            imageSrc = item.track.album.images[0].url;
            name = item.track.album.name;
          }
          return (
            <div
              className="lg:h-16 relative h-12 w-full flex gap-3 pr-3 bg-zinc-800/60 rounded overflow-hidden shadow-2xl transition-all hover:bg-zinc-800 delay-100 group"
              key={item.track.id}
            >
              <Image
                alt={`Capa de ${name}`}
                src={imageSrc}
                width={100}
                height={100}
                className="h-12 w-12 lg:h-16 lg:w-16 shadow-[0px_8px_24px_rgba(0,0,0,0.5)]"
              />
              <div className="flex w-64 items-center">
                <span className="font-bold text-white text-sm line-clamp-2">
                  {name}
                </span>
              </div>

              <PlayButton variant="recent" />
            </div>
          );
        })}
      </div>
    </Section>
  );
}
