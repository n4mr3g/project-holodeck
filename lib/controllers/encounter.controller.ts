import clientPromise from '@/lib/mongodb';
import { Enemy } from '@/types/Enemy';
import { PlayerState } from '@/types/Player';
import { getPlayer } from './player.controller';

const dbName = process.env.DB_NAME;

function generateEncounter(player: PlayerState): Enemy {
  // TODO: generate an encounter based on the player's level / stats / etc
  const enemyLvl = player.lvl; // for now, just make the enemy the same level as the player
  const enemy = new Enemy('Goblin', enemyLvl);

  // Idea: create Encounter class that includes more info, like loot.
  // Idea: randomly generate enemy name. Maybe use a library like "fantasy-names"?
  return enemy;
}

export async function getEncounter(userId: string): Promise<Enemy> {
  const db = (await clientPromise).db(dbName);

  const data = await db
    .collection('encounters')
    .findOne({ userId }, { projection: { encounter: 1, _id: 0 } });

  let encounter = data?.encounter;

  if (!encounter) {
    encounter = await createEncounter(userId);
  }

  return encounter;
}

async function createEncounter(userId: string): Promise<Enemy> {
  const db = (await clientPromise).db(dbName);

  const player = await getPlayer(userId);

  const newEnemy = generateEncounter(player);

  const data = await db
    .collection('encounters')
    .findOneAndUpdate(
      { userId },
      { $set: { encounter: newEnemy } },
      { upsert: true, projection: { encounter: 1, _id: 0 } },
    );

  return data?.encounter;
}
