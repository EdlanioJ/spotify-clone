import { authOptions } from '@api/auth/[...nextauth]';
import { Recolor } from '@context/ColorContext';
import { spotifyApi } from '@libs/spotify';
import { getServerSession } from 'next-auth';
import SearchAlbumsResult from './SearchAlbumsResult';
import SearchArtistResult from './SearchArtistsResult';
import SearchEpisodesResult from './SearchEpisodesResult';
import SearchPlaylistResult from './SearchPlaylistResult';
import SearchShowsResult from './SearchShowsResult';
import SearchTracksResult from './SearchTracksResult';

type Props = {
  params: { query: string };
};

async function fetchData(query: string) {
  const session = await getServerSession(authOptions);
  const accessToken = session?.accessToken as string;
  spotifyApi.setAccessToken(accessToken);

  const { body: search } = await spotifyApi.search(query, [
    'album',
    'artist',
    'episode',
    'playlist',
    'show',
    'track',
  ]);

  return search;
}

export default async function QueryPage({ params }: Props) {
  const { tracks, artists, albums, playlists, shows, episodes } =
    await fetchData(params.query);
  return (
    <div className="pb-20">
      {tracks && tracks.items.length !== 0 && (
        <SearchTracksResult tracks={tracks.items} />
      )}
      {artists && artists.items.length !== 0 && (
        <SearchArtistResult artists={artists.items} />
      )}
      {albums && albums.items.length !== 0 && (
        <SearchAlbumsResult albums={albums.items} />
      )}
      {playlists && playlists.items.length !== 0 && (
        <SearchPlaylistResult playlists={playlists.items} />
      )}

      {shows && shows.items.length !== 0 && (
        <SearchShowsResult shows={shows.items} />
      )}

      {episodes && episodes.items.length !== 0 && (
        <SearchEpisodesResult episodes={episodes.items} />
      )}
      <Recolor />
    </div>
  );
}
