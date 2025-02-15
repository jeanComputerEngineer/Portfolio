import React, { useState } from 'react';
import styles from './Projetos.module.css'; // Importe seu arquivo CSS para estilos específicos do Blog
import FormularioAvaliacao from '../../repositorioImagens/FormularioAvaliacao.png';
import LazyLoad from 'react-lazyload';


import Startup from '../../repositorioImagens/Startup1.png';
import Algoritmos from '../../repositorioImagens/Algoritmos.png';
import ProjetoSoftware from '../../repositorioImagens/ProjetoSoftware.png';
import ToDoListLight from '../../repositorioImagens/ToDoList.png';
import ToDoListDark from '../../repositorioImagens/ToDoListDark.png';
import SimuladorIdadeAnimalLight from '../../repositorioImagens/SimuladorIdadeAnimalLight.png';
import SimuladorIdadeAnimalDark from '../../repositorioImagens/SimuladorIdadeAnimalDark.png';
import ContagemRegressivaLight from '../../repositorioImagens/ContagemRegressivaLight.png';
import ContagemRegressivaDark from '../../repositorioImagens/ContagemRegressiva.png';
import QuizDark from '../../repositorioImagens/QuizDark.png';
import QuizLight from '../../repositorioImagens/QuizLight.png';
import WebDev from '../../repositorioImagens/webdev.png';
import SiteEscuro from '../../repositorioImagens/SiteEscuro.png';
import SiteClaro from '../../repositorioImagens/SiteClaro.png';
import SitePhpEscuro from '../../repositorioImagens/SitePhpEscuro.png';
import Divisor from '../../repositorioImagens/Divisor.png';
import devWeb from '../../repositorioImagens/DevWeb.png';


import { useTheme } from '../../ThemeContext';





function Projetos() {

    const { isDarkMode } = useTheme();
    const theme = isDarkMode ? styles.dark : styles.light;

    const ToDoList = isDarkMode ? ToDoListDark : ToDoListLight;
    const ContagemRegressiva = isDarkMode ? ContagemRegressivaDark : ContagemRegressivaLight;
    const SimuladorIdadeAnimal = isDarkMode ? SimuladorIdadeAnimalDark : SimuladorIdadeAnimalLight;
    const Quiz = isDarkMode ? QuizDark : QuizLight;
    const Site = isDarkMode ? SiteEscuro : SiteClaro;

    // Estado para armazenar o valor da pesquisa
    const [searchTerm, setSearchTerm] = useState('');

    // Array de projetos
    const projects = [
        {
            title: "Software Desktop Gerenciador para Advocacias",
            category: "React JS, Node JS, MySQL, Electron JS, Ubuntu Server",
            image: devWeb,
            link: "/Projetos/SoftwareDesktop",
            description: "Aplicação Desktop Desenvolvida para uma Advocacia, com CRUD de Clientes, Processos, Documentos, Finanças, Tarefas e Autenticação de Usuários. Também inclui geração automática de documentos, gestão de finanças, notificação automatizada de vencimentos de prazos e organizador de horários de consultas",
            author: "Feito por: Jean Henrique - Acadêmico em Engenharia de Computação - UEPG"
        },
        {
            title: "Site com Sistema de Agendamentos",
            category: "React JS, Node JS, MySQL, Ubuntu Server",
            image: Site,
            link: "https://fuchshenrique.com.br/",
            description: "Aplicação web Desenvolvida para Agendamento de Clientes e Agenda Automática de Consultas Advocatícias",
            author: "Feito por: Jean Henrique - Acadêmico em Engenharia de Computação - UEPG"
        },
        {
            title: "To Do List",
            category: "React JS, Ubuntu Server",
            image: ToDoList,
            link: "/Projetos/To-Do-List",
            description: "Uma lista de afazeres criadas em React JS, nela você pode adicionar e concluir tarefas, além de conseguir definir suas respectivas datas de término e prioridade. Para utilizar a lista, remova os elementos inicias e não atualize ou feche a guia.",
            author: "Feito por: Jean Henrique - Acadêmico em Engenharia de Computação - UEPG"
        },
        {
            title: "Disciplina DevWeb UEPG",
            category: "React JS, Java Spring Boot, MySQL, Ubuntu Server",
            image: WebDev,
            link: "/Projetos/WebDev",
            description: "Projeto desenvolvido para a disciplina DevWeb da UEPG.",
            author: "Feito por: Jean Henrique, João Jardel, Gustavo Agner - Académicos de Engenharia de Computação - UEPG"
        },
        {
            title: "Algoritmos",
            category: "Python, Java",
            image: Algoritmos,
            link: "https://github.com/jeanComputerEngineer/Apenas-Codigos-Dos-Projetos/tree/main/Algoritmos",
            description: "Aqui estão todos os exercícios de Algoritmos que realizei durante a faculdade. Clique para ir até o repositório.",
            author: "Feito por: Jean Henrique - Acadêmico em Engenharia de Computação - UEPG"
        },
        {
            title: "Softwares Desktop para Imagens",
            category: "Python, PyQt5",
            image: Divisor,
            link: "/Projetos/SoftwareDivisor",
            description: "Softwares desktop feitos em python para picotar imagens para treinamentos de IA, e também para cortar imagens para retirar o ruído das bordas",
        },
        {
            title: "Quiz",
            category: "React JS, Ubuntu Server",
            image: Quiz,
            link: "/Projetos/Quiz",
            description: "Um jogo interativo no qual possui algumas questões objetivas com apenas uma resposta. É basicamente um jogo da vida resumido, sendo a mensagem uma crítica social do autor para com a atual sociedade.",
            author: "Feito por: Jean Henrique - Acadêmico em Engenharia de Computação - UEPG"
        },
        {
            title: "Simulador de Idade Animal",
            category: "React JS, Ubuntu Server",
            image: SimuladorIdadeAnimal,
            link: "/Projetos/SimuladorIdadeAnimal",
            description: "Um simulador de idade animal equivalente com as dos humanos, com várias espécies de animais de estimação. Basicamente, os calculos são baseados em fontes de estudos sobre a idade máxima dos animais. Este site é fruto de uma curiosidade da minha infância. A finalidade do projeto é apenas entretenimento, não leve ao pé da letra.",
            author: "Feito por: Jean Henrique - Acadêmico em Engenharia de Computação - UEPG"
        },
        {
            title: "Avaliação",
            category: "React JS, Ubuntu Server",
            image: FormularioAvaliacao,
            link: "/Projetos/Avaliação",
            description: "Formulário de Avaliação do meu Trabalho.",
            author: "Feito por: Jean Henrique - Acadêmico em Engenharia de Computação - UEPG"
        },

        {
            title: "Contagem Regressiva",
            category: "React JS, Ubuntu Server",
            image: ContagemRegressiva,
            link: "/Projetos/ContagemRegressiva",
            description: "Algumas contagens regressivas para datas importantes minhas que inseri na página com a lógica que desenvolvi.",
            author: "Feito por: Jean Henrique - Acadêmico em Engenharia de Computação - UEPG"
        },
        {
            title: "Site Inicial",
            category: "PHP",
            image: SitePhpEscuro,
            link: "https://github.com/jeanComputerEngineer/Apenas-Codigos-Dos-Projetos/tree/main/Primeiro%20Site",
            description: "Este foi o meu primeiro site feito com php puro. Não está no ar, mas os códigos estão disponíveis no meu github, clique nesta seção para acessa-los.",
            author: "Feito por: Jean Henrique - Acadêmico em Engenharia de Computação - UEPG"
        },
        {
            title: "Meu Site Principal",
            category: "React JS, Node JS, MySQL",
            image: Site,
            link: "/Curriculo",
            description: "Neste site você terá acesso a tudo relacionado a mim, como meus serviços, redes sociais, currículo, blog e portfolio. Foi a minha segunda maior obra",
            author: "Feito por: Jean Henrique - Acadêmico em Engenharia de Computação - UEPG"
        },
        {
            title: "Trabalho de Inteligência Computacional",
            category: "Algorítmos em Python",
            image: ProjetoSoftware,
            link: "/Projetos/IC",
            description: "Trabalho de Inteligência Computacional referente aos temas abordados nos requisitos do trabalho",
        },
        {
            title: "Startup1",
            category: "React JS, React Native, Node JS, MySQL",
            image: Startup,
            link: "/Startup1",
            description: "Este é um projeto em andamento de uma idéia que tive no começo de 2023. As informações que posso fornecer é que terá uma aplicação web e outra em app mobile. A previsão de término é final de 2024.",
            author: "Feito por: Jean Henrique - Acadêmico em Engenharia de Computação - UEPG"
        }
    ];


    // Função para filtrar projetos com base no termo de pesquisa
    const filteredProjects = projects.filter(project =>
        project.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className={theme}>
            <div className={styles.container}>
                <header className={styles.header}>
                    <h1>Área dos Projetos</h1>
                    <p>Aqui se encontra toda minha produção na área da computação, aproveite!</p>
                    <div className={styles.searchBar}>
                        <input
                            type="text"
                            placeholder="Pesquisar por título..."
                            value={searchTerm}
                            onChange={(event) => setSearchTerm(event.target.value)}
                        />
                    </div>
                </header>

                <ul className={styles.topicsList}>
                    {filteredProjects.map(project => (
                        <li key={project.title}>
                            <a href={project.link} target={project.link.startsWith('http') ? '_blank' : '_self'} rel="noopener noreferrer">
                                <LazyLoad height={200} offset={100}>
                                    <img src={project.image} alt={project.title} className={styles.imagem} />
                                </LazyLoad>
                                <h4>{project.category}</h4>
                                <h1>{project.title}</h1>
                                <p>{project.description}</p>
                                <h3>{project.author}</h3>
                            </a>
                        </li>

                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Projetos;