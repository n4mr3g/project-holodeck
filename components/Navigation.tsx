'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import ClerkButton from './ClerkButton';

//TODO: How to use subpages with arguments?
interface NavLink {
  name: string;
  href: string;
}

interface NavigationProps {
  navLinks: NavLink[];
}

export default function Navigation({ navLinks }: NavigationProps) {
  const pathname = usePathname();

  return (
    <>
      <nav>
        <div className="nav-header">
          <div className="left-links">
            {navLinks.map(link => {
              const isActive = pathname == link.href;
              return (
                <Link
                  href={link.href}
                  key={link.name}
                  className={isActive ? 'active' : ''}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>
          <div className="right-links">
            <ClerkButton />
          </div>
        </div>
      </nav>
    </>
  );
}
