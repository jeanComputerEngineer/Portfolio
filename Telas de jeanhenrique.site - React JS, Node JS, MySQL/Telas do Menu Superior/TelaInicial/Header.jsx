// Header.js
import React from 'react';
import styles from './TelaInicial.module.css';
import imagemPerfil from '../../repositorioImagens/Jean.png';
import { Link } from 'react-router-dom';
import { FaLinkedin } from "react-icons/fa";
import { SiGmail } from "react-icons/si";
import { IoLogoWhatsapp } from "react-icons/io";
import { FaLocationDot } from "react-icons/fa6";
import { FaBirthdayCake } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";

function Header() {
    return (
        <div className={styles.ContainerCimaPai}>
            <h1>Jean Samuel Candido Henrique</h1>
            <div className={styles.ContainerCima}>
                <img src={imagemPerfil} alt="Foto de perfil" className={styles.profileImage} />
                <ul className={styles.DadosPessoais}>
                    <li><FaLocationDot />Ponta Grossa, Paraná, Brasil</li>
                    <li><FaBirthdayCake />28/03/2002</li>
                    <li>
                        <Link to="https://wa.me/5541985262911/?text=Ol%C3%A1,%20vim%20pelo%20seu%20site%20e%20gostaria%20de%20contratar%20os%20seus%20servi%C3%A7os" target="_blank">
                            <IoLogoWhatsapp />41985262911
                        </Link>
                    </li>
                    <li>
                        <Link to="https://www.linkedin.com/in/jean-samuel-candido-henrique-6b80581aa/" target="_blank">
                            <FaLinkedin />Jean Samuel Candido Henrique
                        </Link>
                    </li>
                    <li>
                        <Link to="mailto:jschenrique41@gmail.com" target="_blank">
                            <SiGmail />jschenrique41@gmail.com
                        </Link>
                    </li>
                    <li>
                        <Link to="https://github.com/jeanComputerEngineer?tab=repositories" target="_blank">
                            <FaGithub />jeanComputerEngineer
                        </Link>
                    </li>

                </ul>
            </div>
        </div>
    );
}

export default Header;
