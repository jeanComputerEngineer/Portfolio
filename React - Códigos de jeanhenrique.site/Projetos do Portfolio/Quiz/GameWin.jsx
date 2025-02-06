import styles from './Quiz.module.css'


function GameWin() {
    return (

        <div className={styles.containerWin}>

            <h1>Parabéns, você cumpriu todos os requisitos da vida!</h1>
            <h2>Agora que chegou no final da vida, só restou o último passo... A Morte</h2>
            <h3>Perante a morte, perante a insignificância da vida humana, tudo isso teve algum significado?</h3>
            <p>Obrigado por jogar até o fim! Fique à vontade para aproveitar os outros projetos.</p>
        </div>
    )

}

export default GameWin;
