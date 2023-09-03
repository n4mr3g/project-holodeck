import { auth } from '@clerk/nextjs';

import NewPlayerForm from '@/components/NewPlayerForm';
import PlayerDetails from '@/components/PlayerDetails';
import GameDashboard from '@/components/GameDashboard';

async function getPlayer() {
  const { getToken } = auth();
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/players/`, {
    headers: { Authorization: `Bearer ${await getToken()}` },
  } );
  if (!res.ok) {
    //TODO: handle error
    // throw new Error(`${res.status}: ${res.statusText}`);
    return null;
  }
  return await res.json();
}
export default async function Play() {
  const player = await getPlayer();
  if (!player) {
    return <NewPlayerForm/>
  } else {
    return (
      <div className={'container mx-auto pt-7'}>
    <PlayerDetails player={player}/>
    <GameDashboard player={player} />
      </div>
  )
}

}
