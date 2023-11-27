'use client';

import { usePlayerStore } from '@/store';
import { Player } from '@/types/Player';
import { Enemy } from '@/types/Enemy';
import { use, useEffect, useState } from 'react';
import { getEnemy } from '@/controllers/encounter.controller';
import { resolveCombat } from '@/lib/game-logic/resolve-combat';
import { CombatState } from '@/types/CombatState';

export default function Encounter({
  combatState,
}: {
  combatState: CombatState;
}) {
  const [player, setPlayer] = useState<Player>(combatState.player);
  const [enemy, setEnemy] = useState<Enemy>(combatState.enemy);

  useEffect(() => {
    setPlayer(combatState.player);
    setEnemy(combatState.enemy);
  }, [combatState]);

  return (
    <>
      <div className={'container mx-auto pt-7'}>
        <h1 className={'text-3xl'}>
          {enemy.name} lvl {enemy.lvl}
        </h1>
        <div className={'flex flex-row'}>
          <p>
            A {enemy.name} appears! It has {enemy.currentHp} / {enemy.maxHp} HP.
          </p>
        </div>
      </div>
    </>
  );
}
