import { useQuiz } from "../contexts/QuizContext";

function NextButton() {
  const { dispatch, answer } = useQuiz()
  if (answer === null) return;
  return (
    <button
      onClick={() => dispatch({ type: "nextQuestion" })}
      className="btn btn-ui"
    >
      Next
    </button>
  );
}

export default NextButton;
