import React, { useContext } from "react";
import { QuizContext } from "./Quiz";
import styles from "./Quiz.module.css";

const Questions = () => {
    const [quizState, dispatch] = useContext(QuizContext);
    const currentQuestion = quizState.questions[quizState.currentQuestion];

    console.log(quizState);

    return (
        <div className={styles.containerQuestions}>
            <h1>Questão {quizState.currentQuestion + 1}</h1>
            <h2>{currentQuestion.question}</h2>

            <ul>
                {currentQuestion.options.map((option) => (
                    <li
                        key={option}
                        onClick={() => {
                            dispatch({
                                type: "SELECT_OPTION",
                                payload: option,
                            });
                        }}
                    >
                        {option}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Questions;
