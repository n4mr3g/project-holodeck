export const StatsTable = Object.freeze( {
  str : {
    name: 'Strength',
    description: 'Increases damage dealt.',
  },
  def : {
    name: 'Defense',
    description: 'Decreases damage taken.',
  },
  agi : {
    name: 'Agility',
    description: 'Increases chance to dodge.',
  },
  luck : {
    name: 'Luck',
    description: 'Increases chance to crit.',
  },
  cha : {
    name: 'Charisma',
    description: 'Increases chance to get better deals at the shop.',
  },
  int : {
    name: 'Intelligence',
    description: 'Increases chance to get better deals at the shop.',
  },
});

type StatType = keyof typeof StatsTable;

export class CharStat {
  type: StatType;
  value: number;

  constructor(type: StatType, value: number) {
    this.value = value;
    this.type = type;
  }

  static getName(type: StatType) {
    return StatsTable[type].name;
  }
  static getDescription(type: StatType) {
    return StatsTable[type].description;
  }

  increment(value: number = 1) {
    this.value += value;
  }

  decrement(value: number = 1) {
    this.value -= value;
  }
}


export class Player {
  userId: string;
  name: string;

  // Player class properties
  currentHp: number = 0;
  maxHp: number = 0;
  isAlive: boolean = true;
  lvl: number = 1; // Default level is 1.
  exp: number = 0;
  expToLvlUp: number = 1000;
  freeStatPoints: number = 8;
  stats: CharStat[];

  constructor(name: string, userId: string) {
    this.name = name;
    this.userId = userId;
    this.stats = [
      new CharStat('str', 1),
      new CharStat('def', 1),
      new CharStat('agi', 1),
      new CharStat('luck', 1),
      new CharStat('cha', 1),
      new CharStat('int', 1),
    ];
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

  gainExp(newExp: number) {
    this.exp = newExp;
    this.checkLvlUp();
  }

  assignStatPoint(stat: CharStat, amount: number = 1) {
    if (this.freeStatPoints < amount) {
      return;
    }
    stat.increment(amount);
    this.freeStatPoints -= amount;
  }

  private setExpToLvlUp(newExpToLvlUp: number) {
    this.expToLvlUp = newExpToLvlUp;
  }
}
