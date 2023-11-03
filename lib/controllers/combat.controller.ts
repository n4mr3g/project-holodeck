import { Enemy } from '@/types/Enemy';
import { Player, PlayerState } from '@/types/Player';
import { updatePlayerState } from './player.controller';

export async function attackEnemy(
  player: Player,
  enemy: Enemy,
): Promise<PlayerState> {
  const damageDealt = player.attack(enemy);
  return await updatePlayerState(player.userId, player.getState());
  // return damageDealt;
}
