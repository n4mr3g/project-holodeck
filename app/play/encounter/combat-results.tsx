import { usePlayerStore } from '@/store';
import Link from 'next/link';

export default function CombatResults() {
  const { player, enemy } = usePlayerStore();
  if (!player.isAlive) {
    return (
      <div>
        <p>You died!</p>
        <Link href="/play">Return to the main menu</Link>
      </div>
    );
  } else if (!enemy.isAlive) {
    return (
      <div>
        <p>You defeated the {enemy.name}! </p>
        <p>You gained something XP bla bla</p>
        <Link href="/play/encounter">Another encounter</Link>
      </div>
    );
  }
}
