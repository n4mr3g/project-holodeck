'use client';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

import { CharStat } from '@/types/Player';
import styles from '@/styles/CharacterStatItem.module.css';
import { useState } from 'react';

export function CharacterStatItem({ stat }: { stat: CharStat }) {
  // const [statValue, setStatValue] = useState(stat.value);

  // function handleClick() {
  //   setStatValue(statValue + 1);
  // }

  return (
    <div
      className={
        'container flex border h-10 max-w-lg items-center justify-between'
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
      <div className={'flex'}>
        <p>{stat.value}</p>
      </div>
    </div>
  );
}
