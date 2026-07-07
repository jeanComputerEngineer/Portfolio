import styles from './Quiz.module.css'
import { QuizContext } from "./Quiz"
import { useContext } from "react"
import Start from './Start'
import Questions from './Questions'
import GameOver from './GameOver'
import GameWin from './GameWin'

import { useTheme } from '../../ThemeContext';

function IndexQuizz() {
    const [quizState] = useContext(QuizContext)

    console.log(useContext(QuizContext))


    const { isDarkMode } = useTheme();
    const theme = isDarkMode ? styles.dark : styles.light;

    return (
        <div className={theme}>
            <div className={styles.container}>

                {quizState.gameStage === "Start" && <Start />}
                {quizState.gameStage === "Playing" && <Questions />}
                {quizState.gameStage === "GameOver" && <GameOver />}
                {quizState.gameStage === "GameWin" && <GameWin />}



            </div>
        </div>
    )
}

export default IndexQuizz