'use client';

import Card from '@components/Card';
import PlayButton from '@components/PlayButton';
import Section from '@components/Section';

type Props = {
  shows: SpotifyApi.ShowObjectSimplified[];
};
export default function SearchShowsResult({ shows }: Props) {
  return (
    <Section>
      <Section.Header>
        <Section.Text>Podcasts</Section.Text>
      </Section.Header>
      <Section.Content>
        {shows.map((show) => (
          <Card key={show.id}>
            <Card.Image
              alt={`Capa do show ${show.name}`}
              src={show.images[0].url}
              playBtn={<PlayButton variant="card" />}
            />
            <Card.Title>{show.name}</Card.Title>
            <Card.Description>{show.publisher}</Card.Description>
          </Card>
        ))}
      </Section.Content>
    </Section>
  );
}
