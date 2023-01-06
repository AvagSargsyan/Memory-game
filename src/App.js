import { useReducer } from 'react';
import Gameboard from './components/Gameboard';
import Scores from './components/Scores';

const reducer = (state, action) => {
  if (action.type === 'DELETE') {
    const newCurrentList = state.currentList.filter(
      (card) => card.id !== action.payload.cardId
    );
    return {
      ...state,
      currentList: newCurrentList,
      score: state.score + 1,
    };
  } else if (action.type === 'RESET') {
    return {
      ...state,
      currentList: state.cardList,
      score: 0,
    };
  }
  return state;
};

function App() {
  const [state, dispatch] = useReducer(reducer, {
    cardList: [
      {
        id: 0,
        imgUrl:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png',
      },
      {
        id: 1,
        imgUrl: 'https://www.megaleechers.com/storage/AngularJS-Icon.png',
      },
      {
        id: 2,
        imgUrl: 'https://avatars.githubusercontent.com/u/6128107?s=280&v=4',
      },
      {
        id: 3,
        imgUrl: 'https://avatars.githubusercontent.com/u/23617963?s=280&v=4',
      },
    ],
    currentList: [
      {
        id: 0,
        imgUrl:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png',
      },
      {
        id: 1,
        imgUrl: 'https://www.megaleechers.com/storage/AngularJS-Icon.png',
      },
      {
        id: 2,
        imgUrl: 'https://avatars.githubusercontent.com/u/6128107?s=280&v=4',
      },
      {
        id: 3,
        imgUrl: 'https://avatars.githubusercontent.com/u/23617963?s=280&v=4',
      },
    ],
    score: 0,
    bestScore: 0,
  });

  const updateCurrentList = (cardId) => {
    let containsCard = false;
    state.currentList.forEach((card) => {
      if (card.id === cardId) {
        dispatch({
          type: 'DELETE',
          payload: {
            cardId: cardId,
          },
        });
        containsCard = true;
      }
    });

    if (!containsCard) {
      dispatch({
        type: 'RESET',
      });
    }
  };

  return (
    <div className="App">
      <h1>Pokemon Cards</h1>
      <Scores score={state.score} bestScore={state.bestScore} />
      <Gameboard
        cardList={state.cardList}
        updateCurrentList={updateCurrentList}
      />
    </div>
  );
}

export default App;
