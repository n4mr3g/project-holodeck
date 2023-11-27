import { Player } from '@/types/Player';
import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

export default function NewPlayerForm() {
  async function submit(formData: FormData) {
    // 'use server';
    const { getToken, userId } = auth();
    if (!userId) {
      return null; //TODO: handle error
    }
    const name = formData.get('name')!.toString();

    const token = await getToken().finally(() => console.log('Got token'));

    const player = new Player(name, userId);

    const playerState = player.getState();

    console.log('Posting player...');
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/players/`,
      {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: JSON.stringify(playerState),
      },
    ).finally(() => console.log('Posted player'));
    if (!res.ok) {
      throw new Error(`${res.status}: ${res.statusText}`);
    }
    redirect('/play');
  }

  return (
    <div>
      <form action={submit}>
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
