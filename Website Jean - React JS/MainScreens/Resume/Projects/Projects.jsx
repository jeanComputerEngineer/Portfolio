import React from 'react';
import styles from './Projects.module.css';
import { Link } from 'react-router-dom';
import { SiPhp } from 'react-icons/si';
import {
  FaGavel,
  FaBalanceScale,
  FaHome,
  FaListUl,
  FaRobot,
  FaPaw,
  FaClock,
  FaLaptop,
  FaUsers,
  FaMusic,
  FaMoneyBillWave,
  FaImage,
  FaCalendarAlt,
} from 'react-icons/fa';

const projects = [
  { name: 'Law Office Manager', link: '/Projects/DesktopSoftware', icon: <FaGavel size={70} /> },
  {
    name: 'Law Firm Website',
    link: 'https://fuchshenrique.com.br',
    icon: <FaBalanceScale size={70} />,
  },
  {
    name: 'ChatBot DeepSeek',
    link: 'https://chatbot.jeanhenrique.site',
    icon: <FaRobot size={70} />,
  },
  {
    name: 'Class Schedule Manager',
    link: 'https://github.com/jeanComputerEngineer/Portfolio',
    icon: <FaCalendarAlt size={70} />,
  },
  { name: 'My Website', link: '/Resume', icon: <FaHome size={70} /> },
  {
    name: 'Employee Manager',
    link: 'https://github.com/jeanComputerEngineer/Portfolio',
    icon: <FaUsers size={70} />,
  },
  {
    name: 'Audio Converter and Downloader',
    link: 'https://github.com/jeanComputerEngineer/Portfolio',
    icon: <FaMusic size={70} />,
  },
  {
    name: 'Household Expense Control',
    link: 'https://github.com/jeanComputerEngineer/Portfolio',
    icon: <FaMoneyBillWave size={70} />,
  },
  {
    name: 'Image Slicer',
    link: 'https://github.com/jeanComputerEngineer/Portfolio',
    icon: <FaImage size={70} />,
  },
  { name: 'To Do List', link: '/Projects/To-Do-List', icon: <FaListUl size={70} /> },
  {
    name: 'Animal Age Simulator',
    link: '/Projects/SimuladorIdadeAnimal',
    icon: <FaPaw size={70} />,
  },
  { name: 'Countdown', link: '/Projects/Countdown', icon: <FaClock size={70} /> },
  {
    name: 'PHP Website',
    link: 'hhttps://github.com/jeanComputerEngineer/Portfolio',
    icon: <SiPhp size={70} />,
  },
  {
    name: 'Algorithm Exercises',
    link: 'https://github.com/jeanComputerEngineer/Portfolio',
    icon: <FaGavel size={70} />,
  },
  { name: 'DevWeb UEPG', link: '/Projects/WebDev', icon: <FaLaptop size={70} /> },
];

function Projects() {
  return (
    <div className={styles.projectsContainer}>
      <h2>My Projects</h2>
      <ul className={styles.gridList}>
        {projects.map((proj, index) => {
          const content = (
            <>
              {proj.icon}
              <p>{proj.name}</p>
            </>
          );
          return proj.link.startsWith('http') ? (
            <a
              key={index}
              href={proj.link}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.projectItem}
            >
              {content}
            </a>
          ) : (
            <Link key={index} to={proj.link} className={styles.projectItem}>
              {content}
            </Link>
          );
        })}
      </ul>
      <h3>
        Visit the{' '}
        <Link to="/Projects" className={styles.link}>
          <span className={styles.hoverEffect}>Portfolio</span>
        </Link>{' '}
        for more details
      </h3>
    </div>
  );
}

export default Projects;
