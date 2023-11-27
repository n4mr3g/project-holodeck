import { Player, PlayerState } from '@/types/Player';
import { Enemy } from '@/types/Enemy';
import { attackEnemy } from '@/lib/controllers/combat.controller';
import { getCombatState, getEnemy } from '@/controllers/encounter.controller';
import clientPromise from '@/lib/mongodb';
import { getPlayerIfExists } from '@/controllers/player.controller';
import { CombatState } from '@/types/CombatState';
import { auth } from '@clerk/nextjs';

const dbName = process.env.DB_NAME;

export async function resolveCombat(
  action: string,
  itemOrMagicId?: string | null,
): Promise<CombatState> {
  'use server';
  try {
    const { userId } = auth();
    if (!userId) throw new Error('User not logged in.');

    const player = await getPlayerIfExists(userId);
    // const enemy = await getEnemy(player);
    const combatState = await getCombatState(userId);

    switch (action) {
      case 'attack':
        return attackEnemy(combatState);
      // case 'useItem':
      //   return useItem(player, enemy, itemOrMagicId);
      // case 'runAway':
      //   return runAway(player, enemy);
      // case 'useMagic':
      //   return useMagic(player, enemy, itemOrMagicId);
      // case 'defend':
      //   return defend(player, enemy);
      default:
        throw new Error('Invalid action or parameters.');
    }
  } catch (error) {
    console.error(error);
    throw new Error('Error resolving combat.');
  }
}
