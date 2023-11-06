'use client';

import Encounter from '@/components/Encounter';
import { usePlayerStore } from '@/store';
import CombatResults from './combat-results';

export default function Page() {
  const { player, enemy } = usePlayerStore();

  if (!player.isAlive || !enemy.isAlive) {
    return <CombatResults />;
  }
  return (
    <>
      <Encounter />
    </>
  );
}
