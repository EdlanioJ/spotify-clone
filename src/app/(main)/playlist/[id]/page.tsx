import { authOptions } from '@api/auth/[...nextauth]';
import PlaylistCover from '@components/PlaylistCover';
import TrackTable from '@components/TrackTable';
import { spotifyApi } from '@libs/spotify';
import { getServerSession } from 'next-auth';

type PageProps = {
  params: {
    id: string;
  };
};

async function fetchData(id: string) {
  const session = await getServerSession(authOptions);

  const accessToken = session?.accessToken as string;
  spotifyApi.setAccessToken(accessToken);
  const { body } = await spotifyApi.getPlaylist(id);

  return body;
}

export default async function Page({ params }: PageProps) {
  const playlist = await fetchData(params.id);

  return (
    <div className="absolute top-0">
      <PlaylistCover playlist={playlist} />
      <TrackTable tracks={playlist.tracks} />
    </div>
  );
}
