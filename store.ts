import { create } from 'zustand';
import { CharStat, Player, StatType } from './types/Player';

interface State {
  player: Player;
  // stats: CharStat[];
  // previousState: Player;
  // isAddingStatPoints: boolean;
  // saveStatPoints: () => void;
  // restoreStatPoints: () => void;
  // addStatPoint: (statType: StatType) => void;
  // removeStatPoint: (statType: StatType) => void;
  updatePlayer: (updatedPlayer: Player) => void;
  addStr: (amount: number) => void;
  addDef: (amount: number) => void;
  addAgi: (amount: number) => void;
  addLuck: (amount: number) => void;
  addCha: (amount: number) => void;
  addInt: (amount: number) => void;
}

// interface StatsState {
//   stats: CharStat[];
//   assignStatPoint: (stat: CharStat, amount: number) => void;
// }

// interface FreeStatPointsState {
//   freeStatPoints: number;
//   decrease: (amount: number) => void;
//   setValue: (amount: number) => void;
// }

export const usePlayerStore = create<State>()(set => ({
  player: new Player('', ''),
  addAgi: (amount: number) => {
    set(state => {
      state.player.addAgi(amount);
      return { player: state.player };
    });
  },
  addCha: (amount: number) => {
    set(state => {
      state.player.addCha(amount);
      return { player: state.player };
    });
  },
  addDef: (amount: number) => {
    set(state => {
      state.player.addDef(amount);
      return { player: state.player };
    });
  },
  addInt: (amount: number) => {
    set(state => {
      state.player.addInt(amount);
      return { player: state.player };
    });
  },
  addLuck: (amount: number) => {
    set(state => {
      state.player.addLuck(amount);
      return { player: state.player };
    });
  },
  addStr: (amount: number) => {
    set(state => {
      state.player.addStr(amount);
      return { player: state.player };
    });
  },


  updatePlayer: (updatedPlayer: Player) =>
    set(state => ({ player: updatedPlayer })),
}));

// export const useStatsStore = create<StatsState>()(set => ({
//   stats: usePlayerStore.getState().player.stats,
//   assignStatPoint: (stat: CharStat, amount: number = 1) => {
//     set(state => {
//       if (usePlayerStore.getState().player.freeStatPoints < amount) {
//         return state;
//       }
//       stat.increment(amount);
//       usePlayerStore.getState().player.freeStatPoints -= amount;
//       return { stats: state.stats };
//     });
//   },
// }));

// export const useFreeStatPointsStore = create<FreeStatPointsState>()(set => ({
//   freeStatPoints: usePlayerStore.getState().player.freeStatPoints,

//   setValue: (value: number) => {
//     set(state => {
//       usePlayerStore.getState().player.freeStatPoints += value;
//       return { freeStatPoints: state.freeStatPoints };
//     });
//   },

//   decrease: (amount: number) => {
//     set(state => {
//       if (usePlayerStore.getState().player.freeStatPoints < amount) {
//         return state;
//       }
//       usePlayerStore.getState().player.freeStatPoints -= amount;

//       return { freeStatPoints: state.freeStatPoints };
//     });
//   },
// }));
