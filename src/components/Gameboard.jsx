export default function Gameboard({
  cardList,
  updateCurrentList,
  shuffleList,
}) {
  return (
    <div className="gameboard">
      {cardList.map((card) => (
        <div key={card.id}>
          <img
            onClick={() => {
              updateCurrentList(card.id);
              shuffleList(cardList);
            }}
            src={card.imgUrl}
            alt="card"
            style={{ width: '100px', height: '100px' }}
          />
        </div>
      ))}
    </div>
  );
}
