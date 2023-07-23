'use client';
import { FieldValues } from 'react-hook-form';
import { useState, useEffect, use } from 'react';
import axios from 'axios';
import useSWR, { Fetcher } from 'swr';
import Message from '@/types/Message';
import SessionsSelector from '../components/SessionsSelector';

import {
  SignedIn,
  SignedOut,
  RedirectToSignIn,
  useAuth,
  useUser,
  SignIn,
} from '@clerk/nextjs';
import GameSession from '@/types/GameSession';

// WIP
const fetcher = (url: string): Promise<any> => {
  return axios.get(url).then(res => res.data);
};
export default function Play() {
  const [sessions, setSessions] = useState<GameSession[]>([]);
  const [gameSessionId, setGameSessionId] = useState<string>('');

  const { isLoaded, userId, getToken } = useAuth();
  const { user } = useUser();

  // 1: Fetch sessions
  function fetchSessions() {
    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    };
    if (userId) {
      fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/sessions/${userId}`,
        requestOptions,
      )
        .then(data => data.json())
        .then((data = []) => setSessions(data))
        .catch(error => {
          console.error('Error:', error);
        });

      // useSWR(`${process.env.NEXT_PUBLIC_SERVER_URL}/sessions/${userId}`, fetcher);
      // axios
      //   .get(`http://localhost:3001/sessions/${userId}`, requestOptions)
      //   .then((res) => res.data)
      //   .then((data) => setSessions(data));
    }
  }

  useEffect(() => {
    fetchSessions();
  }, []);

  return (
    <div>
      <SignedIn>
        <SessionsSelector
          sessions={sessions}
          setGameSessionId={setGameSessionId}
        />
      </SignedIn>

      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </div>
  );
}
