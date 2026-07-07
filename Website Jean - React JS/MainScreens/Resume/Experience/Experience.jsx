import React, { useState } from 'react';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import styles from './Experience.module.css';

const experiences = [
  {
    id: 'previdas',
    company: 'Previdas',
    role: 'Full-stack Developer',
    type: 'Full-time · Remote',
    startDate: '2025-03-01',
    location: 'Brazil · Remote',
    logoText: 'P',
    highlights: [
      'Delivered financial solutions such as invoicing modules',
      'Built end-to-end CRUD interfaces for key business workflows',
      'Integrated secure funds-transfer capabilities',
      'Identified and fixed critical issues that saved the company from significant losses',
    ],
    summary:
      'I have been contributing to the development and evolution of our systems, working closely with the IT team to implement new features and resolve bugs.',
  },
  {
    id: 'freelance',
    company: 'Self-employed',
    role: 'Full-stack Developer',
    type: 'Remote',
    startDate: '2023-01-01',

    location: 'Brazil · Remote',
    logoText: 'S',
    details: [
      'Commercial desktop software for multiple law firms (clients, cases, documents, finances, calendars, appointments) with automatic document generation and email delivery. Built with Electron. Link: jeanhenrique.com/Projetos/SoftwareDesktop',
      'Freelance website with quote request system and portfolio. Link: jeanhenrique.com',
      'Institutional website for a law practice with automated appointment booking and SEO that achieved top Google ranking. Link: fuchsherique.com.br',
    ],
  },
];

function parseYmd(ymd) {
  const [yy, mm] = ymd.split('-').map(Number);
  return { y: yy, m: mm };
}

function makeMonthYearLabel(ymd) {
  const { y, m } = parseYmd(ymd);
  const d = new Date(y, m - 1, 1);
  return d.toLocaleString('en-US', { month: 'long', year: 'numeric' });
}

function diffInMonthsInclusive(startDate, endDate) {
  const { y: ys, m: ms } = parseYmd(startDate);
  const now = new Date();
  const ye = endDate ? parseYmd(endDate).y : now.getFullYear();
  const me = endDate ? parseYmd(endDate).m : now.getMonth() + 1;
  const raw = (ye - ys) * 12 + (me - ms) + 1;
  return Math.max(raw, 0);
}

function formatPeriod(exp) {
  const startLabel = makeMonthYearLabel(exp.startDate);
  const endLabel = exp.endDate ? makeMonthYearLabel(exp.endDate) : 'Present';
  const months = diffInMonthsInclusive(exp.startDate, exp.endDate);
  const monthsLabel = `${months} month${months === 1 ? '' : 's'}`;
  return `${startLabel} — ${endLabel} · ${monthsLabel}`;
}

function Experience() {
  const [openIds, setOpenIds] = useState([]);

  function toggle(id) {
    setOpenIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  }

  return (
    <section className={styles.wrapper}>
      <h2 className={styles.title}>Professional Experience</h2>

      <ul className={styles.grid}>
        {experiences.map((exp) => {
          const isOpen = openIds.includes(exp.id);
          const tooltip = isOpen ? 'Collapse details' : 'Expand details';
          return (
            <li key={exp.id} className={styles.card}>
              <header className={styles.header}>
                <div className={styles.identity}>
                  <div className={styles.logo} aria-hidden="true">
                    {exp.logoText}
                  </div>
                  <div className={styles.headings}>
                    <h3 className={styles.role}>{exp.role}</h3>
                    <p className={styles.meta}>
                      {exp.company} · {exp.type}
                    </p>
                    <p className={styles.metaSmall}>
                      {formatPeriod(exp)} · {exp.location}
                    </p>
                  </div>
                </div>

                <button
                  className={styles.toggle}
                  onClick={() => toggle(exp.id)}
                  aria-expanded={isOpen}
                  aria-controls={`exp-details-${exp.id}`}
                  aria-label={tooltip}
                  title={tooltip}
                  type="button"
                >
                  {isOpen ? <FiChevronUp size={18} /> : <FiChevronDown size={18} />}
                </button>
              </header>

              <div
                id={`exp-details-${exp.id}`}
                className={`${styles.details} ${isOpen ? styles.open : ''}`}
              >
                {'summary' in exp && <p className={styles.paragraph}>{exp.summary}</p>}

                {'highlights' in exp && exp.highlights && (
                  <ul className={styles.list}>
                    {exp.highlights.map((h, i) => (
                      <li key={i}>{h}</li>
                    ))}
                  </ul>
                )}

                {'details' in exp && exp.details && (
                  <ul className={styles.list}>
                    {exp.details.map((d, i) => (
                      <li key={i}>{d}</li>
                    ))}
                  </ul>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export default Experience;
