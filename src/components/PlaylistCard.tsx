'use client';

import Card from './Card';

type Props = {
  playlist: SpotifyApi.PlaylistObjectSimplified;
};
export default function PlaylistCard({ playlist }: Props) {
  return (
    <Card>
      <Card.Image alt={playlist.id} src={playlist.images[0].url} />
      <Card.Title>{playlist.name}</Card.Title>
      <Card.Description>{playlist.description}</Card.Description>
    </Card>
  );
}
