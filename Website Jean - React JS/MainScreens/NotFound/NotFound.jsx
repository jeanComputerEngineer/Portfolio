import React from 'react';
import { Link } from 'react-router-dom';
import styles from './NotFound.module.css';

import { useTheme } from '../../Utils/ThemeContext';

function NotFound() {
  const { isDarkMode } = useTheme();
  const theme = isDarkMode ? styles.dark : styles.light;
  return (
    <div className={theme}>
      <div className={styles.container}>
        <h1>It looks like the page doesn't exist :/</h1>
        <h2>
          Click <Link to="/">here</Link> to go back and everything will be fine
        </h2>
      </div>
    </div>
  );
}

export default NotFound;
