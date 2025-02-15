import React from 'react'
import { Link } from 'react-router-dom';
import styles from './NotFound.module.css';

import { useTheme } from '../../ThemeContext';

function NotFound() {
    const { isDarkMode } = useTheme();
    const theme = isDarkMode ? styles.dark : styles.light;
    return (
        <div className={theme}>
            <div className={styles.container}>
                <h1>Parece que a página não existe :/</h1>
                <h2>Clique <Link to="/">aqui</Link> para retornar e vai ficar tudo bem </h2>
            </div>
        </div>
    )
}

export default NotFound
