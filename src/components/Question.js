import Options from "./Options.js";

function Question({ question, dispatch, answer }) {
  const { options, question: questionTitle, points, correctOption } = question;

  return (
    <div>
      <h4>{questionTitle}</h4>
      <Options
        options={options}
        answer={answer}
        dispatch={dispatch}
        correctOption={correctOption}
      />
    </div>
  );
}

export default Question;
