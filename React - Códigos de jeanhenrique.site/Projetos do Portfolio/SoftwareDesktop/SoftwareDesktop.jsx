import React, { useState } from 'react';
import styles from './SoftwareDesktop.module.css';
import { useTheme } from '../../ThemeContext';

// Importe suas imagens (verifique o caminho e nome dos arquivos)
import Clientes from '../../repositorioImagens/Lawyerup/Clientes.png';
import Processos from '../../repositorioImagens/Lawyerup/Processos.png';
import Documentos from '../../repositorioImagens/Lawyerup/Documentos.png';
import Consultas from '../../repositorioImagens/Lawyerup/Consultas.png';
import Agenda from '../../repositorioImagens/Lawyerup/Agenda.png';
import Financeiro from '../../repositorioImagens/Lawyerup/Financeiro.png';
import Autenticacao from '../../repositorioImagens/Lawyerup/Autenticacao.png';

function SoftwareDesktop() {
    // Obtém o estado do tema (claro/escuro) do contexto
    const { isDarkMode } = useTheme();
    const themeClass = isDarkMode ? styles.dark : styles.light;

    // Array de softwares com título, descrição e imagem
    const softwares = [
        {
            title: "Clientes",
            description:
                "Lista de clientes, na qual o advogado pode realizar o cadastro, consulta, atualização e exclusão dos clientes, bem como acessar os respectivos documentos e processos relacionados.",
            image: Clientes,
        },
        {
            title: "Processos",
            description:
                "Lista de processos, permitindo que o advogado efetue o cadastro, consulta, atualização e exclusão dos processos, além de identificar os clientes associados a cada um.",
            image: Processos,
        },
        {
            title: "Documentos",
            description:
                "Área de documentos, onde o advogado pode gerenciar o cadastro, consulta, atualização e exclusão de documentos, gerar documentos automaticamente e importar arquivos locais.",
            image: Documentos,
        },
        {
            title: "Consultas",
            description:
                "Lista de consultas, possibilitando que o advogado realize o cadastro, consulta, atualização e exclusão de consultas, além de configurar horários indisponíveis e os períodos para o funcionamento da agenda automática.",
            image: Consultas,
        },
        {
            title: "Agenda",
            description:
                "Agenda de tarefas, que permite ao advogado gerenciar o cadastro, consulta, atualização e exclusão das tarefas, com notificações de vencimento de prazos enviadas ao e-mail cadastrado.",
            image: Agenda,
        },
        {
            title: "Financeiro",
            description:
                "Área financeira, onde o advogado pode gerenciar as finanças realizando o cadastro, consulta, atualização e exclusão de registros, emitir recibos, calcular entradas e saídas, estimar lucros e programar parcelas.",
            image: Financeiro,
        },
        {
            title: "Autenticação",
            description:
                "Área de autenticação, que possibilita ao advogado realizar o login, contatar o suporte em caso de problemas e definir a visibilidade dos seus clientes, registros financeiros e tarefas, podendo optar por exibir essas informações para toda a equipe ou apenas para o usuário autenticado.",
            image: Autenticacao,
        },
    ];

    // Estado para filtro de pesquisa (opcional)
    const [searchTerm, setSearchTerm] = useState('');

    const filteredSoftwares = softwares.filter(software =>
        software.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Função para abrir a imagem em nova guia
    const handleExpandImage = (software) => {
        window.open(software.image, '_blank');
    };

    return (
        <div className={`${styles.container} ${themeClass}`}>
            <header className={styles.header}>
                <h1>Software Desktop</h1>
                <p>Explore as imagens e funcionalidades do software.</p>
                <input
                    type="text"
                    placeholder="Pesquisar..."
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    className={styles.searchInput}
                />
            </header>

            <div className={styles.grid}>
                {filteredSoftwares.map(software => (
                    <div key={software.title} className={styles.card}>
                        <img
                            src={software.image}
                            alt={software.title}
                            className={styles.image}
                        />
                        <div className={styles.cardContent}>
                            <h2>{software.title}</h2>
                            <p>{software.description}</p>
                            <button
                                className={styles.expandButton}
                                onClick={() => handleExpandImage(software)}
                            >
                                Expandir
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default SoftwareDesktop;
