import React from 'react';
import { useTheme } from '../../ThemeContext';
import Pessoas from './components/Pessoas/Pessoass';
import Transacoes from './components/Transacoes/Transacoes';
import ConsultaTotais from './components/ConsultaTotais/ConsultaTotais';
import { DataProvider } from './DataContext';
import styles from './GastosResidenciais.module.css';

function GastosResidenciais() {
    const { isDarkMode } = useTheme();
    const theme = isDarkMode ? styles.dark : styles.light;

    return (
        <DataProvider>
            <div className={theme}>
                <div className={styles.GastosResidenciais}>
                    <h1>Controle de Gastos Residenciais</h1>
                    <section>
                        <Pessoas />
                    </section>
                    <section>
                        <Transacoes />
                    </section>
                    <section>
                        <ConsultaTotais />
                    </section>
                </div>
            </div>
        </DataProvider>
    );
}

export default GastosResidenciais;
