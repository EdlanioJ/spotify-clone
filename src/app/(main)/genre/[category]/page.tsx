import { authOptions } from '@api/auth/[...nextauth]';
import { CategoryCover } from '@components/CategoryCover';
import { CategoryPlaylists } from '@components/CategoryPlaylists';
import { spotifyApi } from '@libs/spotify';
import { unstable_getServerSession } from 'next-auth';

type PageProps = {
  params: {
    category: string;
  };
};

async function fetchData(category: string) {
  const session = await unstable_getServerSession(authOptions);
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
    </div>
  );
}
