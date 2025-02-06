import styles from './ContagemRegressiva.module.css';
import Count from './Count';
import Namoro from "../../repositorioImagens/Namoro.png";
import Casamento from "../../repositorioImagens/Casamento.png";
import Aulas from "../../repositorioImagens/Aulas.png";
import Aniversario from "../../repositorioImagens/Aniversario.png";
import { useTheme } from '../../ThemeContext';

function IndexContagemRegressiva() {

    const [segundos, minutos, horas, dias] = Count("Jan 1, 2025 00:00:00");
    const [segundos2, minutos2, horas2, dias2] = Count("Jun 24, 2024 00:00:00");
    const [segundos3, minutos3, horas3, dias3] = Count("Feb 19, 2025 00:00:00");
    const [segundos4, minutos4, horas4, dias4] = Count("Mar 28, 2025 00:00:00");
    const [segundos5, minutos5, horas5, dias5] = Count("Feb 17, 2025 00:00:00");


    const { isDarkMode } = useTheme();

    const theme = isDarkMode ? styles.dark : styles.light;



    return (
        <div className={theme}>
            <div className={styles.container}>
                <h1>Contagem Regressiva</h1>





                {/* Ano Novo */}
                <h2>Ano Novo</h2>
                <ul className={`${styles.relogio} ${styles.relogio}`}>
                    <li>{dias} </li>
                    <li>{horas} </li>
                    <li>{minutos} </li>
                    <li>{segundos} </li>
                </ul>
                <ul className={styles.legenda}>
                    <li>dias</li>
                    <li>horas</li>
                    <li>minutos</li>
                    <li>segundos</li>
                </ul>
                <img
                    src="https://images.pexels.com/photos/2526105/pexels-photo-2526105.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                    alt="Ano novo"
                    className={styles.imagem}
                />

                {/* Aniversário de Namoro */}
                <h2>Meu Aniversário de Namoro</h2>
                <ul className={`${styles.relogio} ${styles.relogio}`}>
                    <li>{dias2} </li>
                    <li>{horas2} </li>
                    <li>{minutos2} </li>
                    <li>{segundos2} </li>
                </ul>
                <ul className={styles.legenda}>
                    <li>dias</li>
                    <li>horas</li>
                    <li>minutos</li>
                    <li>segundos</li>
                </ul>

                <img
                    src={Namoro}
                    alt="Namoro"
                    className={styles.imagem}
                />

                {/* Volta às Aulas */}
                <h2>Até o dia 19.fev 2025</h2>
                <ul className={`${styles.relogio} ${styles.relogio}`}>
                    <li>{dias3} </li>
                    <li>{horas3} </li>
                    <li>{minutos3} </li>
                    <li>{segundos3} </li>
                </ul>
                <ul className={styles.legenda}>
                    <li>dias</li>
                    <li>horas</li>
                    <li>minutos</li>
                    <li>segundos</li>
                </ul>
                <img
                    src={Aulas}
                    alt="aulas"
                    className={styles.imagem}
                />

                {/* Aniversário */}
                <h2>Meu Aniversário</h2>
                <ul className={`${styles.relogio} ${styles.relogio}`}>
                    <li>{dias4} </li>
                    <li>{horas4} </li>
                    <li>{minutos4} </li>
                    <li>{segundos4} </li>
                </ul>
                <ul className={styles.legenda}>
                    <li>dias</li>
                    <li>horas</li>
                    <li>minutos</li>
                    <li>segundos</li>
                </ul>
                <img
                    src={Aniversario}
                    alt="aniversario"
                    className={styles.imagem}
                />

                {/* Casamento */}
                <h2>Aniversário de Casamento</h2>
                <ul className={`${styles.relogio} ${styles.relogio}`}>
                    <li>{dias5} </li>
                    <li>{horas5} </li>
                    <li>{minutos5} </li>
                    <li>{segundos5} </li>
                </ul>
                <ul className={styles.legenda}>
                    <li>dias</li>
                    <li>horas</li>
                    <li>minutos</li>
                    <li>segundos</li>
                </ul>
                <img
                    src={Casamento}
                    alt="Ano novo"
                    className={styles.imagem}
                />
            </div>
        </div>
    );
}

export default IndexContagemRegressiva;