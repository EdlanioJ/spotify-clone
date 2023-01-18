import { authOptions } from '@api/auth/[...nextauth]';
import AlbumCover from '@components/AlbumCover';
import AlbumTrackTable from '@components/AlbumTrackTable';
import DiscographyPlaylist from '@components/DiscographyPlaylist';
import { spotifyApi } from '@libs/spotify';
import { unstable_getServerSession } from 'next-auth';

type PageProps = {
  params: {
    id: string;
  };
};

async function fetchData(id: string) {
  const session = await unstable_getServerSession(authOptions);

  const accessToken = session?.accessToken as string;
  spotifyApi.setAccessToken(accessToken);
  const { body: album } = await spotifyApi.getAlbum(id);

  const { body: discography } = await spotifyApi.getArtistAlbums(
    album.artists[0].id
  );

  return { album, discography };
}

export default async function Page({ params }: PageProps) {
  const { album, discography } = await fetchData(params.id);

  return (
    <div className="absolute w-full top-0 pb-14">
      <AlbumCover album={album} />
      <AlbumTrackTable tracks={album.tracks} />
      <div className="mt-4 mb-6 px-4 text-[12px] font-semibold text-gray-100 flex flex-col">
        <div className="text-xs mb-1">
          <span>
            {new Date(album.release_date).toLocaleDateString('pt-BR', {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
            })}
          </span>
        </div>

        {album.copyrights.map((copyright, index) => (
          <div key={index}>
            <span>{copyright.text}</span>
          </div>
        ))}
      </div>
      <DiscographyPlaylist
        artist={album.artists[0]}
        exceptAlbumId={album.id}
        albums={discography.items}
      />
    </div>
  );
}
