'use client';
import { FieldValues } from 'react-hook-form';
import { useState, useEffect } from 'react';
import SessionsSelector from '../../components/SessionsSelector';
import GameSession from '@/types/GameSession';
import {
  useAuth,
  useUser,
} from '@clerk/nextjs';
import Chat from '@/components/Chat';

// WIP

export default function GamePage() {
  // const [sessions, setSessions] = useState<GameSession[]>([]);
  // const [gameSessionId, setGameSessionId] = useState<string>('');

  const { isLoaded, userId } = useAuth();
  const { user } = useUser();

  if (!isLoaded || !userId) {
    return null;
  }

  return (
    <div>
        <Chat gameSessionId={''}/>
    </div>
  );
}
