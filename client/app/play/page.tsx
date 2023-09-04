import { auth } from '@clerk/nextjs';
import { usePlayerStore } from '@/store';

import NewPlayerForm from '@/components/NewPlayerForm';
import PlayerDetails from '@/components/PlayerDetails';
import GameDashboard from '@/components/GameDashboard';
import { CharStat, Player } from '@/types/Player';

async function getPlayer() {
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
  return await res.json();
}


export default async function Play() {
  const fetchedPlayer = (await getPlayer()) as Player;
  if (!fetchedPlayer) {
    return <NewPlayerForm />;
  }

  return <GameDashboard fetchedPlayer={fetchedPlayer} />;
}
