import Image from 'next/image';
import Link from 'next/link';

import Navigation from '../_components/ui/Navigation';
import Logo from '../_components/ui/Logo';

export default function Header() {
  return (
    <header className='flex items-center px-24 py-8 bg-sky-100'>
      <Logo />
      <Navigation
        ml='ml-16'
        fontWeight='font-normal'
        navProps='flex justify-center items-center gap-12 text-gray-400 text-base font-normal'
      />
      <div className='flex justify-center items-center gap-4 ml-auto'>
        <Link href='/'>
          <Image src='/personal.svg' width={20} height={22} alt='sign in' />
        </Link>
        <Link href='/'>
          <p className='font-normal text-base text-black'>Особистий кабінет</p>
        </Link>
      </div>
    </header>
  );
}
