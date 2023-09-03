'use client';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

import { CharStat } from '@/types/Player';
import styles from '@/styles/CharacterStatItem.module.css';

export function CharacterStatItem({ stat }: { stat: CharStat }) {
  return (
    <div
      className={
        'container flex border h-10 max-w-lg items-center justify-between'
      }
    >
      {/* <div className={'flex'}> */}
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
        <button className={'btn btn-primary'}
         onClick={() => stat.increment()}>+</button>
      </div>
    </div>
  );
}
