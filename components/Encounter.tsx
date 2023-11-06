'use client';

import { usePlayerStore } from '@/store';
import { Character } from '@/types/Character';
import { useEffect } from 'react';

export default function Encounter() {
  const { player, enemy, updateEnemy, updatePlayer, attack } = usePlayerStore();

  useEffect(() => {
    updateEnemy(new Character('Troll', 2));
    //TODO: fetch enemy from server; if enemy died, show a modal with loot
  }, [updateEnemy]);

  function handleCombat() {
    //TODO: this should be a server call
    attack(player, enemy);
    if (!enemy.isAlive) {
      console.log(`${player.name} killed ${enemy.name}!`);
      player.gainExp(enemy.lvl * 10);
      updatePlayer(player);
    } else if (player.isAlive) {
      attack(enemy, player);
      if (!player.isAlive) {
        console.log(`${enemy.name} killed ${player.name}!`);
      } else {
        attack(enemy, player);
      }
    }
  }

  return (
    <>
      <div className={'container mx-auto pt-7'}>
        <h1 className={'text-3xl'}>
          {enemy.name} lvl {enemy.lvl}
        </h1>
        <div className={'flex flex-row'}>
          <p>
            A {enemy.name} appears! It has {enemy.currentHp} / {enemy.maxHp} HP.
          </p>
        </div>
        <div className={'flex flex-row'}>
          <button
            onClick={() => {
              handleCombat();
            }}
          >
            Attack
          </button>

          <p></p>
        </div>
      </div>
    </>
  );
}
