import { useResetColorEffect } from '@context/ColorContext';

export default function Template({ children }: { children: React.ReactNode }) {
  useResetColorEffect();
  return <>{children}</>;
}
