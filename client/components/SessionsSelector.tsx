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
    <div className="sessions-selector h-56 flex flex-col text-center content-center">
      <h1 className="sessions-selector-title text-4xl mt-1 mb-6">
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
