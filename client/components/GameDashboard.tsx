'use client';
import { CharStat, Player } from '@/types/Player';
import PlayerDetails from './PlayerDetails';
import { usePlayerStore } from '@/store';
import { useEffect } from 'react';

export default function GameDashboard({
  fetchedPlayer,
}: {
  fetchedPlayer: Player;
}) {
  const { updatePlayer } = usePlayerStore();
  const player = structuredClone(fetchedPlayer);
  Object.setPrototypeOf(player, Player.prototype);
  player.stats.map((stat: CharStat) =>
    Object.setPrototypeOf(stat, CharStat.prototype),
  );
  // Object.assign(player, { stats: fetchedStats });


  useEffect(() => {
    // 'dispatch' the player to the store
    updatePlayer(player);
  }, []);



  return (
    <div className={'container mx-auto pt-7'}>
      <PlayerDetails/>
    </div>
  );
}
