import { authOptions } from '@api/auth/[...nextauth]';
import { spotifyApi } from '@libs/spotify';
import { unstable_getServerSession } from 'next-auth';

type Props = {
  params: {
    id: string;
  };
};

async function fetchData(id: string) {
  const session = await unstable_getServerSession(authOptions);
  const accessToken = session?.accessToken as string;

  spotifyApi.setAccessToken(accessToken);
  const { body } = await spotifyApi.getArtist(id);
  return body;
}

export default async function Head({ params }: Props) {
  const artist = await fetchData(params.id);

  return (
    <>
      <title>{`Spotify — ${artist.name}`}</title>
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      <link rel="icon" href="/favicon.ico" />
    </>
  );
}
