'use client';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

import { CharStat } from '@/types/Player';
import { usePlayerStore } from '@/store';
import { useEffect, useState } from 'react';

export function CharacterStatItem({ stat }: { stat: CharStat }) {
  const [newVal, setNewVal] = useState<number>(0);
  const { player, updatePlayer, isAddingStatPoints } = usePlayerStore();
  const initialVal = stat.value;
  // function increaseStat(stat: CharStat) {
  //   player.assignStatPoint(stat, 1);
  //   updatePlayer(player);
  // }

  function increaseStat(stat: CharStat) {
    player.assignStatPoint(stat, 1);
    setNewVal(newVal + 1);
    updatePlayer(player);
  }

  useEffect(() => {
    console.log(stat);
  }, []);

  return (
    <div
      className={
        'container min-w-l flex items-center border p-2 box-border justify-center'
      }
    >
      <div
        className={'container flex border h-10 items-center justify-between'}
      >
        <TooltipProvider>
          <Tooltip delayDuration={0}>
            <TooltipTrigger asChild>
              <p> {CharStat.getName(stat.type)} </p>
            </TooltipTrigger>
            <TooltipContent side={'left'} sideOffset={45}>
              <p className="p-0 m-0">{CharStat.getDescription(stat.type)}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <span>
          {initialVal - newVal}
          {isAddingStatPoints && (
            <>
              {' + '} {newVal}
            </>
          )}
        </span>
      </div>
      <div>
        {isAddingStatPoints && (
          <button
            className={'font-bold mx-3 h-3 w-3 border'}
            onClick={() => increaseStat(stat)}
            disabled={player.freeStatPoints <= 0}
          >
            {/* <button className={'font-bold mx-3 h-3 w-3 border border-y-pink-500'} onClick={() => increaseStat(stat)}> */}
            +
          </button>
        )}
      </div>
    </div>
  );
}
