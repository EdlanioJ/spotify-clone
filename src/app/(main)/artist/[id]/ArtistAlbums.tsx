'use client';

import Card from '@components/Card';
import Section from '@components/Section';
import Link from 'next/link';
import { useEffect, useState } from 'react';

type Props = {
  albums: SpotifyApi.AlbumObjectSimplified[];
  singles: SpotifyApi.AlbumObjectSimplified[];
};

export default function ArtistAlbums({ albums, singles }: Props) {
  const [filteredAlbums, setFilteredAlbums] = useState<
    SpotifyApi.AlbumObjectSimplified[]
  >([]);
  const [filter, setFilter] = useState<'album' | 'single'>(
    albums.length !== 0 ? 'album' : 'single'
  );

  useEffect(() => {
    if (filter === 'album') {
      setFilteredAlbums(albums);
    }

    if (filter === 'single') {
      setFilteredAlbums(singles);
    }
  }, [filter, albums, singles]);

  return (
    <Section>
      <Section.Header>
        <Section.Text>Discografia</Section.Text>
        <Section.Text variant="link">Mostrar tudo</Section.Text>
      </Section.Header>
      <div className="flex gap-2 text-xs font-semibold">
        {albums.length !== 0 && (
          <button
            className="p-1 px-2 rounded-full bg-gray-300 text-white disabled:bg-white disabled:text-gray-900"
            onClick={() => setFilter('album')}
            disabled={filter === 'album'}
          >
            Álbum
          </button>
        )}

        {singles.length !== 0 && (
          <button
            className="p-1 px-2 rounded-full bg-gray-300 text-white disabled:bg-white disabled:text-gray-900"
            onClick={() => setFilter('single')}
            disabled={filter === 'single'}
          >
            Single e EP
          </button>
        )}
      </div>
      <Section.Content className="grid-rows-[1fr]">
        {filteredAlbums.map((album) => {
          return (
            <Link href={`/album/${album.id}`} key={album.id}>
              <Card>
                <Card.Image alt={album.id} src={album.images[0].url} />
                <Card.Title>{album.name}</Card.Title>
                <Card.Description>
                  {`${new Date(album.release_date).getFullYear()} • ${
                    album.album_group === 'album' ? 'Álbum' : album.album_type
                  }`}
                </Card.Description>
              </Card>
            </Link>
          );
        })}
      </Section.Content>
    </Section>
  );
}
