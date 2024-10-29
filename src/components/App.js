import Main from "./Main";
import Header from "./Header";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import { useEffect, useReducer } from "react";
import Question from "./Question";
import NextButton from "./NextButton";
import Progress from "./Progress";
import FinishScreen from "./FinishScreen";

function reducer(state, action) {
  switch (action.type) {
    case "dataRecieved":
      return {
        ...state,
        questions: action.payload,
        status: "ready",
        points: 0,
        index: 0,
        answer: null,
      };

    case "dataFailed":
      return { ...state, status: "error" };
    case "start":
      return { ...state, status: "active" };
    case "finishQuiz":
      return {
        ...state,
        status: "finished",
        highScore:
          state.points > state.highScore ? state.points : state.highScore,
      };
    case "newAnswer":
      const question = state.questions[state.index];
      return {
        ...state,
        answer: action.payload,
        points:
          question.correctOption === action.payload
            ? state.points + question.points
            : state.points,
      };
    case "nextQuestion":
      return { ...state, index: state.index + 1, answer: null };

    default:
      throw new Error("Action Unkown");
  }
}

const initialState = {
  questions: [],
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highScore: 0,
};

function App() {
  const [{ answer, questions, status, index, points, highScore }, dispatch] =
    useReducer(reducer, initialState);

  const allPoints = questions?.reduce((acc, curr) => {
    return acc + curr.points;
  }, 0);

  const numQuestions = questions.length;

  useEffect(() => {
    fetch("https://codingheroes.io/api-react-course-projects/questions.json")
      .then((result) => result.json())
      .then((data) => {
        dispatch({ type: "dataRecieved", payload: data });
      })
      .catch((err) => dispatch({ type: "dataFailed" }));
  }, []);

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen
            numQuestions={numQuestions}
            onStart={() => dispatch({ type: "start" })}
          />
        )}
        {status === "active" && (
          <>
            <Progress
              numQuestions={numQuestions}
              index={index}
              points={points}
              allPoints={allPoints}
              answer={answer}
            />
            <Question
              index={index}
              questions={questions}
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />
            {index !== questions.length - 1 ? (
              <NextButton dispatch={dispatch} answer={answer} />
            ) : (
              <button
                className="btn btn-ui"
                onClick={() => dispatch({ type: "finishQuiz" })}
              >
                Finish
              </button>
            )}
          </>
        )}
        {status === "finished" && (
          <FinishScreen
            dispatch={dispatch}
            points={points}
            questions={questions}
            allPoints={allPoints}
            highScore={highScore}
          />
        )}
      </Main>
    </div>
  );
}

export default App;
