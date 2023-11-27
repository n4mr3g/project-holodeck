import { Enemy } from '@/types/Enemy';
import { Player, PlayerState } from '@/types/Player';
import { updatePlayerState } from './player.controller';
import { updateCombatState } from './encounter.controller';
import { CombatState } from '@/types/CombatState';

export async function attackEnemy(
  combatState: CombatState,
): Promise<CombatState> {
  const { player, enemy } = combatState;

  const damageDealt = player.attack(enemy);
  const damageTaken = enemy.attack(player);

  const updatedPlayer = await updatePlayerState(
    player.userId,
    player.getState(),
  );

  if (!enemy.isAlive) {
    combatState.status = 'enemyDefeated';
  } else if (!player.isAlive) {
    combatState.status = 'playerDefeated';
  } else {
    combatState.status = 'inCombat';
  }

  [combatState.damageDealt, combatState.damageTaken] = [
    damageDealt,
    damageTaken,
  ];

  const updatedCombatState = await updateCombatState(
    player.userId,
    combatState,
  );

  return combatState;
  // return damageDealt;
}
