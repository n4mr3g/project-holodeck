interface CharStats {
  maxHp: number;
  str: number;
  def: number;
  agi: number;
  luck: number;
  lvl: number;
  exp: number;
  expToLvlUp: number;
}

export class Player implements CharStats {
  // Player class properties
  public name: string = '';
  public currentHp: number = 0;
  public freeStatPoints: number = 10;
  public isAlive: boolean = true;

  public userId: string | null = '';

  // CharStats interface properties
  public maxHp: number = 0;
  public str: number = 0;
  public def: number = 0;
  public cha: number = 0;
  public int: number = 0;
  public agi: number = 0;
  public luck: number = 0;
  public lvl: number = 1; // Default level is 1.
  public exp: number = 0;
  public expToLvlUp: number = 1000;

  constructor(name: string, userId: string | null) {
    this.name = name;
    this.userId = userId;
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

  incrementStr() {
    this.str++;
  }

  incrementDef() {
    this.def++;
  }

  incrementAgi() {
    this.agi++;
  }

  incrementLuck() {
    this.luck++;
  }

  addStatPoints(amount: number) {
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
    this.addStatPoints(3);
    this.setMaxHp(this.maxHp * 1.2);
    this.setExpToLvlUp(this.expToLvlUp * 1.8);
    this.heal();
  }

  gainExp(newExp: number) {
    this.exp = newExp;
    this.checkLvlUp();
  }

  private setExpToLvlUp(newExpToLvlUp: number) {
    this.expToLvlUp = newExpToLvlUp;
  }
}
