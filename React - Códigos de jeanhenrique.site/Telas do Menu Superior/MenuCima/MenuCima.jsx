import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './MenuCima.module.css';
import { MdDarkMode } from "react-icons/md";
import {
    FaSun,
    FaRegClipboard,
    FaBoxOpen,
    FaProjectDiagram,
    FaUser,
    FaUserTie
} from "react-icons/fa";
import LogoJean from '../../repositorioImagens/LogoJean.png';
import LogoJeanWhite from '../../repositorioImagens/LogoJeanWhite.png';
import { useTheme } from '../../ThemeContext';

function MenuCima() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { isDarkMode, toggleTheme } = useTheme();
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const menuRef = useRef(null);

    const toggleMobileMenu = () => {
        setMobileMenuOpen(prev => !prev);
    };

    const closeMobileMenu = () => {
        setMobileMenuOpen(false);
    };

    const handleOutsideClick = (e) => {
        if (menuRef.current && !menuRef.current.contains(e.target)) {
            setMobileMenuOpen(false);
        }
    };

    useEffect(() => {
        if (mobileMenuOpen) {
            document.body.style.overflow = 'hidden';
            document.addEventListener('mousedown', handleOutsideClick);
        } else {
            document.body.style.overflow = '';
            document.removeEventListener('mousedown', handleOutsideClick);
        }
    }, [mobileMenuOpen]);

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const location = useLocation();

    const handleClick = () => {
        if (location.pathname === '/') {
            window.location.reload();
        }
    };

    const theme = isDarkMode ? styles.dark : styles.light;

    return (
        <div className={`${theme} ${mobileMenuOpen ? styles.menuVisible : ''}`}>
            <div ref={menuRef}>
                {mobileMenuOpen && <div className={styles.overlay} onClick={closeMobileMenu}></div>}
                <div className={`${styles.topTab} ${mobileMenuOpen ? styles.active : ''}`}>
                    <div
                        className={`${styles.menuIcon} ${mobileMenuOpen ? `${styles.active} ${styles.iconActive}` : ''}`}
                        onClick={toggleMobileMenu}
                    >
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                    <div>
                        <button className={styles.SoliciteSeuOrçamento}>
                            <Link to="/FaçaSeuPedido" className={styles.SoliciteSeuOrçamentoTxt}>
                                Orçamento
                            </Link>
                        </button>
                    </div>
                    <div>
                        <button onClick={toggleTheme} className={styles.botaoTema}>
                            {isDarkMode ? <FaSun className={styles.iconClaro} /> : <MdDarkMode className={styles.iconEscuro} />}
                        </button>
                    </div>
                </div>
                <div className={`${styles.tabsContainer} ${mobileMenuOpen ? styles.open : ''}`}>
                    <div className={styles.AlinharBotao}>
                        <button className={styles.closeButton} onClick={closeMobileMenu}>
                            <p>X</p>
                        </button>
                    </div>
                    <div className={styles.LogoContainer} onClick={closeMobileMenu}>
                        <Link to='/' onClick={handleClick}>
                            <img
                                src={isDarkMode ? LogoJeanWhite : LogoJean}
                                className={styles.Logo}
                                alt="Logo Jean"
                            />
                        </Link>
                    </div>
                    <div className={styles.MenuContainer}>
                        <Link to='/FaçaSeuPedido' className={styles.tab} onClick={closeMobileMenu}>
                            <FaRegClipboard className={styles.tabIcon} /> Orçamento
                        </Link>
                        <Link to='/Vitrine' className={styles.tab} onClick={closeMobileMenu}>
                            <FaBoxOpen className={styles.tabIcon} /> Vitrine
                        </Link>
                    </div>
                    <div className={styles.MenuContainer1}>
                        <Link to='/Pessoal' className={styles.tab} onClick={closeMobileMenu}>
                            <FaUser className={styles.tabIcon} /> Pessoal
                        </Link>
                        <Link to='/Projetos' className={styles.tab} onClick={closeMobileMenu}>
                            <FaProjectDiagram className={styles.tabIcon} /> Portfólio
                        </Link>
                        <Link to='/Curriculo' className={styles.tab} onClick={closeMobileMenu}>
                            <FaUserTie className={styles.tabIcon} /> Currículo
                        </Link>
                    </div>
                    {windowWidth > 1050 && (
                        <button onClick={toggleTheme} className={styles.themeButton} alt="Mudar Tema">
                            {isDarkMode ? <FaSun className={styles.iconClaro} /> : <MdDarkMode className={styles.iconEscuro} />}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default MenuCima;
