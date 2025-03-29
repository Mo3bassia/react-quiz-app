import { useQuiz } from "../contexts/QuizContext";

function Progress() {
  const {numQuestions, points, allPoints,answer,index} = useQuiz()
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
