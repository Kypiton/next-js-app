import type { Metadata } from 'next';
import { Suspense } from 'react';
import { Roboto } from 'next/font/google';

import Header from '@/components/header/Header';
import FirstSection from '@/components/firstSection/FirstSection';
import Footer from '@/components/footer/Footer';
import Loading from './loading';

import './globals.css';

const roboto = Roboto({ weight: ['100', '300', '400', '500', '700', '900'], subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Чіп Чендж',
  description: 'Обмінник валют - навчальний',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='uk-UA'>
      <body className={roboto.className}>
        <Header />
        <FirstSection />
        <Suspense fallback={<Loading />}>{children}</Suspense>
        <Footer />
      </body>
    </html>
  );
}
