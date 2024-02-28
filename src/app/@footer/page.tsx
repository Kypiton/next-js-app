import Image from 'next/image';
import Link from 'next/link';

import Navigation from '../_components/ui/Navigation';
import Logo from '../_components/ui/Logo';

import { icons, phones } from '@/mock/data';

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
      {phones.map(phone => (
        <div key={phone.id}>
          <div className='flex justify-start items-center gap-5'>
            <Image src={`/${phone.text}.svg`} width={phone.width} height={16} alt={phone.text} />
            <a href={`tel:${phone.tel.replaceAll(' ', '')}`} className='font-medium text-base'>
              {phone.tel}
            </a>
          </div>
          <p
            style={{ marginLeft: phone.margin }}
            className={`text-gray-400 text-xs font-normal max-w-38`}
          >
            {phone.description}
          </p>
        </div>
      ))}
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
