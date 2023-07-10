'use client';

//TODO: Fix burger menu (it doesn't show links)
import { slide as Menu } from 'react-burger-menu';
import { UserButton, SignInButton } from '@clerk/nextjs';
import Session from '@/types/Session';
import Link from 'next/link';

import '@/styles/burger-menu.css';


type BurgerMenuProps = {
  sessions: Session[];
  userId: string;
};

export default function BurgerMenu({ sessions, userId }: BurgerMenuProps) {

  return (
    <>
      <Menu right>
        {sessions?.map((session) => (
          <Link
            key={session.id}
            className='menu-item'
            href={`/play/${session.id}`}
          >
            {session.title}
          </Link>
        )) ?? (
            <Link href='/profile' className='user-name'>
              <UserButton afterSignOutUrl='/' showName={true} />
              {/* <span>{user?.username}</span> */}
            </Link>
        )}
      </Menu>
    </>
  );
}
