import Image from 'next/image';
import Link from 'next/link';

export default function Logo() {
  return (
    <Link href='/' className={`flex justify-center items-center gap-3`}>
      <Image src='/logo.png' width={23} height={23} alt='logo' />
      <b className='text-xl text-black font-bold'>Чіп Чендж</b>
    </Link>
  );
}
