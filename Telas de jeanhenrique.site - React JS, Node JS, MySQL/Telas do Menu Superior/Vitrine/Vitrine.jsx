import styles from './Vitrine.module.css'
import contrato from '../../repositorioImagens/Contrato.png'
import site from '../../repositorioImagens/Site.png'
import appdesktop from '../../repositorioImagens/AppDesktop.png'
import appDev from '../../repositorioImagens/AppDev.png'
import GameDev from '../../repositorioImagens/GameDev.png'
import Fotos from '../../repositorioImagens/Fotos.png'
import Videos from '../../repositorioImagens/Videos.png'
import Assistencia from '../../repositorioImagens/Assistencia.png'
import { useTheme } from '../../ThemeContext';


function Vitrine() {

    const { isDarkMode } = useTheme();
    const theme = isDarkMode ? styles.dark : styles.light;

    return (
        <div className={theme}>
            <div className={styles.containerVitrine}>
                <h1>Ofertas Disponíveis</h1>
                <ul className={styles.lista} >
                    <li><img src={contrato} alt="Contrato" className={styles.imagemLista1} /></li>
                    <li><img src={appDev} alt="AppDev" className={styles.imagemLista1} /></li>
                    <li><img src={appdesktop} alt="AppDesktop" className={styles.imagemLista1} /></li>
                    <li><img src={site} alt="Site" className={styles.imagemLista1} /></li>
                    <li><img src={GameDev} alt="GameDev" className={styles.imagemLista1} /></li>
                    <li><img src={Assistencia} alt="Assistencia" className={styles.imagemLista1} /></li>
                    <li><img src={Fotos} alt="Fotos" className={styles.imagemLista1} /></li>
                    <li><img src={Videos} alt="Videos" className={styles.imagemLista1} /></li>
                </ul>



            </div >
        </div>
    );
}
export default Vitrine