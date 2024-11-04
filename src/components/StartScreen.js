function StartScreen({ numQuestions, onStart }) {
  return (
    <div className="start">
      <h2>Welcome to the React Quiz!</h2>
      <h3>{numQuestions} questions to test your React mastery</h3>
      <div className="filter-questions">
        <label htmlFor="difficulty">
          <h4>choose the difficulty of the questions</h4>
        </label>
        <select id="difficulty">
          <option selected={true}>All</option>
          <option>Easy</option>
          <option>Medium</option>
          <option>Hard</option>
        </select>
      </div>
      <button onClick={onStart} className="btn btn-ui">
        Let's start
      </button>
    </div>
  );
}

export default StartScreen;
