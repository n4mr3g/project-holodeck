import GameSession from '@/types/GameSession';
import Link from 'next/link';
import useSWR from 'swr';

type SessionsSelectorProps = {
  // sessions: GameSession[];
  setGameSessionId: Function;
};

export default function SessionsSelector({
  setGameSessionId,
}: SessionsSelectorProps) {
  const fetcher = (url: string): Promise<any> => {
    return fetch(url).then(res => res.json());
  };

  const { data, error } = useSWR('/api/sessions', fetcher);
  const sessions = data?.sessions ?? [];

  return (
    <div className="sessions-selector flex h-56 flex-col content-center text-center">
      <h1 className="sessions-selector-title mb-6 mt-1 text-4xl">
        Select a session
      </h1>
      <ul className="sessions-selector-list">
        <li className="sessions-selector-list-item">
          {/* TODO: Add link to create a new session */}
          <Link href="/new-session">Create a new session</Link>
        </li>
        {sessions ? (
          sessions.map((session: GameSession) => (
            <li
              key={session.id}
              className="sessions-selector-list-item"
              onClick={() => setGameSessionId(session.id)}
            >
              {session.title}
            </li>
          ))
        ) : error ? (
          <li>Failed to load</li>
        ) : (
          <li>Loading...</li>
        )}
      </ul>
    </div>
  );
}
