import Image from 'next/image';

export default function Loading() {
  return (
    <Image src='/spinner.gif' width={200} height={200} alt='spinner' className='p-10 m-auto' />
  );
}
