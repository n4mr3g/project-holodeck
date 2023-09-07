import { NextResponse, NextRequest } from 'next/server';
import clientPromise from '../../lib/mongodb';
import { Db } from 'mongodb';
import { getAuth } from "@clerk/nextjs/server";

async function performDatabaseOperation(
  req: NextRequest,
  res: NextResponse,
  operation: (db: Db) => Promise<any>
) {
  const dbName = process.env.DB_NAME;
  try {
    const client = await clientPromise;
    const db = client.db(dbName);
    // const { userId } = getAuth(req);
    // if (!userId) {
    //   return new Response("Unauthorized", { status: 401 });
    // }
    // const user = await db.collection('users').findOneAndUpdate({ userId }, { $set: { userId } }, { upsert: true });
    const result = await operation(db);
    return NextResponse.json(result);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ message: e, success: false });
  }
}

export async function GET(req: NextRequest, res: NextResponse) {

    // const { searchParams } = new URL(req.url);
    const dbName = process.env.DB_NAME;
    const client = await clientPromise;
    const db = client.db(dbName);
    const r = await db.collection('test').find().toArray();
    return NextResponse.json(r);

}
