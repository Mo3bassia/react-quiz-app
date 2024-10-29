function Options({
  options,
  dispatch,
  answer,
  correctOption,
  questions,
  index,
}) {
  // const handleClick = () => {
  //   console.log(index !== questions.length - 1);
  //   dispatch({ type: "newAnswer", payload: index });
  // };
  return (
    <div className="options">
      {options.map((option, index) => (
        <button
          className={`btn btn-option ${index === answer ? "answer" : ""} ${
            answer !== null && index === answer && answer === correctOption
              ? "correct"
              : ""
          } ${answer !== null && index !== correctOption ? "wrong" : ""} ${
            answer !== null && index === correctOption ? "correct" : ""
          }`}
          disabled={answer !== null}
          key={option}
          onClick={() => dispatch({ type: "newAnswer", payload: index })}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export default Options;
