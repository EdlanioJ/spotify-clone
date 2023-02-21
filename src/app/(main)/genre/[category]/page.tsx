import { getServerSession } from 'next-auth';
import { authOptions } from '@api/auth/[...nextauth]';
import { spotifyApi } from '@libs/spotify';
import { CategoryCover } from '@components/CategoryCover';
import { CategoryPlaylists } from '@components/CategoryPlaylists';
import Line from '@components/Line';

type PageProps = {
  params: {
    category: string;
  };
};

async function fetchData(category: string) {
  const session = await getServerSession(authOptions);
  const accessToken = session?.accessToken as string;
  spotifyApi.setAccessToken(accessToken);
  const [
    { body: genre },
    {
      body: { playlists },
    },
  ] = await Promise.all([
    spotifyApi.getCategory(category),
    spotifyApi.getPlaylistsForCategory(category),
  ]);

  return { genre, playlists };
}

export default async function Page({ params }: PageProps) {
  const { genre, playlists } = await fetchData(params.category);

  return (
    <div className="w-full">
      <CategoryCover data={genre} />
      <CategoryPlaylists playlists={playlists.items} />
      <Line />
    </div>
  );
}
