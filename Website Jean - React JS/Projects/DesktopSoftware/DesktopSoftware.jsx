import { useState } from 'react';
import styles from './DesktopSoftware.module.css';
import { useTheme } from '../../Utils/ThemeContext';
import Clients from '../../Images/Projects/Lawyerup/Clients.png';
import Cases from '../../Images/Projects/Lawyerup/Cases.png';
import Documents from '../../Images/Projects/Lawyerup/Documents.png';
import Consultations from '../../Images/Projects/Lawyerup/Consultations.png';
import Schedule from '../../Images/Projects/Lawyerup/Schedule.png';
import Finance from '../../Images/Projects/Lawyerup/Financial.png';
import Authentication from '../../Images/Projects/Lawyerup/Authentication.png';

function DesktopSoftware() {
  const { isDarkMode } = useTheme();
  const themeClass = isDarkMode ? styles.dark : styles.light;

  const softwares = [
    {
      title: 'Clients',
      description:
        'List of clients, where the lawyer can register, view, update, and delete clients, as well as access their related documents and cases.',
      image: Clients,
    },
    {
      title: 'Cases',
      description:
        'List of cases, allowing the lawyer to register, view, update, and delete cases, and identify the clients associated with each.',
      image: Cases,
    },
    {
      title: 'Documents',
      description:
        'Document area where the lawyer can manage registration, viewing, updating, and deleting of documents, automatically generate documents, and import local files.',
      image: Documents,
    },
    {
      title: 'Consultations',
      description:
        'List of consultations, enabling the lawyer to register, view, update, and delete consultations, as well as set unavailable times and periods for the automatic schedule.',
      image: Consultations,
    },
    {
      title: 'Schedule',
      description:
        'Task schedule allowing the lawyer to manage registration, viewing, updating, and deletion of tasks, with deadline notifications sent to the registered email.',
      image: Schedule,
    },
    {
      title: 'Finance',
      description:
        'Financial area where the lawyer can manage finances by registering, viewing, updating, and deleting records, issuing receipts, calculating income and expenses, estimating profits, and scheduling installments.',
      image: Finance,
    },
    {
      title: 'Authentication',
      description:
        'Authentication area where the lawyer can log in, contact support if needed, and set the visibility of their clients, financial records, and tasks, choosing whether to display this information to the whole team or only to the authenticated user.',
      image: Authentication,
    },
  ];

  const [searchTerm, setSearchTerm] = useState('');

  const filteredSoftwares = softwares.filter((software) =>
    software.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleExpandImage = (software) => {
    window.open(software.image, '_blank');
  };

  return (
    <div className={`${styles.container} ${themeClass}`}>
      <header className={styles.header}>
        <h1>Desktop Software</h1>
        <p>Explore the images and features of the software.</p>
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={styles.searchInput}
        />
      </header>

      <div className={styles.grid}>
        {filteredSoftwares.map((software) => (
          <div key={software.title} className={styles.card}>
            <img src={software.image} alt={software.title} className={styles.image} />
            <div className={styles.cardContent}>
              <h2>{software.title}</h2>
              <p>{software.description}</p>
              <button className={styles.expandButton} onClick={() => handleExpandImage(software)}>
                Expand
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DesktopSoftware;
