'use client';

import { useCallback, useState } from 'react';

const SIDEBAR_WIDTH_STORE = '@sidebar/width';

export function useSidebarSize() {
  const [size, setSize] = useState(
    () => Number(localStorage.getItem(SIDEBAR_WIDTH_STORE)) || 335
  );

  const handleChangeWidth = useCallback((size: number) => {
    setSize(size);
    localStorage.setItem(SIDEBAR_WIDTH_STORE, String(size));
  }, []);

  return { size, setSize: handleChangeWidth };
}
