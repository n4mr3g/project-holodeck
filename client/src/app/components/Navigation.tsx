import { usePathname } from "next/navigation";
import Link from "next/link";

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
      <header className="nav-header">
        <nav>
          {navLinks.map((link) => {
            const isActive = pathname == link.href;
            // const isActive = pathname && pathname.startsWith(link.href); // for subpages

            return (
              <Link
                href={link.href}
                key={link.name}
                className={isActive ? "active" : ""}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>
      </header>
    </>
  );
}
