import React, { Suspense } from 'react';
import styles from './TelaInicial.module.css';
import { useTheme } from '../../ThemeContext';

// Importar os componentes de forma assíncrona
const LazyHeader = React.lazy(() => import('./Header.jsx'));
const LazyPresentation = React.lazy(() => import('./Presentation.jsx'));
const LazySkills = React.lazy(() => import('./Skills.jsx'));
const LazyProjects = React.lazy(() => import('./Projects.jsx'));
const LazyCertificates = React.lazy(() => import('./Certificates.jsx'));

function TelaInicial() {
    const { isDarkMode } = useTheme();
    const theme = isDarkMode ? styles.dark : styles.light;

    return (
        <div className={theme}>
            <div className={styles.container}>
                {/* Usar Suspense para envolver os componentes carregados de forma assíncrona */}
                <Suspense fallback={<div>Carregando...</div>}>
                    {/* Renderizar os componentes carregados de forma assíncrona */}
                    <LazyHeader />
                    <LazyPresentation />
                    <LazySkills />
                    <LazyProjects />
                    <LazyCertificates />
                </Suspense>
            </div>
        </div>
    );
}

export default TelaInicial;
