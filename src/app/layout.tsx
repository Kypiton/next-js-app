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

export default function RootLayout({
  children,
  firstSection,
  footer,
  header,
}: Readonly<{
  children: React.ReactNode;
  firstSection: React.ReactNode;
  footer: React.ReactNode;
  header: React.ReactNode;
}>) {
  return (
    <html lang='uk-UA'>
      <body className={roboto.className}>
        {header}
        {firstSection}
        <Suspense fallback={<Loading />}>{children}</Suspense>
        {footer}
      </body>
    </html>
  );
}
