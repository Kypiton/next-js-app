import type { Metadata } from 'next';
import { Suspense } from 'react';
import { Roboto } from 'next/font/google';

import Loading from './loading';

import './globals.css';

const roboto = Roboto({ weight: ['100', '300', '400', '500', '700', '900'], subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Чіп Чендж',
  description: 'Обмінник валют - навчальний',
};

export default async function RootLayout({
  children,
  info,
  footer,
  header,
}: Readonly<{
  children: React.ReactNode;
  info: React.ReactNode;
  footer: React.ReactNode;
  header: React.ReactNode;
}>) {
  return (
    <html lang='uk-UA'>
      <body className={roboto.className}>
        {header}
        {info}
        <Suspense fallback={<Loading />}>{children}</Suspense>
        {footer}
      </body>
    </html>
  );
}
