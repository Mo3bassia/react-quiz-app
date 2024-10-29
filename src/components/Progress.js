function Progress({ index, numQuestions, points, allPoints, answer }) {
  return (
    <header className="progress">
      <progress
        max={numQuestions}
        value={index + +(answer !== null)}
      ></progress>
      <p>
        Question <strong>{index + 1}</strong> / {numQuestions}
      </p>
      <p>
        <strong>{points}</strong> / {allPoints}
      </p>
    </header>
  );
}

export default Progress;
