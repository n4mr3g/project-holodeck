import Encounter from '@/components/Encounter';
import { resolveCombat } from '@/lib/game-logic/resolve-combat';

import CombatResults from './combat-results';
import { auth } from '@clerk/nextjs';
import { Enemy } from '@/types/Enemy';
import {
  getCombatState,
  getEnemy,
} from '@/lib/controllers/encounter.controller';
import { getPlayerIfExists } from '@/lib/controllers/player.controller';
import { Player } from '@/types/Player';
import { CombatState } from '@/types/CombatState';

export default async function Page() {
  const { userId } = auth();

  if (!userId) {
    console.log('No user found');
    return null;
  }

  const player = await getPlayerIfExists(userId);
  const combatState: CombatState = await getCombatState(userId);

  if (
    combatState.status === 'enemyDefeated' ||
    combatState.status === 'playerDefeated'
  ) {
    return <CombatResults />;
  }
  return (
    <>
      <Encounter combatState={combatState} />
      <div className={'flex flex-row'}>
        <button
          onClick={() => {
            resolveCombat('attack');
          }}
        >
          Attack
        </button>
      </div>
    </>
  );
}
