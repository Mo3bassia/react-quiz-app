function StartScreen({ numQuestions, onStart }) {
  return (
    <div className="start">
      <h2>Welcome to the React Quiz!</h2>
      <h3>{numQuestions} quesions to test your React mastery</h3>
      <button onClick={onStart} className="btn btn-ui">
        Let's start
      </button>
    </div>
  );
}

export default StartScreen;
