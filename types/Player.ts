// import { Item } from './Item';
import { Character, CharacterState } from '@/types/Character';

const defaultState = Object.freeze({
  name: '',
  lvl: 1,
  currentHp: 100,
  maxHp: 100,
  isAlive: true,
  stats: {
    str: 1,
    def: 1,
    agi: 1,
    luck: 1,
    cha: 1,
    int: 1,
  },
  exp: 0,
  expToLvlUp: 100,
  freeStatPoints: 0,
});

export interface PlayerState extends CharacterState {
  userId: string;
  exp: number;
  expToLvlUp: number;
  freeStatPoints: number;
}

export class Player extends Character implements PlayerState {
  static defaultState = defaultState;
  userId: string;
  exp: number = 0;
  expToLvlUp: number = 100;
  freeStatPoints: number = 0;

  constructor(nameOrState: string | PlayerState, userId?: string) {
    super(nameOrState);
    if (userId) this.userId = userId;
  }

  getState(): PlayerState {
    return {
      name: this.name,
      lvl: this.lvl,
      currentHp: this.currentHp,
      maxHp: this.maxHp,
      isAlive: this.isAlive,
      stats: this.stats,
      userId: this.userId,
      exp: this.exp,
      expToLvlUp: this.expToLvlUp,
      freeStatPoints: this.freeStatPoints,
    };
  }

  setState(state: PlayerState) {
    this.name = state.name;
    this.lvl = state.lvl;
    this.currentHp = state.currentHp;
    this.maxHp = state.maxHp;
    this.isAlive = state.isAlive;
    this.stats = state.stats;
    this.userId = state.userId;
    this.exp = state.exp;
    this.expToLvlUp = state.expToLvlUp;
    this.freeStatPoints = state.freeStatPoints;
  }

  addFreeStatPoints(amount: number) {
    this.freeStatPoints += amount;
  }

  gainExp(expGained: number) {
    this.exp += expGained;
    this.checkLvlUp();
  }

  private setExpToLvlUp(newExpToLvlUp: number) {
    this.expToLvlUp = newExpToLvlUp;
  }

  private checkLvlUp() {
    if (this.exp >= this.expToLvlUp) {
      this.lvlUp();
    }
  }

  private lvlUp() {
    this.exp -= this.expToLvlUp;
    this.lvl++;
    this.addFreeStatPoints(3);
    this.setMaxHp(this.maxHp * 1.2);
    this.setExpToLvlUp(this.expToLvlUp * 1.8);
    this.heal();
  }
}
