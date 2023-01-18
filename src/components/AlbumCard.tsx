'use client';

import Image from 'next/image';
import Card from './Card';

type Props = {
  album: SpotifyApi.AlbumObjectSimplified;
};

export default function AlbumCard({ album }: Props) {
  return (
    <Card>
      <Card.Image alt={album.name} src={album.images[1].url} />
      <Card.Title>{album.name}</Card.Title>
      <Card.Description>{album.artists[0].name}</Card.Description>
    </Card>
  );
}
