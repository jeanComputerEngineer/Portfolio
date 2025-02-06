import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './TelaInicialDivisor.module.css';
import Divisor from '../../repositorioImagens/Divisor.png';


import { useTheme } from '../../ThemeContext';




function TelaicialDevWeb() {

    const { isDarkMode } = useTheme();
    const theme = isDarkMode ? styles.dark : styles.light;

    const [searchTerm] = useState('');

    const filteredTopics = [
        { image: Divisor, category: 'Software Picotador de Imagens', title: 'Software Desktop Feito em Python para Divisão de Imagens em Tamanhos Menores para Treinamento de IA', author: 'Jean Henrique - Acadêmico em Engenharia de Computação - UEPG', path: 'https://github.com/jeanComputerEngineer/Apenas-Codigos-Dos-Projetos/tree/main/Picotador%20De%20Imagens' },
        { image: Divisor, category: 'Software com Área de Corte', title: 'Software Desktop Feito em Python que Corta a Imagem na Área de Corte Definida pelo Usuário, sem Deformar a Imagem', author: 'Jean Henrique - Acadêmico em Engenharia de Computação - UEPG', path: 'https://github.com/jeanComputerEngineer/Apenas-Codigos-Dos-Projetos/tree/main/Cortador%20Com%20Origem' },


    ].filter(topic => topic.title.toLowerCase().includes(searchTerm.toLowerCase()));


    return (

        <div className={theme}>


            <div className={styles.container}>
                <header className={styles.header}>
                    <h1>Softwares Desktop em Python</h1>
                    <p>Interface contendo os dois trabalhos realizados para a Iniciação Científica da UEPG</p>



                </header>

                <ul className={styles.topicsList}>
                    {/* Mapeamento dos tópicos filtrados */}
                    {filteredTopics.map(topic => (
                        <li key={topic.title}>
                            <Link to={topic.path}>
                                <img src={topic.image} alt={`Imagem de ${topic.title}`} className={styles.imagem} />
                                <h2>{topic.category}</h2>
                                <h1>{topic.title}</h1>
                                <h3>{topic.author}</h3>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default TelaicialDevWeb;
