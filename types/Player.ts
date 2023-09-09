// import { Item } from './Item';
import { Character } from '@/types/Character';


export class Player extends Character {
  userId: string;
  isAlive: boolean = true;
  lvl: number = 1;
  exp: number = 0;
  expToLvlUp: number = 1000;
  freeStatPoints: number = 8;

  constructor(name: string, userId: string) {
    super(name);
    this.userId = userId;
  }

  addFreeStatPoints(amount: number) {
    this.freeStatPoints += amount;
  }

  gainExp(newExp: number) {
    this.exp = newExp;
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
