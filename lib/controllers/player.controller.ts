import clientPromise from '@/lib/mongodb';
import { Player, PlayerState } from '@/types/Player';

const dbName = process.env.DB_NAME;

export async function getPlayer(userId: string): Promise<Player> {
  console.log('awaiting clientPromise');
  const db = (await clientPromise).db(dbName);

  console.log('awaiting data');
  const data = await db
    .collection('players')
    .findOne({ userId }, { projection: { player: 1, _id: 0 } });

  const player = new Player(data?.player, userId);
  return player;
}

export async function createPlayer(
  userId: string,
  playerState: PlayerState,
): Promise<Player> {
  const db = (await clientPromise).db(dbName);

  const result = await db
    .collection('players')
    .findOneAndUpdate({ userId }, { $set: { playerState } }, { upsert: true });

  return new Player(result!.player, userId);
}

// this is an alias / duplicate of createPlayer, for now.
export async function updatePlayerState(
  userId: string,
  playerState: PlayerState,
): Promise<Player> {
  return await createPlayer(userId, playerState);
}
