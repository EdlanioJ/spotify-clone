'use client';

import Card from '@components/Card';
import PlayButton from '@components/PlayButton';
import Section from '@components/Section';
import Link from 'next/link';

type Props = {
  albums: SpotifyApi.AlbumObjectSimplified[];
};
export default function SearchAlbumsResult({ albums }: Props) {
  return (
    <Section>
      <Section.Header>
        <Section.Text>Álbuns</Section.Text>
      </Section.Header>
      <Section.Content>
        {albums.map((album) => (
          <Link key={album.id} href={`/album/${album.id}`}>
            <Card>
              <Card.Image
                alt={`Capa de ${album.name}`}
                src={album.images[0].url}
                playBtn={<PlayButton variant="card" />}
              />
              <Card.Title>{album.name}</Card.Title>
              <Card.Description>{`${new Date(
                album.release_date
              ).getFullYear()} • ${album.artists[0].name}`}</Card.Description>
            </Card>
          </Link>
        ))}
      </Section.Content>
    </Section>
  );
}
