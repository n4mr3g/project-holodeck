import { SignIn } from '@clerk/nextjs';
import styles from '@/styles/SignIn.module.css';

export default function Page() {
  return (
    <div className={styles.signInPage}>
      <SignIn />
    </div>
  );
}
