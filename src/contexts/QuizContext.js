import React, { createContext, useContext, useEffect, useReducer } from 'react'



const QuizContext = createContext()



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

export function QuizProvider({ children }) {
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
    <QuizContext.Provider value={{
      answer,
        questions,
        status,
        index,
        points,
        highScore,
        allowedTime,
        difficulty,
        filteredQuestions,
        timer,dispatch,allPoints,numQuestions}}>{children}</QuizContext.Provider>
  )
}

export function useQuiz() {
    const context = useContext(QuizContext)
    if (!context) throw new Error("You have used state out of Quiz Context Compoment")
    return context;
}
