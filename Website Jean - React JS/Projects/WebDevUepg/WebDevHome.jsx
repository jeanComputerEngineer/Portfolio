import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './WebDevHome.module.css';
import Project1 from '../../Images/Projects/WebDev/Sales.png';
import Project2 from '../../Images/Projects/WebDev/Security.png';
import Project3 from '../../Images/Projects/WebDev/CompleteApp.png';
import { useTheme } from '../../Utils/ThemeContext';

function WebDevHome() {
  const { isDarkMode } = useTheme();
  const theme = isDarkMode ? styles.dark : styles.light;

  const [searchTerm] = useState('');

  const filteredProjects = [
    {
      image: Project1,
      category: 'PROJECT 1',
      title: 'Simple Sales System with Java Spring',
      author: 'Jean Henrique, João Jardel, Gustavo Agner - Computer Engineering Students - UEPG',
      path: '/Projects/WebDev/Project1',
    },
    {
      image: Project2,
      category: 'PROJECT 2',
      title: 'Security, CSRF, OAuth2, OpenID, Java Web Token, Amazon Cognito',
      author: 'Jean Henrique, João Jardel, Gustavo Agner - Computer Engineering Students - UEPG',
      path: '/Projects/WebDev/Project3',
    },
    {
      image: Project3,
      category: 'PROJECT 3',
      title: 'Complete Application',
      author: 'Jean Henrique, João Jardel, Gustavo Agner - Computer Engineering Students - UEPG',
      path: '/Projects/To-Do-List',
    },
  ].filter((project) => project.title.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className={theme}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h1>UEPG Web Development</h1>
          <p>Interface containing the three projects developed in the course.</p>
        </header>

        <ul className={styles.projectList}>
          {filteredProjects.map((project) => (
            <li key={project.title}>
              <Link to={project.path}>
                <img src={project.image} alt={`${project.title} `} className={styles.image} />
                <h2>{project.category}</h2>
                <h1>{project.title}</h1>
                <h3>{project.author}</h3>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default WebDevHome;
