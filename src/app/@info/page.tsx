import Image from 'next/image';
import Link from 'next/link';

import Button from '../_components/ui/Button';

export default function Info() {
  return (
    <section className="bg-[url('/bg-section1.jpeg')] h-100 bg-no-repeat bg-center bg-cover flex justify-evenly items-center">
      <div className='flex flex-col justify-center items-start gap-6'>
        <h1 className='text-white font-bold text-6xl'>Чіп Чендж</h1>
        <p className='text-white font-medium text-xl'>Обмінник валют - навчальний</p>
        <Link href='/converter'>
          <Button btnStyle='text-gray-400 bg-slate-50 py-5 px-14 rounded'>Конвертер валют</Button>
        </Link>
      </div>
      <Image src='/mastercard.svg' width={341} height={216} alt='mastercard' />
    </section>
  );
}
