import { auth } from '@clerk/nextjs';

import NewPlayerForm from '@/components/NewPlayerForm';
import GameDashboard from '@/components/GameDashboard';
import { PlayerState } from '@/types/Player';
import { getPlayerIfExists } from '@/lib/controllers/player.controller';

// async function getPlayerState() {
//   'use server';
//   const { getToken } = auth();

//   const token = await getToken();

//   const res = await fetch(
//     `${process.env.NEXT_PUBLIC_SERVER_URL}/api/players/`,
//     {
//       headers: { Authorization: `Bearer ${token}` },
//     },
//   );

//   if (!res.ok) {
//     //TODO: handle error
//     // throw new Error(`${res.status}: ${res.statusText}`);
//     return null;
//   }

//   const playerState = (await res.json()) as PlayerState;

//   return playerState;
// }

export default async function Play() {
  const { userId } = auth();

  if (!userId) {
    return <NewPlayerForm />;
  }

  const playerFromServer = await getPlayerIfExists(userId);
  console.log('playerFromServer', playerFromServer);

  if (!playerFromServer) {
    console.log('No player found');
    return <NewPlayerForm />;
  }

  const fetchedPlayerState = playerFromServer.getState();

  return <GameDashboard playerState={fetchedPlayerState} />;
}
