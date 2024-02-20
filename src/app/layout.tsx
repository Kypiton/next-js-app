import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import './globals.css';
import Header from '@/components/header/Header';
import FirstSection from '@/components/firstSection/FirstSection';
import Footer from '@/components/footer/Footer';

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
        {children}
        <Footer />
      </body>
    </html>
  );
}
