import Image from 'next/image';
import Link from 'next/link';

import Button from '../ui/Button';

export default function SecondSection() {
  return (
    <section className='flex justify-center items-center gap-12 py-30'>
      <div className='flex flex-col justify-center items-start gap-6'>
        <h2 className='font-bold text-4xl'>Конвертер валют</h2>
        <p className='text-gray-400 font-medium text-xl max-w-sm'>
          Переважна діяльність банківської групи за останні чотири звітні квартали становить 50 і
          більше відсотків.
        </p>
        <Link href='/converter'>
          <Button btnStyle='bg-blue-700 text-sky-100'>Конвертувати валюту</Button>
        </Link>
      </div>
      <Image src='/monobank.svg' width={436} height={314} alt='monobank' />
    </section>
  );
}
