'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Slot } from '@radix-ui/react-slot';
import {
  BookmarkSimple,
  Books,
  Heart,
  House,
  MagnifyingGlass,
  Plus,
} from 'phosphor-react';

type Props = {
  playlists?: SpotifyApi.ListOfUsersPlaylistsResponse;
};

export default function Sidebar({ playlists }: Props) {
  return (
    <aside className="w-56 h-full bg-black flex-none text-gray-200">
      <div className="relative h-10 w-32 self-start mt-4 mx-2">
        <Link href="/">
          <Image
            src="/images/full-logo.png"
            className="object-contain h-10"
            alt="logo"
            fill
            sizes="100vw"
            priority
          />
        </Link>
      </div>
      <div className="flex flex-col gap-2 overflow-hidden mx-2 mt-4">
        <Link href="/">
          <Item>
            <Icon>
              <House weight="fill" />
            </Icon>
            <Text>Inicio</Text>
          </Item>
        </Link>

        <Link href="/search">
          <Item>
            <Icon>
              <MagnifyingGlass weight="bold" />
            </Icon>
            <Text>Buscar</Text>
          </Item>
        </Link>

        <Link href="/">
          <Item>
            <Icon>
              <Books />
            </Icon>
            <Text>Sua Biblioteca</Text>
          </Item>
        </Link>
      </div>
      <div className="mt-4 flex flex-col gap-2 mx-2">
        <Item>
          <div className=" flex items-center justify-center rounded-sm p-1 from-white to-slate-400 bg-gradient-to-br">
            <Plus className="text-black text-sm" weight="bold" />
          </div>
          <Text>Criar lista de reprodução</Text>
        </Item>

        <Item>
          <div className="flex items-center justify-center rounded-sm p-1 min-w-6 from-violet-900 to-violet-200 bg-gradient-to-br">
            <Heart className="text-slate-300 text-sm" weight="fill" />
          </div>
          <Text>Musica de que gosto</Text>
        </Item>

        <Item>
          <div className="flex items-center justify-center rounded-sm p-1 from-emerald-900 to-emerald-800 bg-gradient-to-br">
            <BookmarkSimple className="text-green-700 text-sm" weight="fill" />
          </div>
          <Text>Os teus episódio</Text>
        </Item>

        <div className="h-px w-full my-3 mb-3 bg-gray-700" />
      </div>
      <div className="w-full flex-1 overflow-y-scroll flex flex-col gap-2 pt-2 px-2 scrollbar-thin scrollbar-track-gray-300 scrollbar-thumb-black">
        {playlists &&
          playlists.items.map((playlist) => {
            return (
              <Link
                className="text-xs truncate font-medium"
                key={playlist.id}
                href={`/playlist/${playlist.id}`}
              >
                {playlist.name}
              </Link>
            );
          })}
      </div>
    </aside>
  );
}

type ItemProps = {
  children: React.ReactNode;
};
function Item({ children }: ItemProps) {
  return (
    <div className="flex items-center gap-2 text-center rounded px-2 py-1 shadow-sm ring-0 border-0 overflow-hidden">
      {children}
    </div>
  );
}

type IconProps = { children: React.ReactNode };
function Icon({ children }: IconProps) {
  return <Slot className="text-xl">{children}</Slot>;
}

type TextProps = { children: React.ReactNode };
function Text({ children }: TextProps) {
  return (
    <span className="font-bold text-xs truncate overflow-hidden">
      {children}
    </span>
  );
}
