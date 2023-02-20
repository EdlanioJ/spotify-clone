import { authOptions } from '@api/auth/[...nextauth]';
import { spotifyApi } from '@libs/spotify';
import { getServerSession } from 'next-auth';

async function fetchData() {
  const session = await getServerSession(authOptions);
  const accessToken = session?.accessToken as string;
  spotifyApi.setAccessToken(accessToken);
  const { body: categories } = await spotifyApi.getCategories({
    limit: 50,
  });

  return categories;
}
export default async function SearchPage() {
  const categories = await fetchData();
  return (
    <div className="">
      <h1>Pagina de pesquisa</h1>
    </div>
  );
}
