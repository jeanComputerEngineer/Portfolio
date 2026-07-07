import React, { useContext } from 'react';
import { DataContext } from '../../DataContext';
import { useTheme } from '../../../../Utils/ThemeContext';
import styles from './Transactions.module.css';

function TransactionList() {
  const { transactions } = useContext(DataContext);
  const { isDarkMode } = useTheme();
  const themeClass = isDarkMode ? styles.dark : styles.light;

  return (
    <div className={`${styles.transactionList} ${themeClass}`}>
      <h3>Transaction List</h3>
      {transactions.length === 0 ? (
        <p>No transactions registered.</p>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.person}>Person ID</th>
              <th className={styles.description}>Description</th>
              <th className={styles.type}>Type</th>
              <th className={styles.amountHeader}>Amount</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((t) => (
              <tr key={t.id}>
                <td className={styles.person}>{t.person}</td>
                <td className={styles.description}>{t.description}</td>
                <td className={styles.type}>{t.type}</td>
                <td className={styles.amount}>{t.value.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default TransactionList;
