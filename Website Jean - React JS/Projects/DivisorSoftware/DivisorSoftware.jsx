import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './DivisorSoftware.module.css';
import DividerImage from '../../Images/Projects/ImageSlicer/ImageSlicer.png';
import { useTheme } from '../../Utils/ThemeContext';

function DivisorSoftware() {
  const { isDarkMode } = useTheme();
  const theme = isDarkMode ? styles.dark : styles.light;
  const [searchTerm] = useState('');

  const filteredTopics = [
    {
      image: DividerImage,
      category: 'Image Slicer Software',
      title:
        'Desktop Software Made in Python for Splitting Images into Smaller Sizes for AI Training',
      author: 'Jean Henrique - Computer Engineering Student - UEPG',
      path: 'https://github.com/jeanComputerEngineer/Apenas-Codigos-Dos-Projetos/tree/main/Picotador%20De%20Images',
    },
    {
      image: DividerImage,
      category: 'Software with Crop Area',
      title:
        'Desktop Software Made in Python that Crops the Image in the User-Defined Area Without Distorting the Image',
      author: 'Jean Henrique - Computer Engineering Student - UEPG',
      path: 'https://github.com/jeanComputerEngineer/Apenas-Codigos-Dos-Projetos/tree/main/Cortador%20Com%20Origem',
    },
  ].filter((topic) => topic.title.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className={theme}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h1>Python Desktop Software</h1>
          <p>Interface containing the two projects developed for the UEPG Scientific Initiation</p>
        </header>
        <ul className={styles.topicsList}>
          {filteredTopics.map((topic) => (
            <li key={topic.title}>
              <Link to={topic.path}>
                <img src={topic.image} alt={`${topic.title}`} className={styles.image} />
                <h2>{topic.category}</h2>
                <h1>{topic.title}</h1>
                <h3>{topic.author}</h3>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default DivisorSoftware;
