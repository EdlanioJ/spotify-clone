import { getServerSession } from 'next-auth';

import { authOptions } from '@api/auth/[...nextauth]';
import { spotifyApi } from '@libs/spotify';

import Cover from './Cover';
import ArtistTopTracks from './ArtistTopTracks';
import ArtistAlbums from './ArtistAlbums';
import ArtistAppearsOn from './ArtistAppearsOn';
import ArtistRelated from './ArtistRelated';
import Line from '@components/Line';

type Props = {
  params: { id: string };
};

async function fetchData(artistId: string) {
  const session = await getServerSession(authOptions);
  const accessToken = session?.accessToken as string;

  spotifyApi.setAccessToken(accessToken);
  const [
    { body: artist },
    { body: artistRelatedArtists },
    { body: artistTopTracks },
    { body: artistAlbums },
    { body: artistAppearsOn },
    { body: artistSingles },
  ] = await Promise.all([
    spotifyApi.getArtist(artistId),
    spotifyApi.getArtistRelatedArtists(artistId),
    spotifyApi.getArtistTopTracks(artistId, 'us'),
    spotifyApi.getArtistAlbums(artistId, { include_groups: 'album' }),
    spotifyApi.getArtistAlbums(artistId, { include_groups: 'appears_on' }),
    spotifyApi.getArtistAlbums(artistId, { include_groups: 'single' }),
  ]);

  return {
    artist,
    artistRelatedArtists: artistRelatedArtists.artists,
    artistTopTracks: artistTopTracks.tracks,
    artistAlbums: artistAlbums.items,
    artistSingles: artistSingles.items,
    artistAppearsOn: artistAppearsOn.items,
  };
}

export default async function Page({ params }: Props) {
  const {
    artist,
    artistAlbums,
    artistSingles,
    artistTopTracks,
    artistAppearsOn,
    artistRelatedArtists,
  } = await fetchData(params.id);

  return (
    <div className="absolute top-0 w-full">
      <Cover artist={artist} />
      <ArtistTopTracks tracks={artistTopTracks} />
      <ArtistAlbums albums={artistAlbums} singles={artistSingles} />
      {artistRelatedArtists && artistRelatedArtists.length !== 0 && (
        <ArtistRelated artists={artistRelatedArtists} />
      )}

      {artistAppearsOn && artistAppearsOn.length !== 0 && (
        <ArtistAppearsOn albums={artistAppearsOn} artist={artist.name} />
      )}
      <Line />
    </div>
  );
}
