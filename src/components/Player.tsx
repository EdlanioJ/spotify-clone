'use client';

import Image from 'next/image';
import {
  Heart,
  MicrophoneStage,
  Play,
  Queue,
  Radio,
  Repeat,
  Shuffle,
  SkipBack,
  SkipForward,
  SpeakerHigh,
} from 'phosphor-react';
import { ToolTip } from './ToolTip';

type Props = {
  currentPlayingTrack?: SpotifyApi.CurrentlyPlayingResponse;
};
export default function Player({ currentPlayingTrack }: Props) {
  return (
    <footer className="w-full h-[10vh] text-gray-100 bg-gray-300 z-[100] grid grid-cols-12 gap-10 items-center justify-between px-3 border-[#272727]">
      {/** Player Track Info */}
      <div className="flex items-center col-span-3 gap-3">
        <Image
          alt="Cover"
          src="https://github.com/edlanioj.png"
          width={100}
          height={100}
          className="w-12 h-12"
        />
        <div className="max-w-full">
          <h2 className="text-sm font-semibold truncate cursor-pointer hover:underline">
            Rich Flex
          </h2>
          <span className="text-xs font-medium truncate leading-[0] hover:underline cursor-pointer">
            Drake, 21 Savage
          </span>
        </div>
        <div>
          <ToolTip tooltip="Guardar em A tua biblioteca">
            <Heart weight="bold" className="text-sm text-gray-100" />
          </ToolTip>
        </div>
      </div>
      {/** Main Controller */}
      <div className="flex flex-col justify-center items-center col-span-6 gap-3">
        <div className="flex items-center gap-5 text-lg">
          <Shuffle />
          <SkipBack weight="fill" />
          <ToolTip tooltip="Reproduzir">
            <button
              type="button"
              className="flex items-center justify-center w-8 h-8 text-2xl text-black bg-white rounded-full focus:outline-none"
            >
              <Play weight="fill" className="text-sm" />
            </button>
          </ToolTip>
          <SkipForward weight="fill" />
          <Repeat />
        </div>
        <div className="flex items-center justify-center w-full gap-5">
          <span className="text-xs font-semibold">0:00</span>
          <input type="range" className="player" />
          <span className="text-xs font-semibold">0:00</span>
        </div>
      </div>
      <div className="flex items-center col-span-3 gap-3">
        <MicrophoneStage />
        <ToolTip tooltip="Fila">
          <Queue />
        </ToolTip>
        <ToolTip tooltip="Ligar a um dispositivo">
          <Radio />
        </ToolTip>
        <ToolTip tooltip="Silenciar">
          <SpeakerHigh />
        </ToolTip>
        <div className="w-20 mt-3">
          <div className="relative w-full pt-1 ">
            <div className="flex h-1 mb-4  overflow-hidden text-xs bg-[#535353] rounded">
              <div className="flex flex-col justify-center w-1/3 text-center text-white shadow-none bg-gray whitespace-nowrap"></div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
