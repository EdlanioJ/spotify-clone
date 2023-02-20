'use client';

import Card from '@components/Card';
import PlayButton from '@components/PlayButton';
import Section from '@components/Section';
import { formatCurrentDate } from '@utils/formatCurrentDate';
import { millisecondsToDuration } from '@utils/millisecondsToDuration';

type Props = {
  episodes: SpotifyApi.EpisodeObjectSimplified[];
};
export default function SearchEpisodesResult({ episodes }: Props) {
  return (
    <Section>
      <Section.Header>
        <Section.Text>Episódios</Section.Text>
      </Section.Header>
      <Section.Content>
        {episodes.map((episode) => (
          <Card key={episode.id}>
            <Card.Image
              alt={`Capa do episódio ${episode.name}`}
              src={episode.images[0].url}
              playBtn={<PlayButton variant="card" />}
            />
            <Card.Title>{episode.name}</Card.Title>
            <Card.Description>{`${formatCurrentDate(
              episode.release_date
            )} · ${millisecondsToDuration(
              episode.duration_ms
            )}`}</Card.Description>
          </Card>
        ))}
      </Section.Content>
    </Section>
  );
}
