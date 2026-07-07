import styles from './Layout.module.css';
import { useTheme } from '../../../Utils/ThemeContext';

const Layout = ({ children }) => {
  const { isDarkMode } = useTheme();
  const theme = isDarkMode ? styles.dark : styles.light;

  return (
    <div className={theme}>
      <div className={styles.container}>{children}</div>
    </div>
  );
};

export default Layout;
