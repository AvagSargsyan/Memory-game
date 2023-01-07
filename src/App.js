import { useReducer } from 'react';
import './styles/App.scss'
import Gameboard from './components/Gameboard';
import Scores from './components/Scores';
import { useEffect } from 'react';
import { shuffleList } from './utilities/shuffleList';
import { fetchPokemons } from './utilities/fetchPokemons';
import { ACTIONS, reducer } from './reducers/appReducer';
import Header from './components/Header';

function App() {
  const [state, dispatch] = useReducer(reducer, {
    cardList: [],
    currentList: [],
    score: 0,
    bestScore: 0,
  });

  // fetching pokemon data
  useEffect(() => {
    const loadCards = async () => {
      dispatch({
        type: ACTIONS.SET_LIST,
        payload: {
          list: shuffleList(await fetchPokemons(12)),
        },
      });
    };

    loadCards();
  }, []);
  // ----------------------

  const updateCurrentList = (cardId) => {
    let containsCard = false;
    state.currentList.forEach((card) => {
      if (card.id === cardId) {
        dispatch({
          type: ACTIONS.DELETE,
          payload: {
            cardId: cardId,
          },
        });

        dispatch({
          type: ACTIONS.UPDATE_BEST_SCORE,
        });

        containsCard = true;
      }
    });

    if (!containsCard) {
      dispatch({
        type: ACTIONS.RESET,
      });
    }
  };

  return (
    <div className="App">
      <Header />
      <main>
        <Scores score={state.score} bestScore={state.bestScore} />
        <Gameboard
          cardList={state.cardList}
          updateCurrentList={updateCurrentList}
          shuffleList={shuffleList}
        />
      </main>
    </div>
  );
}

export default App;
