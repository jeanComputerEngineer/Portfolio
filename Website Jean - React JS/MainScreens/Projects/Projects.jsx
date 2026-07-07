import React, { useState } from 'react';
import styles from './Projects.module.css';
import LazyLoad from 'react-lazyload';
import { useTheme } from '../../Utils/ThemeContext';

import SiteReview from '../../Images/Projects/RateSiteProject/EvaluationForm.png';
import AlgorithmsImg from '../../Images/Projects/Algorithms/Algorithms.png';
import ToDoListLight from '../../Images/Projects/ToDoList/ToDoListLight.png';
import ToDoListDark from '../../Images/Projects/ToDoList/ToDoListDark.png';
import AnimalAgeSimulatorLight from '../../Images/Projects/AnimalAgeSimulator/AnimalAgeSimulatorLight.png';
import AnimalAgeSimulatorDark from '../../Images/Projects/AnimalAgeSimulator/AnimalAgeSimulatorDark.png';
import CountdownLight from '../../Images/Projects/Countdown/CountdownLight.png';
import CountdownDark from '../../Images/Projects/Countdown/CountdownDark.png';
import QuizDark from '../../Images/Projects/Quiz/QuizDark.png';
import QuizLight from '../../Images/Projects/Quiz/QuizLight.png';
import WebDev from '../../Images/Projects/WebDev/CompleteApp.png';
import LawFirmDark from '../../Images/Projects/LawFirmWebsite/LawFirmWebsiteDark.png';
import LawFirmLight from '../../Images/Projects/LawFirmWebsite/LawFirmWebsiteLight.png';
import PhpWebsiteDark from '../../Images/Projects/PhpWebsite/PhpWebsiteDark.png';
import ImageSlicer from '../../Images/Projects/ImageSlicer/ImageSlicer.png';
import chatbot from '../../Images/Projects/ChatBot/ChatBot.png';
import householdExpenses from '../../Images/Projects/HouseholdExpenses/HouseholdExpenses.png';
import schoolSchedule from '../../Images/Projects/SchoolSchedule/SchoolSchedule.png';
import lawOffice from '../../Images/Projects/LawOfficeManager/LawOffice.png';
import musicDownloader from '../../Images/Projects/MusicDownloader/MusicDownloader.png';
import EmployeeManagerImg from '../../Images/Projects/EmployeeManager/EmployeeManager.png';

const getImage = (isDarkMode, light, dark) => (isDarkMode ? dark : light);

function ProjectsPage() {
  const { isDarkMode } = useTheme();
  const themeClass = isDarkMode ? styles.dark : styles.light;

  const ToDoList = getImage(isDarkMode, ToDoListLight, ToDoListDark);
  const AnimalAgeSimulator = getImage(isDarkMode, AnimalAgeSimulatorLight, AnimalAgeSimulatorDark);
  const Countdown = getImage(isDarkMode, CountdownLight, CountdownDark);
  const Quiz = getImage(isDarkMode, QuizLight, QuizDark);
  const LawFirm = getImage(isDarkMode, LawFirmLight, LawFirmDark);

  const [searchTerm, setSearchTerm] = useState('');

  const projects = [
    {
      title: 'Law Office Manager',
      category: 'React JS, Node JS, MySQL, Electron JS, Ubuntu Server, Nginx, PM2',
      image: lawOffice,
      link: '/Projects/DesktopSoftware',
      description:
        'Desktop application for law firms with CRUD, automatic document generation, and financial management.',
      author: 'Made by: Jean Henrique - Computer Engineering Student - UEPG',
    },
    {
      title: 'Law Firm Website',
      category: 'React JS, Node JS, MySQL, Ubuntu Server, Nginx, PM2',
      image: LawFirm,
      link: 'https://henriqueadvogado.com.br/',
      description: 'Web application for client scheduling and legal consultations.',
      author: 'Made by: Jean Henrique - Computer Engineering Student - UEPG',
    },
    {
      title: 'ChatBot DeepSeek',
      category:
        'TypeScript, Next, Node JS, Docker, MongoDB, OAuth2, 2FA, Ubuntu Server, Nginx, PM2, Elasticsearch, RabbitMQ, Redis, Cypress, Microservices, AI, Lottie',
      image: chatbot,
      link: 'https://chatbot.jeanhenrique.site',
      description: 'Interactive AI chatbot',
      author: 'Made by: Jean Henrique - Computer Engineering Student - UEPG',
    },
    {
      title: 'Class Schedule Manager',
      category: 'Angular JS, Nest, MySQL, Ubuntu Server, Nginx, PM2',
      image: schoolSchedule,
      link: 'https://github.com/jeanComputerEngineer/Portfolio',
      description: 'System to organize and manage class schedules.',
      author: 'Made by: Jean Henrique - Computer Engineering Student - UEPG',
    },
    {
      title: 'My Main Site',
      category: 'React JS, Node JS, MySQL, Ubuntu Server, Nginx, PM2',
      image: WebDev,
      link: '/Resume',
      description:
        'Website with comprehensive information about my services, resume, blog, and portfolio.',
      author: 'Made by: Jean Henrique - Computer Engineering Student - UEPG',
    },
    {
      title: 'Employee Manager',
      category: 'Java, POO, MySQL',
      image: EmployeeManagerImg,
      link: 'https://github.com/jeanComputerEngineer/Portfolio',
      description: 'Application for managing employees with create, edit, and delete features.',
      author: 'Made by: Jean Henrique - Computer Engineering Student - UEPG',
    },
    {
      title: 'Audio Converter and Downloader',
      category: 'Python, APIs',
      image: musicDownloader,
      link: 'https://github.com/jeanComputerEngineer/Portfolio',
      description: 'Tool to convert and download audio.',
      author: 'Made by: Jean Henrique - Computer Engineering Student - UEPG',
    },
    {
      title: 'Household Expense Control',
      category: 'React JS, MySQL',
      image: householdExpenses,
      link: 'https://github.com/jeanComputerEngineer/Portfolio',
      description: 'System to control and monitor household expenses.',
      author: 'Made by: Jean Henrique - Computer Engineering Student - UEPG',
    },
    {
      title: 'Image Slicer',
      category: 'Python, OpenCV',
      image: ImageSlicer,
      link: 'https://github.com/jeanComputerEngineer/Portfolio',
      description: 'Tool to slice images and assist AI training.',
      author: 'Made by: Jean Henrique - Computer Engineering Student - UEPG',
    },
    {
      title: 'To Do List',
      category: 'React JS',
      image: ToDoList,
      link: '/Projects/To-Do-List',
      description: 'To-do list with add, complete, and priority features.',
      author: 'Made by: Jean Henrique - Computer Engineering Student - UEPG',
    },
    {
      title: 'Animal Age Simulator',
      category: 'React JS',
      image: AnimalAgeSimulator,
      link: '/Projects/AnimalAgeSimulator',
      description: 'Simulator that converts animal age to the human equivalent.',
      author: 'Made by: Jean Henrique - Computer Engineering Student - UEPG',
    },
    {
      title: 'Countdown',
      category: 'React JS',
      image: Countdown,
      link: '/Projects/Countdown',
      description: 'Application that displays countdowns for important dates.',
      author: 'Made by: Jean Henrique - Computer Engineering Student - UEPG',
    },
    {
      title: 'PHP Website',
      category: 'PHP',
      image: PhpWebsiteDark,
      link: 'https://github.com/jeanComputerEngineer/Portfolio',
      description: 'First website made with pure PHP; the code is available on GitHub.',
      author: 'Made by: Jean Henrique - Computer Engineering Student - UEPG',
    },
    {
      title: 'Algorithm Exercises',
      category: 'Python, Java',
      image: AlgorithmsImg,
      link: 'https://github.com/jeanComputerEngineer/Portfolio',
      description: 'Repository with algorithm exercises done during college.',
      author: 'Made by: Jean Henrique - Computer Engineering Student - UEPG',
    },
    {
      title: 'DevWeb UEPG',
      category: 'React JS, Java Spring Boot, MySQL, Ubuntu Server',
      image: WebDev,
      link: '/Projects/WebDev',
      description: 'Project developed for the DevWeb course in partnership with colleagues.',
      author:
        'Made by: Jean Henrique, Joao Jardel, Gustavo Agner - Computer Engineering Students - UEPG',
    },
    {
      title: 'Quiz',
      category: 'React JS',
      image: Quiz,
      link: '/Projects/Quiz',
      description: 'Quiz with add, complete, and priority features.',
      author: 'Made by: Jean Henrique - Computer Engineering Student - UEPG',
    },
    {
      title: 'Evaluation',
      category: 'React JS, Node JS, MySQL, Ubuntu Server, Nginx, PM2',
      image: SiteReview,
      link: '/Projects/Evaluation',
      description: 'Rate my site',
      author: 'Made by: Jean Henrique - Computer Engineering Student - UEPG',
    },
  ];

  const filteredProjects = projects.filter((project) =>
    project.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className={themeClass}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h1>Projects Area</h1>
          <p>Here you can find all my work in the computing field. Enjoy!</p>
          <div className={styles.searchBar}>
            <input
              type="text"
              placeholder="Search by title..."
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />
          </div>
        </header>
        <ul className={styles.topicsList}>
          {filteredProjects.map((project) => (
            <li key={project.title}>
              <a
                href={project.link}
                target={project.link.startsWith('http') ? '_blank' : '_self'}
                rel="noopener noreferrer"
              >
                <LazyLoad height={200} offset={100}>
                  <img src={project.image} alt={project.title} className={styles.image} />
                </LazyLoad>
                <h4>{project.category}</h4>
                <h1>{project.title}</h1>
                <p>{project.description}</p>
                {project.author && <h3>{project.author}</h3>}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ProjectsPage;
