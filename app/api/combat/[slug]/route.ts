import { resolveCombat } from '@/lib/game-logic/resolve-combat';
import { auth } from '@clerk/nextjs';
import { NextRequest } from 'next/server';

export async function POST(
  req: NextRequest,
  { params }: { params: { slug: string } },
) {
  const { userId }: { userId: string | null } = auth();

  if (!userId) {
    return new Response('Unauthorized', { status: 401 });
  }

  let itemOrMagicId: string | null = null;

  if (req.headers.has('itemOrMagicId')) {
    itemOrMagicId = req.headers.get('itemOrMagicId');
  }

  const combatResult = await resolveCombat(userId, params.slug, itemOrMagicId);

  return new Response(JSON.stringify(combatResult), { status: 200 });
}
