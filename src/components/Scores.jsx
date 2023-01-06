export default function Scores({ score, bestScore }) {
  return (
    <div className="scores">
      <p className="current-score">Current score: {score}</p>
      <p className="best-score">Best score: {bestScore}</p>
    </div>
  );
}
