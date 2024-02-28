'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';

import { navs } from '@/mock/data';

interface Nav {
  navProps?: string;
  fontWeight: string;
  ml?: string;
}

export default function Navigation({ navProps, fontWeight, ml }: Nav) {
  const path = usePathname();

  return (
    <nav className={`${ml ?? ''}`}>
      <ul className={`${navProps ?? ''}`}>
        {navs.map(({ id, text, href }) => (
          <li key={id}>
            <Link
              href={href}
              className={`hover:text-blue-600 text-base ${fontWeight} ${
                path === href && 'text-blue-600'
              }`}
            >
              {text}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
