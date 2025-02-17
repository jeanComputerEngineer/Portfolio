/* 
- Componente principal, utilizado para criar as rotas e carregar outros componentes como pessoas, transações e consulta de totais 
- importações, useTheme é um contexto já utilizado do meu site
-Pessoas, Transacoes e ConsultaTotais são os componentes para renderizar as sessões 
- DataContext é um contexto criado para armazenar os dados das pessoas, transações e totais, tudo no localStorage 
- Styles é o module.css para estilizar o componente index.jsx, assim como será também para os outros componentes com outros module.css 
*/


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
