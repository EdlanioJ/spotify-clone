'use client';

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { getPalette } from '@lauriys/react-palette';

type ColorProps = {
  color: string;
  getColor(url: string): Promise<void>;
  resetColor(): void;
};

const ColorContext = createContext({} as ColorProps);

type Props = {
  children: React.ReactNode;
};

export function ColorProvider({ children }: Props) {
  const [color, setColor] = useState('#121212');

  const resetColor = useCallback(() => {
    setColor('#121212');
  }, []);
  const getColor = useCallback(async (url: string) => {
    try {
      const palette = await getPalette(url);
      if (palette.vibrant) {
        setColor(palette.vibrant);
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <ColorContext.Provider value={{ color, getColor, resetColor }}>
      {children}
    </ColorContext.Provider>
  );
}

export function useResetColorEffect() {
  const { resetColor } = useColor();
  useEffect(() => {
    resetColor();
  }, [resetColor]);
}

export function Recolor() {
  const { resetColor } = useColor();
  useEffect(() => {
    resetColor();
  }, [resetColor]);

  return null;
}

export function useColor() {
  const context = useContext(ColorContext);

  return context;
}
