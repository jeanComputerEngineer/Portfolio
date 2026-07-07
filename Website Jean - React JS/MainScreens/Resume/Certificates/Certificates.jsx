import React from 'react';
import styles from './Certificates.module.css';

import hardwareCertificate from '../../../Images/Certificates/Hardware Cursoemvideo_page-0001.jpg';
import gitCertificate from '../../../Images/Certificates/Jean-Samuel-Candido-Henrique-Git-e-GitHub-20-hours-Certificate-Curso-em-Video_page-0001.jpg';
import htmlCertificate from '../../../Images/Certificates/Jean-Samuel-Candido-Henrique-HTML5-40-hours-Certificate-Curso-em-Video_page-0001.jpg';
import jsCertificate from '../../../Images/Certificates/Jean-Samuel-Candido-Henrique-Javascript-40-hours-Certificate-Curso-em-Video_page-0001.jpg';
import digitalMarketingCertificate from '../../../Images/Certificates/Jean-Samuel-Candido-Henrique-Marketing-Digital-40-hours-Certificate-Curso-em-Video_page-0001.jpg';
import mysqlCertificate from '../../../Images/Certificates/Jean-Samuel-Candido-Henrique-MySQL-40-hours-Certificate-Curso-em-Video_page-0001.jpg';
import phpOOPCertificate from '../../../Images/Certificates/Jean-Samuel-Candido-Henrique-PHP-POO-40-hours-Certificate-Curso-em-Video_page-0001.jpg';
import linuxCertificate from '../../../Images/Certificates/Linux - cursoemvideo_page-0001.jpg';
import python1Certificate from '../../../Images/Certificates/Python 3 - World 1 Cursoemvideo_page-0001.jpg';
import python2Certificate from '../../../Images/Certificates/Python 3 - World 2 Cursoemvideo_page-0001.jpg';
import python3Certificate from '../../../Images/Certificates/Python 3 - World 3 Cursoemvideo_page-0001.jpg';
import certificate1 from '../../../Images/Certificates/1.png';
import certificate2 from '../../../Images/Certificates/2.png';
import certificate3 from '../../../Images/Certificates/3.png';
import certificate4 from '../../../Images/Certificates/4.png';
import certificate5 from '../../../Images/Certificates/5.png';
import certificate6 from '../../../Images/Certificates/6.png';
import certificate7 from '../../../Images/Certificates/7.png';
import certificate8 from '../../../Images/Certificates/8.png';
import certificate9 from '../../../Images/Certificates/9.png';
import certificate10 from '../../../Images/Certificates/10.png';
import certificate11 from '../../../Images/Certificates/11.png';
import certificate12 from '../../../Images/Certificates/12.png';
import certificate13 from '../../../Images/Certificates/13.png';
import certificate14 from '../../../Images/Certificates/14.png';
import certificate15 from '../../../Images/Certificates/15.png';
import certificate16 from '../../../Images/Certificates/16.png';
import certificate17 from '../../../Images/Certificates/17.png';
import certificate18 from '../../../Images/Certificates/18.png';
import certificate19 from '../../../Images/Certificates/19.png';
import certificate20 from '../../../Images/Certificates/20.png';
import certificate21 from '../../../Images/Certificates/21.png';
import certificate22 from '../../../Images/Certificates/22.png';
import certificate23 from '../../../Images/Certificates/23.png';
import certificate24 from '../../../Images/Certificates/24.png';
import certificate25 from '../../../Images/Certificates/25.png';
import certificate26 from '../../../Images/Certificates/26.png';
import certificate27 from '../../../Images/Certificates/27.png';
import certificate28 from '../../../Images/Certificates/28.png';
import certificate29 from '../../../Images/Certificates/29.png';
import certificate30 from '../../../Images/Certificates/30.png';
import certificate31 from '../../../Images/Certificates/31.png';
import certificate32 from '../../../Images/Certificates/32.png';
import certificate33 from '../../../Images/Certificates/33.png';
import certificate34 from '../../../Images/Certificates/34.png';
import certificate35 from '../../../Images/Certificates/35.png';
import certificate36 from '../../../Images/Certificates/36.png';
import certificate37 from '../../../Images/Certificates/37.png';
import certificate38 from '../../../Images/Certificates/38.png';
import certificate39 from '../../../Images/Certificates/39.png';
import certificate40 from '../../../Images/Certificates/40.png';
import certificate41 from '../../../Images/Certificates/41.png';
import certificate42 from '../../../Images/Certificates/42.png';
import certificate43 from '../../../Images/Certificates/43.png';
import certificate44 from '../../../Images/Certificates/44.png';
import certificate45 from '../../../Images/Certificates/45.png';
import certificate46 from '../../../Images/Certificates/46.png';
import certificate47 from '../../../Images/Certificates/47.png';
import certificate48 from '../../../Images/Certificates/48.png';
import certificate49 from '../../../Images/Certificates/49.png';
import certificate50 from '../../../Images/Certificates/50.png';
import certificate51 from '../../../Images/Certificates/51.png';
import certificate52 from '../../../Images/Certificates/52.png';
import certificate53 from '../../../Images/Certificates/53.png';
import certificate54 from '../../../Images/Certificates/54.jpg';
import certificate55 from '../../../Images/Certificates/55.jpg';
import certificate56 from '../../../Images/Certificates/56.jpg';
import certificate57 from '../../../Images/Certificates/57.jpg';
import certificate58 from '../../../Images/Certificates/58.jpg';
import certificate59 from '../../../Images/Certificates/59.jpg';
import certificate60 from '../../../Images/Certificates/60.jpg';
import certificate61 from '../../../Images/Certificates/61.jpg';
import certificate62 from '../../../Images/Certificates/62.jpg';
import certificate63 from '../../../Images/Certificates/63.jpg';
import certificate64 from '../../../Images/Certificates/64.jpg';
import certificate65 from '../../../Images/Certificates/65.jpg';

const items = [
  { title: 'Hardware - 20 hours', src: hardwareCertificate },
  { title: 'Git and GitHub - 20 hours', src: gitCertificate },
  { title: 'HTML5 - 40 hours', src: htmlCertificate },
  { title: 'JavaScript - 40 hours', src: jsCertificate },
  { title: 'Digital Marketing - 40 hours', src: digitalMarketingCertificate },
  { title: 'MySQL - 40 hours', src: mysqlCertificate },
  { title: 'PHP OOP - 40 hours', src: phpOOPCertificate },
  { title: 'Linux - 20 hours', src: linuxCertificate },
  { title: 'Python 3 World 1 - 40 hours', src: python1Certificate },
  { title: 'Python 3 World 2 - 40 hours', src: python2Certificate },
  { title: 'Python 3 World 3 - 40 hours', src: python3Certificate },
  { title: 'C Programming', src: certificate1 },
  { title: 'C Advanced', src: certificate2 },
  { title: 'Computer Networks', src: certificate3 },
  { title: 'IPV4', src: certificate4 },
  { title: 'DevOps', src: certificate5 },
  { title: 'Linux', src: certificate6 },
  { title: 'Ethical Hacking', src: certificate7 },
  { title: 'Cyber Security', src: certificate8 },
  { title: 'Artificial Intelligence', src: certificate9 },
  { title: 'Machine Learning', src: certificate10 },
  { title: 'SEO', src: certificate11 },
  { title: 'Social Media Marketing', src: certificate12 },
  { title: 'Digital Marketing', src: certificate13 },
  { title: 'Digital Marketing Advanced', src: certificate14 },
  { title: 'Git', src: certificate15 },
  { title: 'R', src: certificate16 },
  { title: 'Fundamentals', src: certificate17 },
  { title: 'IOT', src: certificate18 },
  { title: 'IT Basics', src: certificate19 },
  { title: 'Flask', src: certificate20 },
  { title: 'Computer Vision Python', src: certificate21 },
  { title: 'Python Advanced', src: certificate22 },
  { title: 'Python for A.I', src: certificate23 },
  { title: 'Python', src: certificate24 },
  { title: 'Python 3', src: certificate25 },
  { title: 'Java', src: certificate26 },
  { title: 'Java Spring', src: certificate27 },
  { title: 'Java Advanced', src: certificate28 },
  { title: 'ChatGPT', src: certificate29 },
  { title: 'UI/UX', src: certificate30 },
  { title: 'Shell Script', src: certificate31 },
  { title: 'Assembly 8086', src: certificate32 },
  { title: 'Php', src: certificate33 },
  { title: 'Software Testing', src: certificate34 },
  { title: 'Software Engineering', src: certificate35 },
  { title: 'JS - Animations 2', src: certificate36 },
  { title: 'JS - Animations', src: certificate37 },
  { title: 'JS - Array Methods', src: certificate38 },
  { title: 'JS - Automation', src: certificate39 },
  { title: 'JS - Coding Fundamentals 2', src: certificate40 },
  { title: 'JS - Coding Fundamentals', src: certificate41 },
  { title: 'JS - Intro to Interviewing', src: certificate42 },
  { title: 'JS - Intro to Webpages', src: certificate43 },
  { title: 'JS Advanced', src: certificate44 },
  { title: 'HTML', src: certificate45 },
  { title: 'Building a Website', src: certificate46 },
  { title: 'Java Script', src: certificate47 },
  { title: 'HTML Advanced', src: certificate48 },
  { title: 'CSS', src: certificate49 },
  { title: 'Data Science', src: certificate50 },
  { title: 'Statistical Analysis', src: certificate51 },
  { title: 'SQL', src: certificate52 },
  { title: 'Data Structure and Algorithms', src: certificate53 },
  { title: 'React Development', src: certificate54 },
  { title: 'TypeScript', src: certificate55 },
  { title: 'Node JS', src: certificate56 },
  { title: 'Electron JS', src: certificate57 },
  { title: 'Hacking Advanced', src: certificate58 },
  { title: 'MongoDB', src: certificate59 },
  { title: 'Angular JS', src: certificate60 },
  { title: 'Next JS', src: certificate61 },
  { title: 'C#', src: certificate62 },
  { title: 'VB.net', src: certificate63 },
  { title: 'Vue JS', src: certificate64 },
  { title: 'ERP Systems', src: certificate65 },
];

function Certificates() {
  return (
    <div className={styles.blueContainer2}>
      <h2>Certificates</h2>
      <ul className={styles.grid}>
        {items.map((it, i) => (
          <li key={i} className={styles.item} title={it.title}>
            <a href={it.src} target="_blank" rel="noopener noreferrer" className={styles.card}>
              <img
                loading="lazy"
                src={it.src}
                alt={`Certificate ${it.title}`}
                className={styles.thumb}
              />
              <p className={styles.title}>{it.title}</p>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Certificates;
