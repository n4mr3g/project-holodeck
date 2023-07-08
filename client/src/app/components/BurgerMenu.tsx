"use client";
import { slide as Menu } from "react-burger-menu";
import { UserButton, SignInButton } from "@clerk/nextjs";
import Session from "@/types/Session";
import Link from "next/link";

import "@/styles/burger-menu.css";

export default function BurgerMenu({
  sessions,
  userId,
}: {
  sessions: Session[];
  userId: string;
}) {

  return (
    <>
      <Menu right>
        {sessions ? (
          sessions.map((session) => (
            <Link
              key={session.id}
              className="menu-item"
              href={`/play/${session.id}`}
            >
              {session.title}
            </Link>
          ))
        ) : (
          <>
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
          </>
        )}
      </Menu>
    </>
  );
}

//   return (
//     <>
//       <Menu right>
//         <a id="home" className="menu-item" href="/">
//           Home
//         </a>
//         <a id="about" className="menu-item" href="/about">
//           About
//         </a>
//         <a id="play" className="menu-item" href="/play">
//           Play
//         </a>
//       </Menu>
//     </>
//   );
// }
