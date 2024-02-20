import Link from 'next/link';

import { navs } from '@/mock/data';

interface Nav {
  navProps?: string;
  fontWeight: string;
  ml?: string;
}

export default function Navigation({ navProps, fontWeight, ml }: Nav) {
  return (
    <nav className={`${ml ?? ''}`}>
      <ul className={`${navProps ?? ''}`}>
        {navs.map(({ id, text, href }) => (
          <li key={id}>
            <Link href={href} className={`hover:text-blue-600 ${fontWeight} text-base`}>
              {text}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
