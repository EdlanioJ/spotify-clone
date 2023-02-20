'use client';

import Section from './Section';
import PlaylistCard from './PlaylistCard';
import Link from 'next/link';

type Props = {
  playlists: SpotifyApi.PlaylistObjectSimplified[];
};

export function CategoryPlaylists({ playlists }: Props) {
  return (
    <Section>
      <Section.Content isFull>
        {playlists.map((playlist) => {
          return (
            <Link href={`/playlist/${playlist.id}`} key={playlist.id}>
              <PlaylistCard playlist={playlist} />
            </Link>
          );
        })}
      </Section.Content>
    </Section>
  );
}
