import { useEffect } from "react";
import { getTime } from "./App";
function Timer({ allowedTime, dispatch }) {
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
