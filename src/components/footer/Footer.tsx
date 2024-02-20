import Image from 'next/image';
import Link from 'next/link';

import Navigation from '../ui/Navigation';
import Logo from '../ui/Logo';

import { icons } from '@/mock/data';

export default function Footer() {
  return (
    <footer className='flex justify-between items-start px-24 py-15 bg-sky-100'>
      <div className='flex flex-col justify-center items-start gap-5'>
        <Logo />
        <p className='max-w-56 font-normal text-xs text-gray-400'>
          04128, м.Київ, вул. Хрещатик, 19 Ліцензія НБУ №156 Ⓒ ПАТ ЧіпЧендж, 2019-2023
        </p>
      </div>
      <div>
        <Navigation
          fontWeight='font-medium'
          navProps='flex flex-col justify-center items-start gap-5 text-gray-400 text-base font-normal'
        />
      </div>
      <div>
        <div className='flex justify-start items-center gap-5'>
          <Image src={`/phone.svg`} width={10} height={16} alt={'phone'} />
          <a href='tel:3773' className='font-medium text-base text-black'>
            3773
          </a>
        </div>
        <p className={`ml-7.5 text-gray-400 text-xs font-normal max-w-38`}>Цілодобова підтримка</p>
      </div>
      <div>
        <div className='flex justify-start items-center gap-5'>
          <Image src={`/handset.svg`} width={16} height={16} alt={'handset phone'} />
          <a href='tel:88001112233' className='font-medium text-base text-black'>
            8 800 111 22 33
          </a>
        </div>
        <p className={`ml-9.5 text-gray-400 text-xs font-normal max-w-38`}>
          Безкожтовно для дзвінків в межах України
        </p>
      </div>
      <div>
        <ul className='flex justify-center items-center gap-4'>
          {icons.map(icon => (
            <li key={icon.id}>
              <Link href='/'>
                <Image
                  src={`/${icon.text}.svg`}
                  width={icon.width}
                  height={icon.height}
                  alt={`${icon.text} icon`}
                />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
