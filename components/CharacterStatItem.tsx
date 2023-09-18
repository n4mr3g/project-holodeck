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

export function CharacterStatItem({
  type,
  value,
}: {
  type: string;
  value: number;
}) {
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
        'min-w-l container box-border flex items-center justify-center border p-2'
      }
    >
      <div
        className={'container flex h-10 items-center justify-between border'}
      >
        <TooltipProvider>
          <Tooltip delayDuration={0}>
            <TooltipTrigger asChild>
              <p> {StatsTable[type].name} </p>
            </TooltipTrigger>
            <TooltipContent side={'left'} sideOffset={45}>
              <p className="m-0 p-0">{StatsTable[type].description}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <span>{value}</span>
      </div>
    </div>
  );
}
