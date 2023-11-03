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

export interface CharStats {
  str: number;
  def: number;
  agi: number;
  luck: number;
  cha: number;
  int: number;
}

export interface CharacterState {
  name: string;
  lvl: number;
  currentHp: number;
  maxHp: number;
  isAlive: boolean;
  stats: CharStats;
}

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
});

export class Character implements CharacterState {
  static defaultState = defaultState;
  name: string;
  lvl: number;
  currentHp: number;
  isAlive: boolean = true;
  maxHp: number;
  stats: CharStats;

  constructor(nameOrState: string | CharacterState, lvl?: number) {
    if (typeof nameOrState === 'string') {
      this.setState(Object.getPrototypeOf(this).constructor.defaultState);
      this.name = nameOrState;
      this.lvl = lvl || 1;
    } else {
      this.setState(nameOrState);
    }
  }

  getState(): CharacterState {
    return {
      name: this.name,
      lvl: this.lvl,
      currentHp: this.currentHp,
      maxHp: this.maxHp,
      isAlive: this.isAlive,
      stats: this.stats,
    };
  }

  setState(state: CharacterState) {
    this.name = state.name;
    this.lvl = state.lvl;
    this.currentHp = state.currentHp;
    this.maxHp = state.maxHp;
    this.isAlive = state.isAlive;
    this.stats = {
      str: state.stats.str,
      def: state.stats.def,
      agi: state.stats.agi,
      luck: state.stats.luck,
      cha: state.stats.cha,
      int: state.stats.int,
    };
  }

  addStat(stat: StatType, amount: number = 1) {
    this.stats[stat] += amount;
  }

  attack(target: Character) {
    console.log(`${this.name} attacks ${target.name}!`);
    let damage =
      Math.ceil(Math.random() * 5) +
      Math.ceil(this.stats['str'] / target.stats['def']);
    target.takeDamage(damage);
    console.log(`${target.name} takes ${damage} damage!`);
    console.log(`${target.name} has ${target.currentHp} hp left!`);
    return damage;
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

  heal(amount: number = this.maxHp) {
    if (amount + this.currentHp > this.maxHp) {
      amount = this.maxHp - this.currentHp;
    }
    this.currentHp += amount;
  }
}
