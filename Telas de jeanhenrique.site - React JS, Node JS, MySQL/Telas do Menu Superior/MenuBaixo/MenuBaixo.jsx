import styles from './MenuBaixo.module.css';

import { useTheme } from '../../ThemeContext';


function MenuBaixo() {

    const { isDarkMode } = useTheme();
    const theme = isDarkMode ? styles.dark : styles.light;

    return (
        <div className={theme}>
            <div className={styles.container}>
                Criador: Jean Samuel Candido Henrique
                <br></br>
                Acadêmico de Engenharia de Computação - UEPG
            </div>
        </div>
    );
}

export default MenuBaixo