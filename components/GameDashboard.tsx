'use client';
import { PlayerState, Player } from '@/types/Player';
import PlayerDetails from './PlayerDetails';
import { usePlayerStore } from '@/store';
import { useEffect, useMemo } from 'react';
import Encounter from './Encounter';
import Link from 'next/link';

export default function GameDashboard({
  playerState,
}: {
  playerState: PlayerState;
}) {
  const { updatePlayer } = usePlayerStore();

  const player = useMemo(() => new Player(playerState), [playerState]);

  useEffect(() => {
    // 'dispatch' the player to the store
    updatePlayer(player);
  }, [player, updatePlayer]);

  return (
    <div className={'container mx-auto pt-7'}>
      <PlayerDetails />
      <Link href="/play/encounter"> Go to encounter </Link>
    </div>
  );
}
