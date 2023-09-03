const { Schema, model } = require('./db');
// interface CharStats {
//   maxHp: number;
//   str: number;
//   def: number;
//   agi: number;
//   luck: number;
//   lvl: number;
//   exp: number;
//   expToLvlUp: number;
// }

// export class Player implements CharStats {
//   // Player class properties
//   public name: string = '';
//   public currentHp: number = 0;
//   public freeStatPoints: number = 10;
//   public isAlive: boolean = true;

//   // CharStats interface properties
//   public maxHp: number = 0;
//   public str: number = 0;
//   public def: number = 0;
//   public agi: number = 0;
//   public luck: number = 0;
//   public lvl: number = 1; // Default level is 1.
//   public exp: number = 0;
//   public expToLvlUp: number = 1000;

//   constructor(name: string) {
//     this.name = name;
//   }

//   takeDamage(damage: number) {
//     this.currentHp -= damage;
//     if (this.currentHp <= 0) {
//       this.die();
//     }
//   }

//   die() {
//     this.currentHp = 0;
//     this.isAlive = false;
//   }

//   setMaxHp(newHp: number) {
//     this.maxHp = newHp;
//   }

//   incrementStr() {
//     this.str++;
//   }

//   incrementDef() {
//     this.def++;
//   }

//   incrementAgi() {
//     this.agi++;
//   }

//   incrementLuck() {
//     this.luck++;
//   }

//   addStatPoints(amount: number) {
//     this.freeStatPoints += amount;
//   }

//   heal(amount: number = this.maxHp) {
//     if (amount + this.currentHp > this.maxHp) {
//       amount = this.maxHp - this.currentHp;
//     }
//     this.currentHp += amount;
//   }

//   private checkLvlUp() {
//     if (this.exp >= this.expToLvlUp) {
//       this.lvlUp();
//     }
//   }

//   private lvlUp() {
//     this.exp -= this.expToLvlUp;
//     this.lvl++;
//     this.addStatPoints(3);
//     this.setMaxHp(this.maxHp * 1.2);
//     this.setExpToLvlUp(this.expToLvlUp * 1.8);
//     this.heal();
//   }

//   gainExp(newExp: number) {
//     this.exp = newExp;
//     this.checkLvlUp();
//   }

//   private setExpToLvlUp(newExpToLvlUp: number) {
//     this.expToLvlUp = newExpToLvlUp;
//   }
// }

const PlayerSchema = new Schema({
  name: { type: String, required: true },
  currentHp: { type: Number, required: true },
  freeStatPoints: { type: Number, required: true },
  isAlive: { type: Boolean, required: true },
  maxHp: { type: Number, required: true },
  str: { type: Number, required: true },
  def: { type: Number, required: true },
  agi: { type: Number, required: true },
  luck: { type: Number, required: true },
  lvl: { type: Number, required: true },
  exp: { type: Number, required: true },
  expToLvlUp: { type: Number, required: true },
}, { timestamps: true });


PlayerSchema.index({ userId: 1, time: 1 });
const Player = model('Player', PlayerSchema);


module.exports = Player;
