import { authOptions } from '@api/auth/[...nextauth]';
import { spotifyApi } from '@libs/spotify';
import { getServerSession } from 'next-auth';

type Props = {
  params: {
    id: string;
  };
};

export default async function Head({ params }: Props) {
  const session = await getServerSession(authOptions);
  const accessToken = session?.accessToken as string;

  spotifyApi.setAccessToken(accessToken);
  const { body: album } = await spotifyApi.getAlbum(params.id);

  return (
    <>
      <title>{`Spotify — ${album.name}`}</title>
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      <link rel="icon" href="/favicon.ico" />
    </>
  );
}
