import GameSession from '@/types/GameSession';
import Link from 'next/link';

export default function SessionsSelector({
  sessions,
  setGameSessionId,
}: {
  sessions: GameSession[];
  setGameSessionId: Function;
}) {
  return (
    <div className='sessions-selector h-56 flex flex-col text-center content-center'>
      <h1 className='sessions-selector-title text-4xl mt-1 mb-6'>Select a session</h1>
      <ul className='sessions-selector-list'>
        <li className='sessions-selector-list-item'>
          {/* TODO: Add link to create a new session */}
          <Link href='/custom'> Create a new session</Link>
        </li>
        {sessions.map((session) => (
          <li
            key={session.id}
            className='sessions-selector-list-item'
            onClick={() => setGameSessionId(session.id)}
          >
            {session.title}
          </li>
        ))}
      </ul>
    </div>
  );
}
