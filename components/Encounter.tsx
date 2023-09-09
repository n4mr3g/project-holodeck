import { usePlayerStore } from '@/store';
import { Character } from '@/types/Character';
import { use, useEffect } from 'react';

export default function Encounter() {
  const { player, enemy, updateEnemy, updatePlayer, attack } = usePlayerStore();

  // if (!enemy.isAlive) {
  //   updateEnemy(new Character('Troll', 2));
  // }
  useEffect(() => {
    // if (!enemy.isAlive) {
    updateEnemy(new Character('Troll', 2));
    // }
  }, [updateEnemy]);

  useEffect(() => {
    if (!enemy.isAlive) updateEnemy(new Character('Goblin', 1));
  }, [enemy.isAlive, updateEnemy]);

  // useEffect(() => {
  //   updateEnemy(new Character(enemy.getState()));
  // }, [enemy.currentHp, updateEnemy]);

  function handleCombat() {
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
