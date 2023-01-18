'use client';

import { createContext, useContext, useEffect, useRef, useState } from 'react';

type ContextProps = {
  scrollY: number;
};

export const ScrollContext = createContext({} as ContextProps);

type ProviderProps = {
  children: React.ReactNode;
};
export function ScrollProvider({ children }: ProviderProps) {
  const [scrollY, setScrollY] = useState(0);
  const mainRef = useRef<HTMLDivElement>(null);
  const onScroll = () => {
    if (!mainRef.current) {
      setScrollY(0);
      return;
    }

    setScrollY(mainRef.current.scrollTop);
  };

  useEffect(() => {
    mainRef.current?.addEventListener('scroll', onScroll);
  }, []);

  return (
    <ScrollContext.Provider value={{ scrollY }}>
      <div
        className="w-full h-full relative overflow-y-scroll overflow-x-hidden scrollbar scrollbar-track-transparent scrollbar-thumb-gray-100"
        ref={mainRef}
      >
        {children}
      </div>
    </ScrollContext.Provider>
  );
}

export function useScroll() {
  const ctx = useContext(ScrollContext);

  return ctx;
}
