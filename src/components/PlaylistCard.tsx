'use client';

import Card from './Card';
import PlayButton from './PlayButton';

type Props = {
  playlist: SpotifyApi.PlaylistObjectSimplified;
};
export default function PlaylistCard({ playlist }: Props) {
  return (
    <Card>
      {!playlist.images[0] ? (
        <Card.Cover playBtn={<PlayButton variant="card" />} />
      ) : (
        <Card.Image
          alt={playlist.id}
          src={playlist.images[0].url}
          playBtn={<PlayButton variant="card" />}
        />
      )}
      <Card.Title>{playlist.name}</Card.Title>
      <Card.Description>{playlist.description}</Card.Description>
    </Card>
  );
}
