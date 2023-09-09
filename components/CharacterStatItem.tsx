'use client';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

// import { CharStat } from '@/types/Character';
import { usePlayerStore } from '@/store';
import { useEffect, useState } from 'react';
import { StatsTable } from '@/types/Character';

export function CharacterStatItem({ type, value }: { type: string; value: number }) {
  // function increaseStat(stat: CharStat) {
  //   player.assignStatPoint(stat, 1);
  //   updatePlayer(player);
  // }

  // useEffect(() => {
    // console.log('statattat', stat);
  // }, []);

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
              <p> {StatsTable[type].name} </p>
            </TooltipTrigger>
            <TooltipContent side={'left'} sideOffset={45}>
              <p className="p-0 m-0">{StatsTable[type].description}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <span>{value}</span>
      </div>
    </div>
  );
}
