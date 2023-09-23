import { Player } from '@/types/Player';
import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

export default function NewPlayerForm() {
  async function create(formData: FormData) {
    'use server';
    const { getToken, userId } = auth();
    if (!userId) {
      return null; //TODO: handle error
    }
    const name = formData.get('name')!.toString();
    console.log('name', name);
    console.log('userId', userId);
    const player = new Player(name, userId);
    const playerState = player.getState();
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/players/`,
      {
        method: 'POST',
        headers: { Authorization: `Bearer ${await getToken()}` },
        body: JSON.stringify(playerState),
      },
    );
    if (!res.ok) {
      throw new Error(`${res.status}: ${res.statusText}`);
    }
    redirect('/play');
  }

  return (
    <div>
      <form action={create}>
        <input
          type="text"
          name="name"
          autoComplete="off"
          autoFocus={true}
          placeholder="Character name"
        />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}
