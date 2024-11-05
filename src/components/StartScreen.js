import { useState } from "react";

function StartScreen({ numQuestions, onStart, dispatch }) {
  const [difficultyValue, setDifficultyValue] = useState("All");

  function handleChange(e) {
    setDifficultyValue(e.target.value);
    dispatch({ type: "setDifficulty", payload: e.target.value });
  }
  return (
    <div className="start">
      <h2>Welcome to the React Quiz!</h2>
      <h3>{numQuestions} questions to test your React mastery</h3>
      <div className="filter-questions">
        <label htmlFor="difficulty">
          <h4>choose the difficulty of the questions</h4>
        </label>
        <select
          id="difficulty"
          value={difficultyValue}
          onChange={(e) => handleChange(e)}
        >
          <option>All</option>
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
