import React from 'react';
import styles from './CI.module.css';
import { useTheme } from '../../Utils/ThemeContext';

function CI() {
  const { isDarkMode } = useTheme();
  const theme = isDarkMode ? styles.dark : styles.light;

  return (
    <div className={theme}>
      <div className={styles.outerContainer}>
        <section className={styles.container}>
          <h1>Computational Intelligence Project</h1>
          <h2>Students</h2>
          <div className={styles.studentsContainer}>
            <div className={styles.students}>
              <div className={styles.student}>
                <img
                  src="https://randomuser.me/api/portraits/lego/1.jpg"
                  alt="Dyonatam Terluk"
                  className={styles.profileImage}
                />
                <p>Dyonatam Terluk</p>
              </div>
              <div className={styles.student}>
                <img
                  src="https://randomuser.me/api/portraits/lego/2.jpg"
                  alt="Gabriel Gomes"
                  className={styles.profileImage}
                />
                <p>Gabriel Gomes</p>
              </div>
              <div className={styles.student}>
                <img
                  src="https://randomuser.me/api/portraits/lego/3.jpg"
                  alt="Jean Henrique"
                  className={styles.profileImage}
                />
                <p>Jean Henrique</p>
              </div>
              <div className={styles.student}>
                <img
                  src="https://randomuser.me/api/portraits/lego/4.jpg"
                  alt="João Jardel"
                  className={styles.profileImage}
                />
                <p>João Jardel</p>
              </div>
            </div>
          </div>
          <article className={styles.section}>
            <h2>Contents:</h2>
            <ol className={styles.summary}>
              <li>
                <a href="#graphplan">Graphplan Algorithm</a>
              </li>
              <ul>
                <li>
                  <a href="#description">Algorithm Description</a>
                </li>
                <li>
                  <a href="#construction">Graph Construction</a>
                </li>
                <li>
                  <a href="#search">Plan Search</a>
                </li>
                <li>
                  <a href="#mutex">Mutual Exclusions</a>
                </li>
              </ul>
              <li>
                <a href="#strips-pddl">STRIPS and PDDL</a>
              </li>
              <ul>
                <li>
                  <a href="#strips">STRIPS</a>
                </li>
                <li>
                  <a href="#pddl">PDDL</a>
                </li>
              </ul>
              <li>
                <a href="#example">Application Example</a>
              </li>
              <li>
                <a href="#blocks">"Blocks" Problem with Pyperplan</a>
              </li>
              <ul>
                <li>
                  <a href="#blocks-model">PDDL Model</a>
                </li>
                <li>
                  <a href="#blocks-problem">PDDL Problem</a>
                </li>
                <li>
                  <a href="#blocks-execution">Running with Pyperplan</a>
                </li>
              </ul>
              <li>
                <a href="#logistics">"Logistics" Problem with Pyperplan</a>
              </li>
              <ul>
                <li>
                  <a href="#logistics-model">PDDL Model</a>
                </li>
                <li>
                  <a href="#logistics-problem">PDDL Problem</a>
                </li>
                <li>
                  <a href="#logistics-execution">Running with Pyperplan</a>
                </li>
              </ul>
            </ol>
          </article>
        </section>
      </div>
    </div>
  );
}

export default CI;
