function FinishScreen({ points, allPoints, dispatch, questions, highScore }) {
  const percentage = Math.ceil((points / allPoints) * 100);

  let emoji;
  if (percentage === 100) emoji = "🥇";
  if (percentage >= 80 && percentage < 100) emoji = "🎉";
  if (percentage >= 50 && percentage < 80) emoji = "🙃";
  if (percentage >= 0 && percentage < 50) emoji = "🤨";
  if (percentage === 0) emoji = "🤦‍♂️";

  return (
    <>
      <p className="result">
        {emoji} You scored <strong>{points}</strong> out of {allPoints} (
        {percentage}%)
      </p>
      <p className="highscore">(Highscore: {highScore} points)</p>
      <div className="btns-cont">
        <button
          className="btn btn-ui"
          onClick={() => dispatch({ type: "seeResults" })}
        >
          See Results
        </button>
        <button
          className="btn btn-ui"
          onClick={() => dispatch({ type: "restart" })}
        >
          Restart quiz
        </button>
      </div>
    </>
  );
}

export default FinishScreen;
