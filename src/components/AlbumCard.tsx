'use client';

import Card from './Card';
import PlayButton from './PlayButton';

type Props = {
  album: SpotifyApi.AlbumObjectSimplified;
};

export default function AlbumCard({ album }: Props) {
  return (
    <Card>
      <Card.Image
        alt={album.name}
        src={album.images[1].url}
        playBtn={<PlayButton variant="card" />}
      />
      <Card.Title>{album.name}</Card.Title>
      <Card.Description>{album.artists[0].name}</Card.Description>
    </Card>
  );
}
