'use client';

import { useState, useEffect } from 'react';
import { Player, CharStat } from '@/types/Player';
import { CharacterStatItem } from '@/components/CharacterStatItem';
import { usePlayerStore } from '@/store';

function CharacterStats() {
  const { player } = usePlayerStore();
  // const [initialPlayerStats, setInitialPlayerStats] = useState<number[]>(player.getBulkStats());

  return (
    <div
      className={
        'justify-center max-w-lg container flex flex-col items-center border p-2 box-border'
      }
    >
      <ul className={'flex flex-col min-w-full'}>
        {player.stats.map((stat: CharStat) => (
          <li key={stat.type}>
            <CharacterStatItem stat={stat} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function PlayerDetails() {
  const { player, updatePlayer, addAgi, addDef, addStr } = usePlayerStore();

  useEffect(() => {
    // addStr(4);
    // addAgi(4);
    updatePlayer(player);
  }, []);

  return (
    <>
      <div></div>
      <div>
        <p>
          This is some text that will be generated by OpenAI when the character
          is created. Ideally it&apos;s funny and short.
        </p>
        <ul>
          <li>Player Name: {player.name}</li>
          <li>Level: {player.lvl}</li>
          <li>
            Experience: {player.exp} / {player.expToLvlUp}
          </li>
          <li>
            Health: {player.currentHp} / {player.maxHp}
          </li>
        </ul>
        <CharacterStats />
      </div>
    </>
  );
}
