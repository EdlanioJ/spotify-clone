'use client';

import ArtistCard from '@components/ArtistCard';
import Section from '@components/Section';
import Link from 'next/link';

type Props = {
  artists: SpotifyApi.ArtistObjectFull[];
};
export default function SearchArtistResult({ artists }: Props) {
  return (
    <Section>
      <Section.Header>
        <Section.Text>Artistas</Section.Text>
      </Section.Header>
      <Section.Content>
        {artists.map((artist) => (
          <Link href={`/artist/${artist.id}`} key={artist.id}>
            <ArtistCard artist={artist} />
          </Link>
        ))}
      </Section.Content>
    </Section>
  );
}
