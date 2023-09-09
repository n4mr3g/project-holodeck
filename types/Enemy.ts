import { Character } from '@/types/Character';


//TBD - add enemy specific stats

export class Enemy extends Character {

  constructor(name: string, lvl: number = 1) {
    super(name, lvl);
  }

}
