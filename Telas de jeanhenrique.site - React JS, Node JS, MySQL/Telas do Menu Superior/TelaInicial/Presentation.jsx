// Presentation.js
import React from 'react';
import styles from './TelaInicial.module.css';

function Presentation() {
    return (
        <div className={styles.containerApresentacao}>
            <h2>Apresentação</h2>
            <p>
                Bem-vindo ao meu site! Sou Jean, estudante do último ano de Engenharia de Computação na UEPG.
                Sou desenvolvedor full stack, possuo conhecimentos gerais na área de TI e, nesta página, você verá minhas habilidades, projetos e certificados.
                Sinta-se à vontade para explorar as outras páginas nas abas do menu superior, como meu portfólio e vitrine de serviços.
            </p>
        </div>

    );
}

export default Presentation;
