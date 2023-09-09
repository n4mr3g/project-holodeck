import { NextResponse, NextRequest } from 'next/server';
import clientPromise from '../../../lib/mongodb';
import { auth } from '@clerk/nextjs';

// `server-only` guarantees any modules that import code in file will never run
//  on the client. It's good practice to add `server-only` preemptively.
import 'server-only';
import { PlayerState } from '@/types/Player';

const dbName = process.env.DB_NAME;

export async function GET() {
  const { userId }: { userId: string | null } = auth();
  if (!userId) {
    return new Response('Unauthorized', { status: 401 });
  }

  const client = await clientPromise;
  const db = client.db(dbName);

  const data = await db
    .collection('players')
    .findOne({ userId }, { projection: { player: 1, _id: 0 } });

  const player = data?.player;
  return player
    ? NextResponse.json(player)
    : new NextResponse('Not found', { status: 404 });
}

export async function POST(req: NextRequest) {
  const { userId }: { userId: string | null } = auth();
  if (!userId) {
    return new Response('Unauthorized', { status: 401 });
  }
  // idk yet how to use this
  // const token = await getToken({template: ''})

  const playerData = (await req.json()) as PlayerState;
  const client = await clientPromise;
  const db = client.db(dbName);

  const player = await db
    .collection('players')
    .findOneAndUpdate(
      { userId },
      { $set: { player: playerData } },
      { upsert: true },
    );
  return NextResponse.json({ player });
}
