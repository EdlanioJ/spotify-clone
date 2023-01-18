'use client';

import React, { AnchorHTMLAttributes, Fragment, use } from 'react';
import { Menu as HeadlessMenu, Transition } from '@headlessui/react';
import clsx from 'clsx';
import { Session } from 'next-auth';
import Image from 'next/image';
import { ArrowSquareOut, CaretDown } from 'phosphor-react';
import { ToolTip } from './ToolTip';

type Props = {
  user?: Session['user'];
};
function Menu({ user }: Props) {
  return (
    <HeadlessMenu as="div" className="relative">
      <div>
        <ToolTip position="bottom" isLeft tooltip={user?.name}>
          <HeadlessMenu.Button
            type="button"
            className="inline-flex gap-2 items-center py-0.5 px-0.5 bg-black/75 min-h-6 rounded-full text-white font-semibold text-xs hover:bg-black/20 focus:bg-black/20 border-none transition-colors select-none overflow-hidden"
          >
            {user?.image && (
              <Image
                className="w-6 h-6 rounded-full overflow-hidden"
                src={user?.image}
                alt="user-profile"
                width={100}
                height={100}
                priority
              />
            )}
          </HeadlessMenu.Button>
        </ToolTip>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <HeadlessMenu.Items className="z-10 bg-zinc-800 px-1 py-1 text-white divide-y divide-white/10 rounded shadow-[0px_8px_24px_rgba(0,0,0,0.5)] text-xs absolute right-0 w-60 focus:outline-none">
          <div>
            <MenuItem href="#">
              <span>Conta</span>
              <ArrowSquareOut className="text-lg" />
            </MenuItem>
            <MenuItem href="#">
              <span>Perfil</span>
            </MenuItem>
            <MenuItem href="#">
              <span>Faça upgrade para o Premium</span>
              <ArrowSquareOut className="text-lg" />
            </MenuItem>
            <MenuItem href="#">
              <span>Sessão particular</span>
            </MenuItem>

            <MenuItem href="#">
              <span>Preferências</span>
            </MenuItem>
          </div>
          <div>
            <MenuItem href="#">
              <span>Sair</span>
            </MenuItem>
          </div>
        </HeadlessMenu.Items>
      </Transition>
    </HeadlessMenu>
  );
}

interface MenuItemProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children?: React.ReactNode;
}

function MenuItem({ children, ...rest }: MenuItemProps) {
  return (
    <HeadlessMenu.Item>
      {({ active }) => (
        <a
          className={clsx(
            'flex gap-2 px-2 py-3 flex-1 justify-between items-center rounded transition-colors',
            active ? 'bg-zinc-700' : 'bg-zinc-800'
          )}
          {...rest}
        >
          {children}
        </a>
      )}
    </HeadlessMenu.Item>
  );
}

export default Menu;
