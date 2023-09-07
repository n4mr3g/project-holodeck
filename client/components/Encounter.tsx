import { usePlayerStore } from '@/store';
import { Enemy } from '@/types/Enemy';
import { useEffect, useState } from 'react';

export default function Encounter() {
const {player} = usePlayerStore();
const [enemy, setEnemy] = useState<Enemy>(new Enemy('Troll', 2));

useEffect(() => {
  console.log('enemy', enemy);
}
, [enemy]);

  return (
    <>
      <div className={'container mx-auto pt-7'}>
        <h1 className={'text-3xl'}>{enemy.name} lvl {enemy.lvl}</h1>
        <p>
          A {enemy.name} appears! It has {enemy.currentHp} / {enemy.maxHp} HP.
        </p>
        <p>

        </p>

      </div>
    </>
  )
}
