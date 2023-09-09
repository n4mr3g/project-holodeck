import { create } from 'zustand';
import { Player, PlayerState } from './types/Player';
import { Character, StatType } from './types/Character';

interface State {
  player: Player;
  enemy: Character;
  // stats: CharStat[];
  // previousState: Player;
  // isAddingStatPoints: boolean;
  // saveStatPoints: () => void;
  // restoreStatPoints: () => void;
  // addStatPoint: (statType: StatType) => void;
  // removeStatPoint: (statType: StatType) => void;
  attack(attacker: Character, target: Character): void;
  updatePlayer: (updatedPlayer: Player) => void;
  updatePlayerState: (updatedState: PlayerState) => void;
  updateEnemy: (updatedEnemy: Character) => void;
  addStat: (stat: StatType, amount: number) => void;
}

export const usePlayerStore = create<State>()(set => ({
  player: new Player('', ''),
  enemy: new Character(''),
  attack: (attacker, target) => {
    set(state => {
      attacker.attack(target);
      return { player: state.player, enemy: state.enemy };
    });
  },
  updateEnemy: (updatedEnemy: Character) =>
    set(state => ({ enemy: updatedEnemy })),
  addStat: (stat: StatType, amount: number) => {
    set(state => {
      state.player.addStat(stat, amount);
      return { player: state.player };
    });
  },
  updatePlayer: (updatedPlayer: Player) =>
    set(state => ({ player: updatedPlayer })),

  updatePlayerState: (updatedState: PlayerState) =>
    set(state => {
      state.player.setState(updatedState);
      return { player: state.player };
    }),
}));
