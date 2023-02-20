'use client';

import Section from '@components/Section';
import Link from 'next/link';
import PlaylistCard from './PlaylistCard';

type Props = {
  data: SpotifyApi.ListOfFeaturedPlaylistsResponse;
};

export default function FeaturedPlaylist({ data }: Props) {
  return (
    <Section>
      <Section.Header>
        <Section.Text>{data?.message}</Section.Text>
        <Section.Text variant="link">Mostrar tudo</Section.Text>
      </Section.Header>
      <Section.Content>
        {data.playlists.items.map((playlist) => {
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
