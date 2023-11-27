import clientPromise from '@/lib/mongodb';
import { Enemy, EnemyState } from '@/types/Enemy';
import { PlayerState } from '@/types/Player';
import { getPlayerIfExists } from './player.controller';
import { auth } from '@clerk/nextjs';
import { CombatState } from '@/types/CombatState';

const dbName = process.env.DB_NAME;

function generateEnemy(player: PlayerState): Enemy {
  // TODO: generate an encounter based on the player's level / stats / etc
  const enemyLvl = player.lvl; // for now, just make the enemy the same level as the player
  const enemy = new Enemy('Goblin', enemyLvl);

  // Idea: create Encounter class that includes more info, like loot.
  // Idea: randomly generate enemy name. Maybe use a library like "fantasy-names"?
  return enemy;
}

// export async function getEnemy(userId: string): Promise<Enemy> {
export async function getEnemy(playerState: PlayerState): Promise<Enemy> {
  const { userId } = auth();
  if (!userId) throw new Error('User not logged in.');

  const db = (await clientPromise).db(dbName);

  const data = await db
    .collection('encounters')
    .findOne({ userId }, { projection: { encounter: 1, _id: 0 } });

  let enemy = data?.enemy as Enemy;

  if (!enemy) {
    enemy = generateEnemy(playerState);
  }

  return enemy;
}

export async function getCombatState(userId: string): Promise<CombatState> {
  const db = (await clientPromise).db(dbName);

  const data = await db
    .collection('encounters')
    .findOne({ userId }, { projection: { encounter: 1, _id: 0 } });

  let combatState = data?.encounter as CombatState;

  if (!combatState) {
    combatState = await createCombatState(userId);
  }

  return combatState;
}

async function createCombatState(
  userId: string,
  newEnemy?: Enemy,
): Promise<CombatState> {
  const db = (await clientPromise).db(dbName);

  const player = await getPlayerIfExists(userId);

  newEnemy = generateEnemy(player);

  const newCombatState: CombatState = {
    status: 'idle',
    player,
    enemy: newEnemy,
  };

  const data = await db
    .collection('encounters')
    .findOneAndUpdate(
      { userId },
      { $set: { encounter: newCombatState } },
      { upsert: true, projection: { encounter: 1, _id: 0 } },
    );

  return data?.encounter as CombatState;
}

// export async function updateEnemyState(
//   userId: string,
//   enemyState: EnemyState,
// ): Promise<EnemyState> {
//   const newEnemy = new Enemy(enemyState.name, enemyState.lvl);
//   return await createCombatState(userId, newEnemy);
// }

// this is kind of an alias / duplicate of createEncounter, for now.
export async function updateCombatState(
  userId: string,
  newCombatState: CombatState,
): Promise<CombatState> {
  //TODO: validate enemy input
  const db = (await clientPromise).db(dbName);

  const data = await db
    .collection('encounters')
    .findOneAndUpdate(
      { userId },
      { $set: { encounter: newCombatState } },
      { upsert: true, projection: { encounter: 1, _id: 0 } },
    );

  return data?.encounter as CombatState;
}
