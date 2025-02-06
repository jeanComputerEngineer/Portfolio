import React, { useContext } from "react";
import { QuizContext } from "./Quiz";
import styles from "./Quiz.module.css";

const GameOver = () => {
    const [quizState, dispatch] = useContext(QuizContext);

    const OverMessage = quizState.retorno; // Acesso à mensagem de retorno

    console.log(quizState);

    return (
        <div className={styles.containerGameOver}>
            <h1>{OverMessage}</h1>
            <h2>Nasça em outra vida, você fracassou.</h2>
            <button onClick={() => dispatch({ type: "RESET_QUIZ" })}>Jogar Novamente</button>
        </div>
    );
};

export default GameOver;
