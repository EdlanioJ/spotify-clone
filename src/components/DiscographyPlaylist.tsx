'use client';

import Link from 'next/link';
import Card from './Card';
import Section from './Section';

type Props = {
  albums: SpotifyApi.AlbumObjectSimplified[];
  artist: SpotifyApi.ArtistObjectSimplified;
};

export default function DiscographyPlaylist({ albums, artist }: Props) {
  const filteredAlbums = albums.sort((first, second) => {
    return (
      new Date(first.release_date).getTime() -
      new Date(second.release_date).getTime()
    );
  });

  return (
    <Section>
      <Section.Header>
        <Section.Text>{`Mais de ${artist.name}`}</Section.Text>
        <Section.Text variant="link">mostrar tudo</Section.Text>
      </Section.Header>
      <Section.Content className="grid-rows-[1fr]">
        {filteredAlbums.map((album) => {
          return (
            <Link href={`/album/${album.id}`} key={album.id}>
              <Card>
                <Card.Image alt={album.id} src={album.images[0].url} />
                <Card.Title>{album.name}</Card.Title>
                <Card.Description>
                  {new Date(album.release_date).getFullYear()}
                </Card.Description>
              </Card>
            </Link>
          );
        })}
      </Section.Content>
    </Section>
  );
}
