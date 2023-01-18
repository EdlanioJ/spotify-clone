'use client';

import Card from '@components/Card';
import Section from '@components/Section';
import Link from 'next/link';

type Props = {
  artist: string;
  albums: SpotifyApi.AlbumObjectSimplified[];
};

export default function ArtistAppearsOn({ albums, artist }: Props) {
  return (
    <Section>
      <Section.Header>
        <Section.Text>{`Inclui ${artist}`}</Section.Text>
        <Section.Text variant="link">Mostrar tudo</Section.Text>
      </Section.Header>
      <Section.Content className="grid-rows-[1fr]">
        {albums.map((album) => {
          return (
            <Link href={`/album/${album.id}`} key={album.id}>
              <Card>
                <Card.Image alt={album.id} src={album.images[0].url} />
                <Card.Title>{album.name}</Card.Title>
                <Card.Description>{album.artists[0].name}</Card.Description>
              </Card>
            </Link>
          );
        })}
      </Section.Content>
    </Section>
  );
}
