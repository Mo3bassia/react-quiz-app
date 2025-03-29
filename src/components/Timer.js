import { useEffect } from "react";
import { getTime } from "./App";
import { useQuiz } from "../contexts/QuizContext";
function Timer() {
  const { allowedTime, dispatch } = useQuiz()
  useEffect(() => {
    let inter = setInterval(function () {
      dispatch({ type: "decreaseTime" });
      if (allowedTime === 0) dispatch({ type: "finishQuiz" });
    }, 1000);
    return () => clearInterval(inter);
  }, [allowedTime]);
  return <div className="timer">{getTime(allowedTime)}</div>;
}

export default Timer;
