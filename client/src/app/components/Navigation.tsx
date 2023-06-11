import { usePathname } from 'next/navigation'
import Link from 'next/link'

interface NavLink {
  name: string;
  href: string;
}

interface NavigationProps {
  navLinks: NavLink[];
}

export default function Navigation({ navLinks }: NavigationProps) {
  const pathname = usePathname()

  return (
    <>
      {navLinks.map((link) => {
        const isActive = pathname && pathname.startsWith(link.href)

        return (
          <Link
            href={link.href}
            key={link.name}
          >
            <a className={isActive ? 'text-blue' : 'text-black'}>
              {link.name}
            </a>
          </Link>
        )
      })}
    </>
  )
}
