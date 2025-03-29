import { useQuiz } from "../contexts/QuizContext.js";
import Options from "./Options.js";

function Question() {
  const {index,
    questions,
    dispatch,
    answer } = useQuiz()
    const question = questions[index]
    const { options, question: questionTitle, points, correctOption } = question;

  return (
    <div>
      <h4>{questionTitle}</h4>
      <Options
        options={options}
        correctOption={correctOption}
      />
    </div>
  );
}

export default Question;
