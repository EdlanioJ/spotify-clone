'use client';

import Link from 'next/link';
import Section from '@components/Section';
import PlaylistCard from '@components/PlaylistCard';
type Props = {
  playlists: SpotifyApi.PlaylistObjectSimplified[];
};
export default function SearchPlaylistResult({ playlists }: Props) {
  return (
    <Section>
      <Section.Header>
        <Section.Text>Playlists</Section.Text>
      </Section.Header>
      <Section.Content>
        {playlists.map((playlist) => (
          <Link href={`/playlist/${playlist.id}`} key={playlist.id}>
            <PlaylistCard playlist={playlist} />
          </Link>
        ))}
      </Section.Content>
    </Section>
  );
}
