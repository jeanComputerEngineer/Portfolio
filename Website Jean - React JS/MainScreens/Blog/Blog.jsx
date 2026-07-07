import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Blog.module.css';
import softwareIndustryImg from '../../Images/Blog/SoftwareIndustry.png';
import softwareVsHardwareImg from '../../Images/Blog/SoftwareVsHardware.png';
import aiImg from '../../Images/Blog/AI.png';
import biologyImg from '../../Images/Blog/Biology.png';
import dataismImg from '../../Images/Blog/Dataism.png';
import startupImg from '../../Images/Blog/Startup.png';

import { useTheme } from '../../Utils/ThemeContext';

function Blog() {
  const { isDarkMode } = useTheme();
  const theme = isDarkMode ? styles.dark : styles.light;

  const [searchTerm, setSearchTerm] = useState('');

  const filteredTopics = [
    {
      image: softwareIndustryImg,
      category: 'INFORMATION',
      title: 'How Is the Software Industry in Brazil Currently?',
      author: 'Jean Henrique - Computer Engineering Student - UEPG',
      path: '/Blogs/SoftwareIndustry',
    },
    {
      image: softwareVsHardwareImg,
      category: 'OPINION',
      title: 'Software vs. Hardware: Which Path Is More Worthwhile?',
      author: 'Jean Henrique - Computer Engineering Student - UEPG',
      path: '/Blogs/SoftwareVsHardware',
    },
    {
      image: aiImg,
      category: 'INFORMATION',
      title: 'Will Artificial Intelligence Take My Job?',
      author: 'Jean Henrique - Computer Engineering Student - UEPG',
      path: '/Blogs/AI',
    },
    {
      image: biologyImg,
      category: 'INFORMATION',
      title: 'Computing and Biology',
      author: 'Jean Henrique - Computer Engineering Student - UEPG',
      path: '/Blogs/ComputingBiology',
    },
    {
      image: dataismImg,
      category: 'INFORMATION',
      title: 'Dataism by Yuval Harari',
      author: 'Jean Henrique - Computer Engineering Student - UEPG',
      path: '/Blogs/Dataism',
    },
    {
      image: startupImg,
      category: 'INFORMATION',
      title: 'Is It Worth Starting a Startup in Brazil?',
      author: 'Jean Henrique - Computer Engineering Student - UEPG',
      path: '/Blogs/Startup',
    },
  ].filter((topic) => topic.title.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className={theme}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h1>Topics (Initial Design Only)</h1>
          <p>Explore articles on various topics related to computing and technology.</p>

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
          {filteredTopics.map((topic) => (
            <li key={topic.title}>
              <Link to={topic.path}>
                <img src={topic.image} alt={`Image of ${topic.title}`} className={styles.image} />
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

export default Blog;
