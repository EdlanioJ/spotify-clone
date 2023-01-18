import '../../../styles/globals.css';

import { Montserrat } from '@next/font/google';

const montserrat = Montserrat({
  style: ['normal'],
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className={montserrat.className}>
      <head />
      <body>{children}</body>
    </html>
  );
}
