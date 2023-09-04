import { create } from 'zustand';
import { Player } from './types/Player';


interface PlayerState {
  player: Player;
  updatePlayer: (updatedPlayer: Player) => void;
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

export const usePlayerStore = create<PlayerState>()(set => ({
  player: new Player('playerName', 'playerId'),
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
