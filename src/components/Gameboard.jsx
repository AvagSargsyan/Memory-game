import '../styles/Gameboard.scss';

export default function Gameboard({
  cardList,
  updateCurrentList,
  shuffleList,
}) {
  return (
    <div className="gameboard">
      {cardList.map((card) => (
        <div
          key={card.id}
          onClick={() => {
            updateCurrentList(card.id);
            shuffleList(cardList);
          }}
          className="card"
        >
          <img
            className="card-img"
            src={card.imgUrl}
            alt="card"
            style={{ width: '100px', height: '100px' }}
          />
          <p className="card-name">{card.cardName}</p>
        </div>
      ))}
    </div>
  );
}
