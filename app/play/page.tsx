import { auth } from '@clerk/nextjs';

import NewPlayerForm from '@/components/NewPlayerForm';
import GameDashboard from '@/components/GameDashboard';
import { PlayerState } from '@/types/Player';

async function getPlayerState() {
  'use server';
  const { getToken } = auth();
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/players/`, {
    headers: { Authorization: `Bearer ${await getToken()}` },
  });
  if (!res.ok) {
    //TODO: handle error
    // throw new Error(`${res.status}: ${res.statusText}`);
    return null;
  }
  // const playerState = (await res.json()) as PlayerState;
  return await res.json();
}

export default async function Play() {
  const fetchedPlayerState = (await getPlayerState()) as PlayerState;
  if (!fetchedPlayerState) {
    return <NewPlayerForm />;
  }

  return <GameDashboard playerState={fetchedPlayerState} />;
}
