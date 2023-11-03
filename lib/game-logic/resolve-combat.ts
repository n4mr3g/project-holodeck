import { Player, PlayerState } from '@/types/Player';
import { Enemy } from '@/types/Enemy';
import { attackEnemy } from '@/lib/controllers/combat.controller';
import { getEncounter } from '@/controllers/encounter.controller';
import clientPromise from '@/lib/mongodb';
import { getPlayer } from '@/controllers/player.controller';

const dbName = process.env.DB_NAME;

//TODO:(maybe) define an interface 'CombatResult' that is the return type of resolveCombat.

export type CombatResult = {
  player: Player;
  enemy: Enemy;
  playerDamage: number;
  enemyDamage: number;
  playerIsDead: boolean;
  enemyIsDead: boolean;
};

export async function resolveCombat(
  userId: string,
  action: string,
  itemOrMagicId?: string | null,
): Promise<PlayerState> {
  try {
    const db = (await clientPromise).db(dbName);

    const player = await getPlayer(userId);
    const enemy = await getEncounter(userId);

    switch (action) {
      case 'attack':
        return attackEnemy(player, enemy);
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
