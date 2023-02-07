'use client';

import Link from 'next/link';

import Section from './Section';
import AlbumCard from './AlbumCard';

type Props = {
  data: SpotifyApi.ListOfNewReleasesResponse;
};

export default function NewReleases({ data }: Props) {
  return (
    <Section>
      <Section.Header>
        <Section.Text>
          {data.message ?? 'Novos lançamentos populares'}
        </Section.Text>
        <Section.Text variant="link">Mostrar tudo</Section.Text>
      </Section.Header>
      <Section.Content className="grid-rows-[1fr]">
        {data.albums.items.map((album) => {
          return (
            <Link href={`/album/${album.id}`} key={album.id}>
              <AlbumCard album={album} />
            </Link>
          );
        })}
      </Section.Content>
    </Section>
  );
}
