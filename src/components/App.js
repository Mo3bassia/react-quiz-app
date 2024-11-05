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
import Footer from "./Footer.js";
import Mo3bassia from "./Mo3bassia.js";
import Timer from "./Timer.js";

export function getTime(time) {
  let minutes =
    Math.floor(time / 60) < 10
      ? `0${Math.floor(time / 60)}`
      : Math.floor(time / 60);
  let seconds = time % 60 < 10 ? `0${time % 60}` : time % 60;
  return minutes + ":" + seconds;
}

function reducer(state, action) {
  switch (action.type) {
    case "dataRecieved":
      return {
        ...state,
        questions: action.payload,
        filteredQuestions: action.payload,
        status: "ready",
        points: 0,
        index: 0,
        answer: null,
      };
    case "setDifficulty":
      return {
        ...state,
        difficulty: action.payload,
        filteredQuestions: state.questions.filter((q) =>
          action.payload.toLowerCase() === "all"
            ? true
            : q.difficulty === action.payload.toLowerCase()
        ),
      };

    case "dataFailed":
      return { ...state, status: "error" };
    case "start":
      return {
        ...state,
        status: "active",
        allowedTime: state.filteredQuestions.length * 30,
      };
    case "finishQuiz":
      return {
        ...state,
        allAnswers:
          state.allAnswers.length === state.filteredQuestions.length
            ? [...state.allAnswers]
            : [...state.allAnswers, state.answer],
        status: "finished",
        highScore:
          state.points > state.highScore ? state.points : state.highScore,
      };
    case "newAnswer":
      let question = state.questions[state.index];
      if (state.filteredQuestions.length !== 0)
        question = state.filteredQuestions[state.index];
      return {
        ...state,
        answer: action.payload,
        points:
          question.correctOption === action.payload
            ? state.points + question.points
            : state.points,
      };
    case "nextQuestion":
      return {
        ...state,
        index: state.index + 1,
        answer:
          state.allAnswers.length === state.filteredQuestions.length
            ? state.allAnswers[state.index + 1]
            : null,
        allAnswers:
          state.allAnswers.length === state.filteredQuestions.length
            ? [...state.allAnswers]
            : [...state.allAnswers, state.answer],
      };
    case "seeResults":
      return {
        ...state,
        status: "replay",
        index: 0,
        answer: state.allAnswers[0],
        timer: false,
      };

    case "restart":
      return {
        ...initialState,
        allAnswers: [],
        questions: state.questions,
        filteredQuestions: state.questions,
        status: "ready",
        highScore: state.highScore,
      };
    case "decreaseTime":
      return { ...state, allowedTime: state.allowedTime - 1 };

    default:
      throw new Error("Action Unkown");
  }
}

const initialState = {
  questions: [],
  filteredQuestions: [],
  status: "loading",
  index: 0,
  answer: null,
  allAnswers: [],
  points: 0,
  highScore: 0,
  allowedTime: 450,
  difficulty: "All",
  timer: true,
};

function App() {
  let [
    {
      answer,
      questions,
      status,
      index,
      points,
      highScore,
      allowedTime,
      difficulty,
      filteredQuestions,
      timer,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  [filteredQuestions, questions] = [questions, filteredQuestions];

  const allPoints = questions?.reduce((acc, curr) => {
    return acc + curr.points;
  }, 0);

  const numQuestions = questions.length;

  useEffect(() => {
    fetch(
      "https://my-json-server.typicode.com/Mo3bassia/react-quiz-app/questions"
    )
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
            dispatch={dispatch}
            numQuestions={numQuestions}
            onStart={() => dispatch({ type: "start" })}
          />
        )}
        {(status === "active" || status === "replay") && (
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
            <Footer>
              {index !== questions.length - 1 ? (
                <>
                  {timer && (
                    <Timer allowedTime={allowedTime} dispatch={dispatch} />
                  )}
                  <NextButton dispatch={dispatch} answer={answer} />
                </>
              ) : (
                <button
                  className="btn btn-ui"
                  onClick={() => dispatch({ type: "finishQuiz" })}
                >
                  Finish
                </button>
              )}
            </Footer>
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
      <Mo3bassia />
    </div>
  );
}

export default App;
