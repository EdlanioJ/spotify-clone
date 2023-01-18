'use client';

import Image from 'next/image';

type Props = {
  category: SpotifyApi.CategoryObject;
};
export default function CategoryCard({ category }: Props) {
  return (
    <div className="relative flex justify-center text-white object-contain w-full rounded overflow-hidden shadow-[0px_8px_24px_rgba(0,0,0,0.5)] text-center cursor-pointer group select-none">
      <Image
        alt={category.id}
        src={category.icons[0].url}
        className="w-full shadow-[0px_8px_24px_rgba(0,0,0,0.5)]"
        width={100}
        height={100}
      />
      <span className="absolute top-[72%] text-sm font-bold">
        {category.name}
      </span>
      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-all"></div>
    </div>
  );
}
