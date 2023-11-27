import { Enemy } from './Enemy';
import { Player } from './Player';

export type CombatState = {
  player: Player;
  enemy: Enemy;
  damageDealt?: number;
  damageTaken?: number;
  lastAction?: string;
  status: 'inCombat' | 'enemyDefeated' | 'playerDefeated' | 'idle';
};
// export type CombatState =
//   | {
//       status: 'inCombat';
//       player: Player;
//       enemy: Enemy;
//       playerDamage: number;
//       enemyDamage: number;
//       lastAction: string;
//     }
//   | {
//       status: 'enemyDefeated';
//       player: Player;
//       enemy: Enemy;
//       playerDamage: number;
//       lastAction: string;
//       reward: string[];
//     }
//   | {
//       status: 'playerDefeated';
//       player: Player;
//       enemy: Enemy;
//       enemyDamage: number;
//       lastAction: string;
//     }
//   | {
//       status: 'idle';
//       player: Player;
//       enemy: Enemy;
//     };
// | {};
