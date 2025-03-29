import Main from "./Main";
import Header from "./Header";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import NextButton from "./NextButton";
import Progress from "./Progress";
import FinishScreen from "./FinishScreen";
import Footer from "./Footer.js";
import Mo3bassia from "./Mo3bassia.js";
import Timer from "./Timer.js";
import {useQuiz} from '../contexts/QuizContext.js'

export function getTime(time) {
  let minutes =
    Math.floor(time / 60) < 10
      ? `0${Math.floor(time / 60)}`
      : Math.floor(time / 60);
  let seconds = time % 60 < 10 ? `0${time % 60}` : time % 60;
  return minutes + ":" + seconds;
}


function App() {
  const {questions,status,index,timer,dispatch} = useQuiz()
  
  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen
            onStart={() => dispatch({ type: "start" })}
          />
        )}
        {(status === "active" || status === "replay") && (
          <>
            <Progress/>
            <Question/>
            <Footer>
              {index !== questions.length - 1 ? (
                <>
                  {timer && (
                    <Timer />
                  )}
                  <NextButton/>
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
          <FinishScreen/>
        )}
      </Main>
      <Mo3bassia />
    </div>
  );
}

export default App;
