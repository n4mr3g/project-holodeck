import { usePathname } from "next/navigation";
import Link from "next/link";
import BurgerMenu from "./BurgerMenu";
import { useUser, UserButton, SignInButton, useAuth } from "@clerk/nextjs";
import "@/styles/sign-in.css";

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
  const { isLoaded, userId, sessionId, getToken } = useAuth();
  const { isSignedIn, user } = useUser();

  return (
    <>
      <nav>
        <div className="nav-header">
          <div className="left-links">
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
          </div>
          <div className="right-links">
            {!userId ? (
              <SignInButton mode="modal">
                <Link href="#">Sign In</Link>
              </SignInButton>
            ) : (
              <Link href="/profile" className="user-name">
                <UserButton afterSignOutUrl="/" />
                <span>{user?.username}</span>
              </Link>
            )}
          </div>
        </div>
        <BurgerMenu navLinks={navLinks} user={userId} sessions={[]} />
      </nav>
    </>
  );
}
