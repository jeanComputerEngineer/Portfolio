import styles from './Countdown.module.css';
import Count from './Count';
import Dating from '../../Images/Projects/Countdown/Dating.png';
import Wedding from '../../Images/Projects/Countdown/Wedding.png';
import Classes from '../../Images/Projects/Countdown/Classes.png';
import Birthday from '../../Images/Projects/Countdown/Birthday.png';
import { useTheme } from '../../Utils/ThemeContext';

function CountdownIndex() {
  const [seconds, minutes, hours, days] = Count('Jan 1, 2025 00:00:00');
  const [seconds2, minutes2, hours2, days2] = Count('Jun 24, 2024 00:00:00');
  const [seconds3, minutes3, hours3, days3] = Count('Feb 19, 2025 00:00:00');
  const [seconds4, minutes4, hours4, days4] = Count('Mar 28, 2025 00:00:00');
  const [seconds5, minutes5, hours5, days5] = Count('Feb 17, 2025 00:00:00');

  const { isDarkMode } = useTheme();
  const theme = isDarkMode ? styles.dark : styles.light;

  return (
    <div className={theme}>
      <div className={styles.container}>
        <h1>Countdown</h1>

        <h2>New Year</h2>
        <ul className={styles.clock}>
          <li>{days}</li>
          <li>{hours}</li>
          <li>{minutes}</li>
          <li>{seconds}</li>
        </ul>
        <ul className={styles.legend}>
          <li>days</li>
          <li>hours</li>
          <li>minutes</li>
          <li>seconds</li>
        </ul>
        <img
          src="https://images.pexels.com/photos/2526105/pexels-photo-2526105.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt="New Year"
          className={styles.image}
        />

        <h2>Dating Anniversary</h2>
        <ul className={styles.clock}>
          <li>{days2}</li>
          <li>{hours2}</li>
          <li>{minutes2}</li>
          <li>{seconds2}</li>
        </ul>
        <ul className={styles.legend}>
          <li>days</li>
          <li>hours</li>
          <li>minutes</li>
          <li>seconds</li>
        </ul>
        <img src={Dating} alt="Dating" className={styles.image} />

        <h2>Until Feb 19, 2025</h2>
        <ul className={styles.clock}>
          <li>{days3}</li>
          <li>{hours3}</li>
          <li>{minutes3}</li>
          <li>{seconds3}</li>
        </ul>
        <ul className={styles.legend}>
          <li>days</li>
          <li>hours</li>
          <li>minutes</li>
          <li>seconds</li>
        </ul>
        <img src={Classes} alt="Classes" className={styles.image} />

        <h2>My Birthday</h2>
        <ul className={styles.clock}>
          <li>{days4}</li>
          <li>{hours4}</li>
          <li>{minutes4}</li>
          <li>{seconds4}</li>
        </ul>
        <ul className={styles.legend}>
          <li>days</li>
          <li>hours</li>
          <li>minutes</li>
          <li>seconds</li>
        </ul>
        <img src={Birthday} alt="Birthday" className={styles.image} />

        <h2>Wedding Anniversary</h2>
        <ul className={styles.clock}>
          <li>{days5}</li>
          <li>{hours5}</li>
          <li>{minutes5}</li>
          <li>{seconds5}</li>
        </ul>
        <ul className={styles.legend}>
          <li>days</li>
          <li>hours</li>
          <li>minutes</li>
          <li>seconds</li>
        </ul>
        <img src={Wedding} alt="Wedding" className={styles.image} />
      </div>
    </div>
  );
}

export default CountdownIndex;
