import '../styles/Scores.scss';

export default function Scores({ score, bestScore }) {
  return (
    <div className="scores">
      <p className="current-score">
        Current score: <span>{score}</span>
      </p>
      <p className="best-score">
        Best score: <span>{bestScore}</span>
      </p>
    </div>
  );
}
