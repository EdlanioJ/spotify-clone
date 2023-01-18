import { authOptions } from '@api/auth/[...nextauth]';
import { spotifyApi } from '@libs/spotify';
import { unstable_getServerSession } from 'next-auth';

type Props = {
  params: { category: string };
};

async function fetchData(category: string) {
  const session = await unstable_getServerSession(authOptions);
  const accessToken = session?.accessToken as string;

  spotifyApi.setAccessToken(accessToken);
  const { body } = await spotifyApi.getCategory(category);
  return body;
}

export default async function Head({ params }: Props) {
  const category = await fetchData(params.category);

  return (
    <>
      <title>{`${category.name} on Spotify`}</title>
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      <link rel="icon" href="/favicon.ico" />
    </>
  );
}
