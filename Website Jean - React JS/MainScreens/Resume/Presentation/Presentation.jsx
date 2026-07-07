import React from 'react';
import styles from './Presentation.module.css';

function Presentation() {
  return (
    <div className={styles.presentationContainer}>
      <h2>Presentation</h2>
      <p>
        Welcome to my site. I am Jean, a final-year Computer Engineering student at UEPG. I am a
        full-stack developer with general IT knowledge. On this page you will see my skills,
        projects, and certificates. Explore the other pages in the top menu tabs, such as my
        portfolio and service showcase.
      </p>
    </div>
  );
}

export default Presentation;
