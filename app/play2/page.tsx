// 'use client';
import { FieldValues } from 'react-hook-form';
import axios from 'axios';
import useSWR, { Fetcher } from 'swr';
import Message from '@/types/Message';
import SessionsSelector from '../../components/SessionsSelector';
import GamePage from './game-page';

import {
  SignedIn,
  SignedOut,
  RedirectToSignIn,
} from '@clerk/nextjs';

import GameSession from '@/types/GameSession';

// 1: Fetch sessions
async function getSessions(userId: string) {
    return await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/sessions/${userId}`,
      {cache: 'no-store'}
    )
}
// WIP

export default async function Play({userId}:{userId: string}) {


  // const gameSessions = await getSessions(userId);
  


  return (
    <div>
      <SignedIn>
        {/* <SessionsSelector
          sessions={sessions}
          setGameSessionId={setGameSessionId}
        /> */}
        <GamePage/>

        <div>I am signed in!</div>
      </SignedIn>

      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </div>
  );
}
