// Projects.js
import React from 'react';
import styles from './TelaInicial.module.css';
import { Link } from 'react-router-dom';


function Projects() {
    return (
        <div className={styles.containerProjetos}>
            <h2>Meus Projetos</h2>
            <ul className={styles.Projetos}>
                <li><Link to="/Projetos/SoftwareDesktop">Gerenciador Advocacia</Link></li>
                <li><a href="https://fuchshenrique.com.br">Site de Advocacia</a></li>
                <li><Link to="/Curriculo">Meu Site</Link></li>
                <li><Link to="/Projetos/To-Do-List">To Do List</Link></li>
                <li><Link to="/Projetos/Quiz">Quiz</Link></li>
                <li><Link to="/Projetos/SimuladorIdadeAnimal">Simulador de Idade Animal</Link></li>
                <li><Link to="/Projetos/ContagemRegressiva">Contagem Regressiva</Link></li>
                <li><a href="https://github.com/jeanComputerEngineer/Apenas-Codigos-Dos-Projetos/tree/main/Primeiro%20Site">Site em PHP</a></li>
                <li><a href="https://github.com/jeanComputerEngineer/Apenas-Codigos-Dos-Projetos/tree/main/Algoritmos">Exercícios de Algoritmos</a></li>
                <li><Link to="/Projetos/WebDev">DevWeb UEPG</Link></li>
            </ul>
            <h3>Acesse a página <Link to="/Projetos" className={styles.link}><span className={styles.hoverEffect}>Portfolio</span></Link> para mais detalhes</h3>
        </div>
    );
}

export default Projects;
