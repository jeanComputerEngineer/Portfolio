import React, { useState, useEffect } from 'react';
import styles from './Header.module.css';
import profileImage from '../../../Images/PersonalPhotos/Me/zu.png';
import { FaLinkedin, FaMapMarkerAlt, FaGithub, FaUser } from 'react-icons/fa';
import { SiGmail } from 'react-icons/si';
import { IoLogoWhatsapp } from 'react-icons/io';

function Header() {
  const [age, setAge] = useState(0);
  const [copiedEmail, setCopiedEmail] = useState(false);

  useEffect(() => {
    function calculateAge() {
      const birthDate = new Date(2002, 2, 28);
      const today = new Date();
      let years = today.getFullYear() - birthDate.getFullYear();
      const hasHadBirthdayThisYear =
        today.getMonth() > birthDate.getMonth() ||
        (today.getMonth() === birthDate.getMonth() && today.getDate() >= birthDate.getDate());

      if (!hasHadBirthdayThisYear) {
        years -= 1;
      }

      setAge(years);
    }

    calculateAge();
  }, []);

  const whatsappHref =
    'https://wa.me/5541985262911/?text=Hello,%20I%20came%20from%20your%20website%20and%20would%20like%20to%20hire%20your%20services';
  const linkedinHref = 'https://www.linkedin.com/in/jean-henrique-software-developer/';
  const githubHref = 'https://github.com/jeanComputerEngineer/Portfolio';

  return (
    <header className={styles.headerContainer}>
      <h1 className={styles.headerTitle}>Jean Samuel Candido Henrique</h1>
      <div className={styles.headerContent}>
        <img src={profileImage} alt="Profile picture" className={styles.headerProfileImage} />
        <ul className={styles.headerItems}>
          <li>
            <div className={styles.itemRow}>
             <a
              href={linkedinHref}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.headerItemLink}
              data-tooltip={linkedinHref}
            >
                <FaLinkedin size={40} />
                <p>LinkedIn</p>
              </a>
            </div>
          </li>
          <li>
            <div className={styles.itemRow}>
             <a
              href={githubHref}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.headerItemLink}
              data-tooltip={githubHref}
            >
                <FaGithub size={40} />
                <p>GitHub</p>
              </a>
            </div>
          </li>
          <li>
            <div className={styles.itemColumn}>
             <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.headerItemLink}
                data-tooltip="+55 41 98526-2911"
              >
                <IoLogoWhatsapp size={40} />
                <p>+55 41 98526-2911</p>
              </a>
            </div>
          </li>
          <li>
            <div className={styles.itemRow}>
             <a
  href="#"
  role="button"
  tabIndex={0}
  className={`${styles.headerItemLink} ${copiedEmail ? styles.showTooltip : ''}`}
  data-tooltip={copiedEmail ? 'Copied!' : 'jschenrique41@gmail.com'}
  onClick={(e) => {
    e.preventDefault();
    navigator.clipboard.writeText('jschenrique41@gmail.com').then(() => {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 1200);
    });
  }}
  onKeyDown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      navigator.clipboard.writeText('jschenrique41@gmail.com').then(() => {
        setCopiedEmail(true);
        setTimeout(() => setCopiedEmail(false), 1200);
      });
    }
  }}
>
                <SiGmail size={40} />
                <p>Email</p>
              </a>
            </div>
          </li>
          <li>
            <FaMapMarkerAlt size={40} />
            <p>Brazil</p>
          </li>
          <li>
            <FaUser size={40} />
            <p>{age} years</p>
          </li>
        </ul>
      </div>
    </header>
  );
}

export default Header;
