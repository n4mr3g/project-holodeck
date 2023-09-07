'use client';
import PlayerDetails from '@/components/PlayerDetails';
import { Player } from '@/types/Player';
import { useAuth } from '@clerk/nextjs';

export default function GamePage() {
  const { isLoaded, userId } = useAuth();

  if (!isLoaded || !userId) {
    return null;
  }

  return <div></div>;
}
