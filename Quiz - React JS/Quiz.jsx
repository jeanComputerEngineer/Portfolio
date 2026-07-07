import { createContext, useReducer } from "react";
import questions from "./questões";

const Stages = ["Start", "Playing", "GameOver", "GameWin"];

const initialState = {
    gameStage: Stages[0],
    questions,
    currentQuestion: 0,
    retorno: "",

};

const reducer = (state, action) => {
    console.log(state, action)

    switch (action.type) {
        case "CHANGE_STATE":
            return {
                ...state,
                gameStage: Stages[1]
            }

        case "SELECT_OPTION":
            const selectedOption = action.payload;
            const isCorrect = selectedOption === state.questions[state.currentQuestion].answer;
            const maxQuestions = state.questions.length - 1;
            const currentQuestion = state.questions[state.currentQuestion];

            if (isCorrect) {
                return {
                    ...state,
                    answerSelected: true,
                    gameStage: maxQuestions === state.currentQuestion ? Stages[3] : state.gameStage,
                    currentQuestion: state.currentQuestion + 1
                };
            } else {
                return {
                    ...state,
                    answerSelected: true,
                    gameOverIndex: state.currentQuestion,
                    gameStage: Stages[2],
                    retorno: currentQuestion.retorno,
                };
            }

        case "RESET_QUIZ":
            return initialState


        default:
            return state
    }
}

export const QuizContext = createContext()

export const QuizProvider = ({ children }) => {
    const value = useReducer(reducer, initialState)
    return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>;
}

