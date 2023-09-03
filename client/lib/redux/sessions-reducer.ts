

export const initialState = {
    gameSessions: [],
    messages: []
};
export const reducer = (state = initialState, action: ) => {
  if (action.type === "ADD_GAME_SESSION") {
    return Object.assign({}, state, {
      gameSessions: state.gameSessions.concat(action.payload)
    });
  }

  if (action.type === "ADD_MESSAGE") {
    return Object.assign({}, state, {
      messages: state.messages.concat(action.payload)
    });
  }

  if (action.type === "SET_GAME_SESSION_TITLE") {
    return Object.assign({}, state, {
      gameSessions: state.gameSessions.map(gameSession => {
        if (gameSession.id === action.payload.gameSessionId) {
          gameSession.setTitle(action.payload.title);
        }
        return gameSession;
      })
    });
  }
