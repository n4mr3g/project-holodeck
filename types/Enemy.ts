export class Enemy {
  name: string;
  currentHp: number;
  maxHp: number;
  isAlive: boolean;
  lvl: number;

  constructor(name: string, lvl: number) {
    this.name = name;
    this.lvl = lvl;
    this.maxHp = 20 * lvl;
    this.currentHp = this.maxHp;
    this.isAlive = true;
  }

  takeDamage(damage: number) {
    this.currentHp -= damage;
    if (this.currentHp <= 0) {
      this.isAlive = false;
    }
  }

  heal(amount: number = this.maxHp) {
    if (amount + this.currentHp > this.maxHp) {
      this.currentHp = this.maxHp;
    } else {
      this.currentHp += amount;
    }
  }

  setMaxHp(newHp: number) {
    this.maxHp = newHp;
  }

  die() {
    this.isAlive = false;
  }

}
