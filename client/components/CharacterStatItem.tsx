'use client';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

import { CharStat } from '@/types/Player';
import { usePlayerStore } from '@/store';
import { useEffect } from 'react';

export function CharacterStatItem({ stat }: { stat: CharStat }) {
  const { player, updatePlayer } = usePlayerStore();

  function increaseStat(stat: CharStat) {
    player.assignStatPoint(stat, 1);
    updatePlayer(player);
    console.log(`increased ${stat.type} by 1`);
    console.log(`${stat.type} is now ${stat.value}`);
  }

  useEffect(() => {
    console.log('freeStatPoints', player.freeStatPoints);
  }, [player.freeStatPoints]);

  return (
    <div className={'container flex items-center max-w-xs border p-2 box-border'}>
      <div
        className={
          'container flex border h-10 max-w-xs items-center justify-between'
        }
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
        <span>{stat.value}</span>
      </div>
      <div>
        {player.freeStatPoints > 0 && (
          <button className={'font-bold mx-3 h-3 w-3 border border-y-pink-500'} onClick={() => increaseStat(stat)}>
            +
          </button>
        )}
      </div>
    
    </div>
  );
}
