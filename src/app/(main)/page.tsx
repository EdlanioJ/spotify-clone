import { getServerSession } from 'next-auth/next';

import { spotifyApi } from '@libs/spotify';
import { authOptions } from '@api/auth/[...nextauth]';

import NewReleases from '@components/NewReleases';
import FeaturedPlaylist from '@components/FeaturedPlaylist';
import { Recolor } from '@context/ColorContext';
import MySavedShows from './MySavedShows';
import TopListPlaylist from './TopListPlaylist';
import MyRecentlyPlayed from './MyRecentlyPlayed';
import Line from '@components/Line';

async function fetchData() {
  const session = await getServerSession(authOptions);

  const accessToken = session?.accessToken as string;
  spotifyApi.setAccessToken(accessToken);

  const [
    { body: newReleases },
    { body: featuredPlaylist },
    { body: mySavedShows },
    { body: topLists },
    { body: myRecentlyPlayedTracks },
  ] = await Promise.all([
    spotifyApi.getNewReleases(),
    spotifyApi.getFeaturedPlaylists(),
    spotifyApi.getMySavedShows(),
    spotifyApi.getPlaylistsForCategory('toplists'),
    spotifyApi.getMyRecentlyPlayedTracks(),
  ]);

  const artistIds = myRecentlyPlayedTracks.items
    .filter((value) => value.context && value.context.type === 'artist')
    .map((value) => {
      const url = value.context.uri.split(':');
      const id = url[url.length - 1];
      return id;
    })
    .filter((value, index, self) => {
      return self.indexOf(value) === index;
    });

  const playlistIds = myRecentlyPlayedTracks.items
    .filter((value) => value.context && value.context.type === 'playlist')
    .map((value) => {
      const url = value.context.uri.split(':');
      const id = url[url.length - 1];
      return id;
    })
    .filter((value, index, self) => {
      return self.indexOf(value) === index;
    });

  const { body: artists } = await spotifyApi.getArtists(artistIds);

  const artistsInMyRecentlyPlayed = artists.artists.reduce<{
    [key: string]: SpotifyApi.ArtistObjectFull;
  }>((lookup, artist) => {
    lookup[artist.uri] = artist;
    return lookup;
  }, {});

  const playlists = await Promise.all(
    playlistIds.map((playlistId) => spotifyApi.getPlaylist(playlistId))
  );

  const playlistsInMyRecentlyPlayed = playlists.reduce<{
    [key: string]: SpotifyApi.PlaylistObjectSimplified;
  }>((lookup, playlist) => {
    lookup[playlist.body.uri] = playlist.body;
    return lookup;
  }, {});

  return {
    topLists,
    newReleases,
    mySavedShows,
    featuredPlaylist,
    myRecentlyPlayedTracks,
    artistsInMyRecentlyPlayed,
    playlistsInMyRecentlyPlayed,
  };
}

export default async function HomePage() {
  const {
    topLists,
    newReleases,
    mySavedShows,
    featuredPlaylist,
    myRecentlyPlayedTracks,
    artistsInMyRecentlyPlayed,
    playlistsInMyRecentlyPlayed,
  } = await fetchData();

  return (
    <div>
      <MyRecentlyPlayed
        playHistory={myRecentlyPlayedTracks.items}
        artists={artistsInMyRecentlyPlayed}
        playlists={playlistsInMyRecentlyPlayed}
      />
      {mySavedShows && mySavedShows.items.length !== 0 && (
        <MySavedShows shows={mySavedShows.items} />
      )}
      <NewReleases data={newReleases} />
      <TopListPlaylist playlists={topLists.playlists.items} />
      <FeaturedPlaylist data={featuredPlaylist} />

      <Line />
      <Recolor />
    </div>
  );
}
