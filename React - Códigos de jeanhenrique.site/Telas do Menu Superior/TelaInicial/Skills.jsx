// Skills.js
import React from 'react';
import styles from './TelaInicial.module.css';
import react from '../../repositorioImagens/React-icon.svg.png';
import python from '../../repositorioImagens/python-programming-language.png';
import java from '../../repositorioImagens/java.png';
import Lua from '../../repositorioImagens/Lua.png';
import php from '../../repositorioImagens/php.png';
import hardware from '../../repositorioImagens/hardware.png';
import mysql from '../../repositorioImagens/mysql.png';
import redes from '../../repositorioImagens/redes.png';
import software from '../../repositorioImagens/EGENHARIA DE SOFTWARE.png';
import office from '../../repositorioImagens/Libre_office.png.png';
import marketing from '../../repositorioImagens/marketing.png';
import edicao from '../../repositorioImagens/photoshop.png';
import english from '../../repositorioImagens/english.png';
import driverLicense from '../../repositorioImagens/driver license.png';
import HtmlCssJs from '../../repositorioImagens/HtmlCssJs.png';
import Electron from '../../repositorioImagens/electron.png';
import NodeJs from '../../repositorioImagens/Node JS.png'
import VPS from '../../repositorioImagens/VPS.png'
import Linux from '../../repositorioImagens/Linux.png'

function Skills() {
    return (
        <div className={styles.containerAzul}>
            <h2>Habilidades</h2>
            <ul className={styles.Habilidades}>
                <li>
                    <p>HTML, CSS, JavaScript</p>
                    <img src={HtmlCssJs} alt="HTML, CSS, JavaScript" className={styles.imagemHabilidade} loading="lazy" />
                </li>
                <li>
                    <p>React JS</p>
                    <img src={react} alt="React JS" className={styles.imagemHabilidade} loading="lazy" />
                </li>
                <li>
                    <p>Node JS</p>
                    <img src={NodeJs} alt="React Native" className={styles.imagemHabilidade} loading="lazy" />
                </li>
                <li>
                    <p>Electron JS</p>
                    <img src={Electron} alt="Electron JS" className={styles.imagemHabilidade} loading="lazy" />
                </li>
                <li>
                    <p>VPS</p>
                    <img src={VPS} alt="Python" className={styles.imagemHabilidade} loading="lazy" />
                </li>
                <li>
                    <p>Linux Terminal</p>
                    <img src={Linux} alt="Python" className={styles.imagemHabilidade} loading="lazy" />
                </li>

                <li>
                    <p>Python</p>
                    <img src={python} alt="Python" className={styles.imagemHabilidade} loading="lazy" />
                </li>
                <li>
                    <p>Java</p>
                    <img src={java} alt="Java" className={styles.imagemHabilidade} loading="lazy" />
                </li>
                <li>
                    <p>Lua</p>
                    <img src={Lua} alt="Lua" className={styles.imagemHabilidade} loading="lazy" />
                </li>
                <li>
                    <p>PHP</p>
                    <img src={php} alt="PHP" className={styles.imagemHabilidade} loading="lazy" />
                </li>
                <li>
                    <p>Reparo de Hardware</p>
                    <img src={hardware} alt="Assistência Técnica em Hardware" className={styles.imagemHabilidade} loading="lazy" />
                </li>
                <li>
                    <p>Banco de Dados MySQL</p>
                    <img src={mysql} alt="Banco de Dados" className={styles.imagemHabilidade} loading="lazy" />
                </li>
                <li>
                    <p>Redes de Computadores</p>
                    <img src={redes} alt="Redes de Computadores" className={styles.imagemHabilidade} loading="lazy" />
                </li>
                <li>
                    <p>Engenharia de Software</p>
                    <img src={software} alt="Engenharia de Software" className={styles.imagemHabilidade} loading="lazy" />
                </li>
                <li>
                    <p>LibreOffice</p>
                    <img src={office} alt="LibreOffice" className={styles.imagemHabilidade} loading="lazy" />
                </li>
                <li>
                    <p>Marketing Digital</p>
                    <img src={marketing} alt="Marketing Digital" className={styles.imagemHabilidade} loading="lazy" />
                </li>
                <li>
                    <p>Edição de Vídeo e Imagem</p>
                    <img src={edicao} alt="Edição de Vídeo e Imagem" className={styles.imagemHabilidade} loading="lazy" />
                </li>
                <li>
                    <p>Inglês Avançado</p>
                    <img src={english} alt="Inglês Intermediário" className={styles.imagemHabilidade} loading="lazy" />
                </li>
                <li>
                    <p>Habilitação Categoria B</p>
                    <img src={driverLicense} alt="Habilitação Categoria B" className={styles.imagemHabilidade} loading="lazy" />
                </li>
            </ul>
        </div>
    );
}

export default Skills;
