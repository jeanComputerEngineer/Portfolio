import React from 'react';
import styles from './Personal.module.css';
import { useTheme } from '../../Utils/ThemeContext';

function Personal() {
  const { isDarkMode } = useTheme();

  return (
    <div className={`${styles.personalContainer} ${isDarkMode ? styles.dark : ''}`}>
      <h1 className={styles.title}>My Personal Life</h1>

      <section className={styles.biography}>
        <h2>Biography</h2>
        <p>
          Hello! Since I was a child, I’ve always been curious about the world around me, which only
          grew in high school when I dreamed of becoming a scientist — whether in physics or
          computing. I’ve always felt that I followed a somewhat different path from most, going
          against common sense but never failing to value the true bonds I built along the way.
        </p>
        <p>
          I’m passionate about learning and exploring new experiences. I consider myself a
          communicative and determined person, always seeking growth, whether on my own or
          collaborating with others. Although I have an independent profile and like to be in
          control of situations, I recognize the importance of teamwork and I’m always willing to
          learn from those with more experience than me.
        </p>
        <p>
          Today, I’m about to graduate in Computer Engineering and I’m looking for my first
          opportunities in the IT field. My goal is to build a solid career, expand my knowledge,
          and with that, achieve financial stability and fulfill my dreams. I know each step of this
          journey brings me closer to what I aim for, and I’m excited for what’s ahead!
        </p>
      </section>

      <section className={styles.hobbies}>
        <h2>What I like to do</h2>
        <ul>
          <li>Travel and explore places, try new foods and experiences</li>
          <li>Practice gym workouts or calisthenics</li>
          <li>Watch instructional videos, anime, and movies</li>
          <li>Play computer games, especially with friends</li>
          <li>Code in my free time and feel proud of my logical reasoning</li>
        </ul>
      </section>

      <section className={styles.personality}>
        <h2>Personality</h2>
        <p>
          I’m a communicative, curious person always seeking knowledge. I like to understand how
          things work and question the world around me, which has led me to develop analytical
          thinking and a problem-solving mindset.
        </p>
        <p>
          I have an independent profile and like to be in control of situations, but I also
          recognize the importance of collaborating and learning from others. In work and life, I
          value efficiency and logic, always seeking practical, well-founded solutions. At the same
          time, I’m creative and like to explore new possibilities, whether coding, finding new ways
          to train, or facing new challenges.
        </p>
        <p>
          Determination and persistence are traits that define me. When I set a goal in my mind, I
          pursue it until I achieve it. Whether improving my programming skills, progressing in gym
          training, or learning something new, I like to see my own progress and feel proud of my
          accomplishments.
        </p>
        <p>
          In my free time, I enjoy traveling, gaming with friends, and watching educational content.
          I like mental challenges and feel satisfied when solving complex problems, whether in code
          or in life. Deep down, I believe continuous learning and the pursuit of new experiences
          keep me motivated and evolving.
        </p>
      </section>

      <section className={styles.moreAboutMe}>
        <h2>More About Me</h2>
        <p>
          - I’m learning German and I also want to learn Japanese or Mandarin <br />
          - I still dream of studying Philosophy or Physics <br />
          - I really want to be an entrepreneur <br />
          - My biggest dream is make a discovery that changes the world <br />
          - I’ve read many books and want to get back to reading, but for now I need to focus on my
          professional career <br />
          - I’m just a sinner, but saved by grace!
        </p>
      </section>
    </div>
  );
}

export default Personal;