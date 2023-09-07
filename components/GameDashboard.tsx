'use client';
import { CharStat, Player } from '@/types/Player';
import PlayerDetails from './PlayerDetails';
import { usePlayerStore } from '@/store';
import { useEffect } from 'react';
import Encounter from './Encounter';

export default function GameDashboard({
  player,
}: {
  player: Player;
}) {
  const { updatePlayer } = usePlayerStore();

  useEffect(() => {
    // 'dispatch' the player to the store
    updatePlayer(player);
  }, [player]);

  return (
    <div className={'container mx-auto pt-7'}>
      <PlayerDetails />
      <Encounter />
    </div>
  );
}
