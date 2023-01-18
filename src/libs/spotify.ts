import SpotifyWebApi from 'spotify-web-api-node';

export const Scopes = [
  'user-read-email',
  'app-remote-control',
  'playlist-read-private',
  'playlist-modify-private',
  'playlist-modify-public',
  'playlist-read-collaborative',
  'user-read-playback-position',
  'user-read-email',
  'streaming',
  'user-read-private',
  'user-library-read',
  'user-top-read',
  'user-library-modify',
  'user-read-playback-state',
  'user-modify-playback-state',
  'user-read-currently-playing',
  'user-read-recently-played',
  'user-follow-read',
  'user-follow-modify',
];

const params = {
  scope: Scopes.join(','),
};

const queryParamString = new URLSearchParams(params);

export const authorizationUrl = 'https://accounts.spotify.com/authorize';

export const loginUrl =
  'https://accounts.spotify.com/authorize?' + queryParamString.toString();

export const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
});
