import clientPromise from '@/lib/mongodb';
import { Player, PlayerState } from '@/types/Player';

const dbName = process.env.DB_NAME;

export async function getPlayerIfExists(userId: string): Promise<Player> {
  const db = (await clientPromise).db(dbName);

  const data = await db
    .collection('players')
    .findOne({ userId }, { projection: { playerState: 1, _id: 0 } });

  if (!data) {
    console.log('Player not found in DB.');
    return null as unknown as Player;
  }

  const player = new Player(data.playerState, userId);
  return player;
}

export async function createPlayer(
  userId: string,
  playerState: PlayerState,
): Promise<Player> {
  try {
    const db = (await clientPromise).db(dbName);

    const data = await getPlayerIfExists(userId);

    if (data) {
      console.log('data:', data);
      return data;
    }

    //TODO: validate playerState before saving it to the database
    const newPlayerState = (await db
      .collection('players')
      .insertOne({ userId, playerState })) as unknown as PlayerState;

    const ret = new Player(newPlayerState, userId);
    return ret;
  } catch (error) {
    console.log(error);
  }

  return new Player(playerState, userId);
}

// this is an alias / duplicate of createPlayer, for now.
export async function updatePlayerState(
  userId: string,
  playerState: PlayerState,
): Promise<Player> {
  return await createPlayer(userId, playerState);
}

export async function checkPlayerConsistency(
  userId: string,
  playerState: PlayerState,
): Promise<Player> {
  const playerInDb = await getPlayerIfExists(userId);

  if (playerState !== playerInDb.getState()) {
    console.log('Player state is inconsistent with DB.');
    console.log('Player state:', playerState);
    console.log('Player in DB:', playerInDb);
  }
  return playerInDb;
}
