import { NextResponse, NextRequest } from 'next/server';
import clientPromise from '../../lib/mongodb';
import { Db } from 'mongodb';
import { auth } from '@clerk/nextjs';
import { use } from 'react';

const dbName = process.env.DB_NAME;
// async function performDatabaseOperation(
//   req: NextRequest,
//   res: NextResponse,
//   operation: (db: Db, userId: string | null) => Promise<any>
// ) {
//   try {
//     const client = await clientPromise;
//     const db = client.db(dbName);
//     const { userId } = getAuth(req);
//     if (!userId) {
//       return new Response("Unauthorized", { status: 401 });
//     }
//     const user = await db.collection('users').findOneAndUpdate({ userId }, { $set: { userId } }, { upsert: true });
//     const result = await operation(db, userId);
//     return NextResponse.json(result);
//   } catch (e) {
//     console.error(e);
//     return NextResponse.json({ message: e, success: false });
//   }
// }

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
  return NextResponse.json( player );
}
//   const { searchParams } = new URL(req.url);

//   performDatabaseOperation(req, res, async (db, userId) => {
//     const player = await db.collection('players').findOne({ userId });
//     console.log('heriuiouoiue');
//     console.log('heriuiouoiue');
//     console.log('heriuiouoiue');
//     console.log('heriuiouoiue');
//     console.log('heriuiouoiue');
//     console.log('heriuiouoiue');

//     if (!player) {
//       return null;
//     }
//     return player;
//     // return NextResponse.json(player);
//   });
// }

// export async function UPDATE(req: NextRequest, res: NextResponse) {
//   const userId = req.body.userId;
//   const updateData = { $set: req.body };

//   performDatabaseOperation(req, res, async (db) => {
//     const player = await db
//       .collection('players')
//       .findOneAndUpdate({ userId }, updateData);
//     return player;
//   });
// }

export async function POST(req: NextRequest) {
  const { userId }: { userId: string | null } = auth();
  if (!userId) {
    return new Response('Unauthorized', { status: 401 });
  }
  // idk yet how to use this
  // const token = await getToken({template: ''})

  const playerData = await req.json();
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
  // const user = await db.collection('users').findOneAndUpdate({ userId }, { $set: { userId } }, { upsert: true });
}
