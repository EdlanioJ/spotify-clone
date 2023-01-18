'use client';

import { useId } from 'react';

export function InputRange({ ...rest }) {
  const id = useId();

  return <input type="range" id={id} {...rest} />;
}
