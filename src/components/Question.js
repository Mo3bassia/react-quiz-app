import Options from "./Options.js";

function Question({ question }) {
  const { options, question: questionTitle, points, correctOption } = question;
  return (
    <div>
      <h4>{questionTitle}</h4>
      <Options options={options} />
    </div>
  );
}

export default Question;
