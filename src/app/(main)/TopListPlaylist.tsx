'use client';

import Card from '@components/Card';
import PlayButton from '@components/PlayButton';
import Section from '@components/Section';
import Link from 'next/link';

type Props = {
  playlists: SpotifyApi.PlaylistObjectSimplified[];
};
export default function TopListPlaylist({ playlists }: Props) {
  return (
    <Section>
      <Section.Header>
        <Section.Text>Top list</Section.Text>
        <Section.Text variant="link">Mostrar Tudo</Section.Text>
      </Section.Header>
      <Section.Content>
        {playlists.map((playlist) => (
          <Link href={`/playlist/${playlist.id}`} key={playlist.id}>
            <Card>
              <Card.Image
                alt={`Capa da playlist ${playlist.name}`}
                src={playlist.images[0].url}
                playBtn={<PlayButton variant="card" />}
              />
              <Card.Title>{playlist.name}</Card.Title>
              <Card.Description>{playlist.description}</Card.Description>
            </Card>
          </Link>
        ))}
      </Section.Content>
    </Section>
  );
}
