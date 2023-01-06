export default function Gameboard({ cardList, updateCurrentList }) {
  return (
    <div className="gameboard">
      {cardList.map((card) => (
        <div key={card.id}>
          <img
            onClick={() => updateCurrentList(card.id)}
            src={card.imgUrl}
            alt="card"
            style={{ width: '100px', height: '100px' }}
          />
        </div>
      ))}
    </div>
  );
}
