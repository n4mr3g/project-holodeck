export const StatsTable = Object.freeze({
  str: {
    name: 'Strength',
    description: 'Increases damage dealt.',
  },
  def: {
    name: 'Defense',
    description: 'Decreases damage taken.',
  },
  agi: {
    name: 'Agility',
    description: 'Increases chance to dodge.',
  },
  luck: {
    name: 'Luck',
    description: 'Increases chance to crit and find better loot.',
  },
  cha: {
    name: 'Charisma',
    description: 'Increases persuasion and bartering.',
  },
  int: {
    name: 'Intelligence',
    description: 'Increases magic damage and mana.',
  },
});

export type StatType = keyof typeof StatsTable;

export interface CharStat {
  type: StatType;
  value: number;
  description: string;
  name: string;
}

export class Player {
  userId: string;
  name: string;
  currentHp: number = 0;
  maxHp: number = 0;
  isAlive: boolean = true;
  lvl: number = 1;
  exp: number = 0;
  expToLvlUp: number = 1000;
  freeStatPoints: number = 8;
  stats: CharStat[];

  constructor(name: string, userId: string) {
    this.name = name;
    this.userId = userId;
    this.stats = [
      {
        type: 'str',
        value: 0,
        description: 'Increases damage dealt.',
        name: 'Strength',
      },
      {
        type: 'def',
        value: 0,
        description: 'Decreases damage taken.',
        name: 'Defense',
      },
      {
        type: 'agi',
        value: 0,
        description: 'Increases chance to dodge.',
        name: 'Agility',
      },
      {
        type: 'luck',
        value: 0,
        description: 'Increases chance to crit and find better loot.',
        name: 'Luck',
      },
      {
        type: 'cha',
        value: 0,
        description: 'Increases persuasion and bartering.',
        name: 'Charisma',
      },
      {
        type: 'int',
        value: 0,
        description: 'Increases magic damage and mana.',
        name: 'Intelligence',
      },
    ];
  }

  addStr(amount: number = 1) {
    this.stats[0].value += amount;
  }
  addDef(amount: number = 1) {
    this.stats[1].value += amount;
  }
  addAgi(amount: number = 1) {
    this.stats[2].value += amount;
  }
  addLuck(amount: number = 1) {
    this.stats[3].value += amount;
  }
  addCha(amount: number = 1) {
    this.stats[4].value += amount;
  }
  addInt(amount: number = 1) {
    this.stats[5].value += amount;
  }
  

  takeDamage(damage: number) {
    this.currentHp -= damage;
    if (this.currentHp <= 0) {
      this.die();
    }
  }

  die() {
    this.currentHp = 0;
    this.isAlive = false;
  }

  setMaxHp(newHp: number) {
    this.maxHp = newHp;
  }

  addFreeStatPoints(amount: number) {
    this.freeStatPoints += amount;
  }

  heal(amount: number = this.maxHp) {
    if (amount + this.currentHp > this.maxHp) {
      amount = this.maxHp - this.currentHp;
    }
    this.currentHp += amount;
  }

  gainExp(newExp: number) {
    this.exp = newExp;
    this.checkLvlUp();
  }

  // assignStatPoint(stat: CharStat, amount: number = 1) {
  //   if (this.freeStatPoints < amount) {
  //     return;
  //   }
  //   stat.increment(amount);
  //   this.freeStatPoints -= amount;
  // }

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
