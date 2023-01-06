import { useReducer } from 'react';
import Gameboard from './components/Gameboard';
import Scores from './components/Scores';
import { useEffect } from 'react';

const shuffleList = (array) => {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex !== 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
};

const reducer = (state, action) => {
  if (action.type === 'DELETE') {
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
  } else if (action.type === 'RESET') {
    return {
      ...state,
      currentList: state.cardList,
      score: 0,
    };
  } else if (action.type === 'UPDATE_BEST_SCORE') {
    if (state.score > state.bestScore) {
      return {
        ...state,
        bestScore: state.score,
      };
    }
  } else if (action.type === 'SET_LIST') {
    return {
      ...state,
      cardList: action.payload.list,
      currentList: action.payload.list,
    };
  }
  return state;
};

function App() {
  const [state, dispatch] = useReducer(reducer, {
    cardList: [],
    currentList: [],
    score: 0,
    bestScore: 0,
  });

  // fetching data -------------------
  const fetchPokemons = async (amount) => {
    const pokemons = [];

    for (let i = 1; i <= amount; i++) {
      const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${i}`;
      const response = await fetch(pokemonUrl);
      const pokemon = await response.json();
      const id = pokemon.id;
      const cardName = pokemon.name;
      const imgUrl = pokemon.sprites.front_default;
      pokemons.push({ id, cardName, imgUrl });
    }

    return pokemons;
  };

  useEffect(() => {
    const loadCards = async () => {
      dispatch({
        type: 'SET_LIST',
        payload: {
          list: shuffleList(await fetchPokemons(12)),
        },
      });
    };

    loadCards();
  }, []);

  // ---------------------------------

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

        dispatch({
          type: 'UPDATE_BEST_SCORE',
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
        shuffleList={shuffleList}
      />
    </div>
  );
}

export default App;
