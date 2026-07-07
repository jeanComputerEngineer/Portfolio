import React, { Suspense } from 'react';
import styles from './Resume.module.css';
import { useTheme } from '../../Utils/ThemeContext';

const Header = React.lazy(() => import('./Header/Header'));
const Presentation = React.lazy(() => import('./Presentation/Presentation'));
const Skills = React.lazy(() => import('./Skills/Skills'));
const Experience = React.lazy(() => import('./Experience/Experience'));
const Projects = React.lazy(() => import('./Projects/Projects'));
const Certificates = React.lazy(() => import('./Certificates/Certificates'));

function Resume() {
  const { isDarkMode } = useTheme();

  return (
    <div className={isDarkMode ? 'dark' : 'light'}>
      <div className={styles.container}>
        <Suspense fallback={<div>Loading...</div>}>
          <Header />
          <Presentation />
          <Skills />
          <Experience />
          <Projects />
          <Certificates />
        </Suspense>
      </div>
    </div>
  );
}

export default Resume;
