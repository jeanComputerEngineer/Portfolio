// TopMenu.jsx
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MdDarkMode } from 'react-icons/md';
import { FaSun, FaProjectDiagram, FaUser, FaUserTie } from 'react-icons/fa';
import styles from './TopMenu.module.css';
import LogoJean from '../../Images/Logos/LogoJean.png';
import LogoJeanWhite from '../../Images/Logos/LogoJeanWhite.png';
import { useTheme } from '../../Utils/ThemeContext';

function TopMenu() {
  const { isDarkMode, toggleTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const themeClass = isDarkMode ? styles.dark : styles.light;

  const toggleOpen = () => setOpen((v) => !v);
  const close = () => setOpen(false);

  const onLogoClick = () => {
    if (location.pathname === '/') {
      window.location.reload();
    }
  };

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
    };
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  const isActive = (path) => location.pathname.startsWith(path);

  return (
    <header className={`${styles.root} ${themeClass}`}>
      <nav className={styles.bar} aria-label="Primary">
        <div className={styles.barInner}>
          <div className={styles.brand}>
            <Link to="/" onClick={onLogoClick} className={styles.brandLink} aria-label="Home">
              <img
                src={isDarkMode ? LogoJeanWhite : LogoJean}
                className={styles.logo}
                alt="Jean Henrique Logo"
              />
            </Link>
          </div>

          <ul className={styles.nav}>
            <li>
             <Link
                to="/Resume"
                className={`${styles.link} ${isActive('/Resume') ? styles.linkActive : ''}`}
              >
                <FaUserTie className={styles.icon} />
                Resume
              </Link>
            </li>
            <li>
              <Link
                to="/Projects"
                className={`${styles.link} ${isActive('/Projects') ? styles.linkActive : ''}`}
              >
                <FaProjectDiagram className={styles.icon} />
                Portfolio
              </Link>
            </li>
            <li>
              
              <Link
                to="/Personal"
                className={`${styles.link} ${isActive('/Personal') ? styles.linkActive : ''}`}
              >
                <FaUser className={styles.icon} />
                Personal
              </Link>
            </li>
          </ul>

          <div className={styles.actions}>
            <button
              type="button"
              className={styles.themeToggle}
              onClick={toggleTheme}
              aria-label="Toggle theme"
              aria-pressed={isDarkMode}
            >
              {isDarkMode ? <FaSun className={styles.themeIcon} /> : <MdDarkMode className={styles.themeIcon} />}
            </button>

            <button
              type="button"
              className={`${styles.burger} ${open ? styles.burgerOpen : ''}`}
              onClick={toggleOpen}
              aria-label="Open menu"
              aria-expanded={open}
              aria-controls="drawerMenu"
            >
              <span className={styles.burgerBar} />
              <span className={styles.burgerBar} />
              <span className={styles.burgerBar} />
            </button>
          </div>
        </div>
      </nav>

      <aside
        id="drawerMenu"
        className={`${styles.drawer} ${open ? styles.open : ''} ${themeClass}`}
        role="dialog"
        aria-modal="true"
      >
        <div className={styles.drawerHeader}>
          <img
            src={isDarkMode ? LogoJeanWhite : LogoJean}
            className={styles.drawerLogo}
            alt="Jean Henrique Logo"
          />
          <button type="button" className={styles.drawerClose} onClick={close} aria-label="Close menu">
            ×
          </button>
        </div>

        <ul className={styles.drawerNav}>
          <li>
            <Link
              to="/Personal"
              className={styles.drawerLink}
              onClick={close}
              data-active={isActive('/Personal')}
            >
              <FaUser className={styles.icon} />
              Personal
            </Link>
          </li>
          <li>
            <Link
              to="/Projects"
              className={styles.drawerLink}
              onClick={close}
              data-active={isActive('/Projects')}
            >
              <FaProjectDiagram className={styles.icon} />
              Portfolio
            </Link>
          </li>
          <li>
            <Link
              to="/Resume"
              className={styles.drawerLink}
              onClick={close}
              data-active={isActive('/Resume')}
            >
              <FaUserTie className={styles.icon} />
              Resume
            </Link>
          </li>
        </ul>

        <div className={styles.drawerActions}>
          <button
            type="button"
            className={styles.drawerThemeToggle}
            onClick={toggleTheme}
            aria-label="Toggle theme"
            aria-pressed={isDarkMode}
          >
            {isDarkMode ? <FaSun className={styles.themeIcon} /> : <MdDarkMode className={styles.themeIcon} />}
          </button>
        </div>
      </aside>
    </header>
  );
}

export default TopMenu;
