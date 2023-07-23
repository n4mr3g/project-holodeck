import GameSession from '@/types/GameSession';
import Message from '@/types/Message';

export const ADD_GAME_SESSION = "ADD_GAME_SESSION";
export const ADD_MESSAGE = "ADD_MESSAGE";
export const SET_GAME_SESSION_TITLE = "SET_GAME_SESSION_TITLE";

export const addGameSession = (gameSession: GameSession) => ({
  type: ADD_GAME_SESSION,
  payload: gameSession
});

export const addMessage = (gameSessionId: string, message: Message) => ({
  type: ADD_MESSAGE,
  payload: { gameSessionId, message }
});
