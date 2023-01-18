'use client';

import ArtistCard from '@components/ArtistCard';
import Section from '@components/Section';
import Link from 'next/link';

type Props = {
  artists: SpotifyApi.ArtistObjectFull[];
};

export default function ArtistRelated({ artists }: Props) {
  return (
    <Section>
      <Section.Header>
        <Section.Text>Os fãs também gostam</Section.Text>
        <Section.Text variant="link">Mostrar tudo</Section.Text>
      </Section.Header>
      <Section.Content className="grid-rows-[1fr]">
        {artists.map((artist) => (
          <Link href={`/artist/${artist.id}`} key={artist.id}>
            <ArtistCard artist={artist} />
          </Link>
        ))}
      </Section.Content>
    </Section>
  );
}
