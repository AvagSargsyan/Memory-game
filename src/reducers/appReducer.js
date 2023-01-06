export const ACTIONS = {
  DELETE: 'delete',
  RESET: 'reset',
  UPDATE_BEST_SCORE: 'update_best_score',
  SET_LIST: 'set_list'
}

export const reducer = (state, action) => {

  if (action.type === ACTIONS.DELETE) {
    const newCurrentList = state.currentList.filter(
      (card) => card.id !== action.payload.cardId
    );
    // Check if the game is over
    if (newCurrentList.length === 0) {
      alert('Congrats! You won the game!');
    }
    return {
      ...state,
      currentList: newCurrentList,
      score: state.score + 1,
    };
  } else if (action.type === ACTIONS.RESET) {
    return {
      ...state,
      currentList: state.cardList,
      score: 0,
    };
  } else if (action.type === ACTIONS.UPDATE_BEST_SCORE) {
    if (state.score > state.bestScore) {
      return {
        ...state,
        bestScore: state.score,
      };
    }
  } else if (action.type === ACTIONS.SET_LIST) {
    return {
      ...state,
      cardList: action.payload.list,
      currentList: action.payload.list,
    };
  }
  return state;
};
