'use client';

import Card from '@components/Card';
import PlayButton from '@components/PlayButton';
import Section from '@components/Section';

type Props = {
  shows: SpotifyApi.SavedShowObject[];
};
export default function MySavedShows({ shows }: Props) {
  return (
    <Section>
      <Section.Header>
        <Section.Text>Meus Podcasts</Section.Text>
      </Section.Header>
      <Section.Content>
        {shows.map((show) => (
          <Card key={show.show.id}>
            <Card.Image
              alt={`Capa do podcast ${show.show.name}`}
              src={show.show.images[0].url}
              playBtn={<PlayButton variant="card" />}
            />
            <Card.Title>{show.show.name}</Card.Title>
            <Card.Description>{show.show.publisher}</Card.Description>
          </Card>
        ))}
      </Section.Content>
    </Section>
  );
}
