// `server-only` guarantees any modules that import code in file will never run
//  on the client. It's good practice to add `server-only` preemptively.
import 'server-only';

import { NextResponse, NextRequest } from 'next/server';
import { auth } from '@clerk/nextjs';
import { PlayerState } from '@/types/Player';
import {
  getPlayerIfExists,
  createPlayer,
} from '@/controllers/player.controller';

export async function GET() {
  try {
    const { userId }: { userId: string | null } = auth();
    if (!userId) {
      return new Response('Unauthorized', { status: 401 });
    }

    const player = await getPlayerIfExists(userId);

    return NextResponse.json(player);
  } catch (error) {
    return new NextResponse('Not found', { status: 404 });
  }
}

export async function POST(req: NextRequest) {
  const { userId }: { userId: string | null } = auth();
  if (!userId) {
    return new Response('Unauthorized', { status: 401 });
  }

  // idk yet how to use this but I might need it later:
  // const token = await getToken({template: ''})

  const playerData = (await req.json()) as PlayerState;
  // TODO: this may not be secure; player could cheat by sending a modified player object?

  const newPlayer = await createPlayer(userId, playerData);

  return NextResponse.json({ newPlayer });
}
