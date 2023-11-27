import { Character, CharacterState } from '@/types/Character';

//TBD - add enemy specific stats

export class Enemy extends Character {
  reward: string[];
  constructor(name: string, lvl: number = 1, reward?: string[]) {
    super(name, lvl);
    this.reward = reward || ['100 gold pieces', '1 potion'];
  }
}

export interface EnemyState extends CharacterState {}
