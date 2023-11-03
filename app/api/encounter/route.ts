import { getEncounter } from '@/controllers/encounter.controller';
import { auth } from '@clerk/nextjs';

export async function GET() {
  const { userId }: { userId: string | null } = auth();
  if (!userId) {
    return new Response('Unauthorized', { status: 401 });
  }

  // this will create an encounter if one doesn't exist
  const encounter = await getEncounter(userId);
  // const player = await getPlayer(userId);

  return encounter
    ? new Response(JSON.stringify(encounter), { status: 200 })
    : new Response('Not found', { status: 404 });
}
