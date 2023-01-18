'use client';

type Props = {
  data: SpotifyApi.SingleCategoryResponse;
};

export function CategoryCover({ data }: Props) {
  return (
    <div className="w-full pt-16 px-4 pb-6">
      <span className="text-zinc-300 font-bold text-7xl">{data.name}</span>
    </div>
  );
}
