import { unstable_getServerSession } from 'next-auth/next';

import { spotifyApi } from '@libs/spotify';
import { authOptions } from '@api/auth/[...nextauth]';

import CategoryList from '@components/CategoryList';
import NewReleases from '@components/NewReleases';
import FeaturedPlaylist from '@components/FeaturedPlaylist';
import { Recolor } from '@context/ColorContext';

async function fetchData() {
  const session = await unstable_getServerSession(authOptions);

  const accessToken = session?.accessToken as string;
  spotifyApi.setAccessToken(accessToken);

  const [
    { body: newReleases },
    { body: featuredPlaylist },
    { body: categories },
  ] = await Promise.all([
    spotifyApi.getNewReleases(),
    spotifyApi.getFeaturedPlaylists(),
    spotifyApi.getCategories(),
  ]);

  return { newReleases, featuredPlaylist, categories };
}

export default async function HomePage() {
  const { newReleases, featuredPlaylist, categories } = await fetchData();

  return (
    <div className="pb-20">
      <NewReleases data={newReleases} />
      <CategoryList data={categories} />
      <FeaturedPlaylist data={featuredPlaylist} />
      <Recolor />
    </div>
  );
}
