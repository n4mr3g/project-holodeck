import {
  ClerkLoaded,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
  useUser,
} from '@clerk/nextjs';
import Link from 'next/link';

export default function ClerkButton() {
  const { user } = useUser();
  return (
    <ClerkLoaded>
      <SignedOut>
        <SignInButton mode="modal">
          <Link href="#">Sign In</Link>
        </SignInButton>
      </SignedOut>

      <SignedIn>
        <Link href="/profile">
          {/* <Link href="/profile" className={styles.userName}> */}
          <UserButton afterSignOutUrl="/" />
          <span>{user?.username}</span>
        </Link>
      </SignedIn>
    </ClerkLoaded>
  );
}
