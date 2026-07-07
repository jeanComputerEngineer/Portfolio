import React from 'react';
import { useTheme } from '../../Utils/ThemeContext';
import People from './People/People';
import Transactions from './Transactions/Transactions';
import TotalsQuery from './TotalExpenses/TotalsQuery';
import { DataProvider } from './DataContext';
import styles from './ResidentialExpenses.module.css';

function ResidentialExpenses() {
  const { isDarkMode } = useTheme();
  const theme = isDarkMode ? styles.dark : styles.light;

  return (
    <DataProvider>
      <div className={theme}>
        <div className={styles.residentialExpenses}>
          <h1>Residential Expense Control</h1>
          <section>
            <People />
          </section>
          <section>
            <Transactions />
          </section>
          <section>
            <TotalsQuery />
          </section>
        </div>
      </div>
    </DataProvider>
  );
}

export default ResidentialExpenses;
