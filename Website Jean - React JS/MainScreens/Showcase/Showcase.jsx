import styles from './Showcase.module.css';
import contract from '../../Images/ShowCase/Contract.png';
import website from '../../Images/ShowCase/Website.png';
import desktopApp from '../../Images/ShowCase/DesktopApp.png';
import appDev from '../../Images/ShowCase/AppDevelopment.png';
import gameDev from '../../Images/ShowCase/GameDevelopment.png';
import photosImg from '../../Images/ShowCase/Photos.png';
import videosImg from '../../Images/ShowCase/Videos.png';
import assistance from '../../Images/ShowCase/Support.png';
import { useTheme } from '../../Utils/ThemeContext';

function Showcase() {
  const { isDarkMode } = useTheme();
  const theme = isDarkMode ? styles.dark : styles.light;

  return (
    <div className={theme}>
      <div className={styles.showcaseContainer}>
        <h1>Available Offers</h1>
        <ul className={styles.list}>
          <li>
            <img src={contract} alt="Contract" className={styles.listImage1} />
          </li>
          <li>
            <img src={appDev} alt="App Development" className={styles.listImage1} />
          </li>
          <li>
            <img src={desktopApp} alt="Desktop App" className={styles.listImage1} />
          </li>
          <li>
            <img src={website} alt="Website" className={styles.listImage1} />
          </li>
          <li>
            <img src={gameDev} alt="Game Development" className={styles.listImage1} />
          </li>
          <li>
            <img src={assistance} alt="Technical Support" className={styles.listImage1} />
          </li>
          <li>
            <img src={photosImg} alt="Photos" className={styles.listImage1} />
          </li>
          <li>
            <img src={videosImg} alt="Videos" className={styles.listImage1} />
          </li>
        </ul>
      </div>
    </div>
  );
}
export default Showcase;
