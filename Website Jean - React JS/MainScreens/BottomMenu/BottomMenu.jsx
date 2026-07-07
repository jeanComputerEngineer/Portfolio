import styles from './BottomMenu.module.css';

import { useTheme } from '../../Utils/ThemeContext';

function BottomMenu() {
  const { isDarkMode } = useTheme();
  const theme = isDarkMode ? styles.dark : styles.light;

  return (
    <div className={theme}>
      <div className={styles.container}>
        Creator: Jean Samuel Candido Henrique
        <br />
        Computer Engineering Student - UEPG
      </div>
    </div>
  );
}

export default BottomMenu;
