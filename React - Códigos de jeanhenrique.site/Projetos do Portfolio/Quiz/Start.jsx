import { QuizContext } from "./Quiz"
import { useContext } from "react"
import styles from "./Quiz.module.css";
import Quiz from "../../repositorioImagens/Quiz.png"

const Start = () => {
    const [quizState, dispatch] = useContext(QuizContext)
    console.log(quizState)

    return (

        <div className={styles.containerStart}>
            <h1>Bem-Vindo ao Quiz: Jogo da Vida!</h1>
            <h2>AVISO: Este quiz contém ironia, então tudo que estiver incluso é proposital
                para a realização da crítica e mensagem final do autor.</h2>
            <p>Não leve a sério nenhuma mensagem ou palavra após o clique do botão.</p>
            <p>Caso se sinta ofendido ou sensível, recomendo que não realize o mesmo!</p>
            <h2>E lembre-se, você é incrível!</h2>

            <button onClick={() => dispatch({ type: "CHANGE_STATE" })}>COMEÇAR QUIZ</button>
            <img src={Quiz} alt="Imagem do Quiz" className={styles.imagem} />
        </div>
    )

}

export default Start