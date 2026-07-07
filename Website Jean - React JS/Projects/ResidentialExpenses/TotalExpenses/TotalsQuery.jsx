import React, { useContext } from 'react';
import { DataContext } from '../../DataContext';
import { useTheme } from '../../../../Utils/ThemeContext';
import styles from './TotalsQuery.module.css';

function TotalsQuery() {
  const { people, transactions } = useContext(DataContext);
  const { isDarkMode } = useTheme();
  const theme = isDarkMode ? styles.dark : styles.light;

  const calculateTotals = (personId) => {
    const personTransactions = transactions.filter((t) => t.person === personId);
    const totalIncome = personTransactions
      .filter((t) => t.type === 'income')
      .reduce((acc, t) => acc + t.value, 0);
    const totalExpenses = personTransactions
      .filter((t) => t.type === 'expense')
      .reduce((acc, t) => acc + t.value, 0);
    return { totalIncome, totalExpenses, balance: totalIncome - totalExpenses };
  };

  const overallTotals = people.reduce(
    (acc, p) => {
      const { totalIncome, totalExpenses, balance } = calculateTotals(p.id);
      return {
        totalIncome: acc.totalIncome + totalIncome,
        totalExpenses: acc.totalExpenses + totalExpenses,
        balance: acc.balance + balance,
      };
    },
    { totalIncome: 0, totalExpenses: 0, balance: 0 },
  );

  return (
    <div className={theme}>
      <div className={styles.Container}>
        <div className={styles.header}>
          <h2>Totals Query</h2>
        </div>
        <div className={styles.TotalsQuery}>
          <h3>Totals per Person</h3>
          {people.length === 0 ? (
            <p>No people registered.</p>
          ) : (
            <table className={styles.table}>
              <thead>
                <tr>
                  <th className={styles.person}>Name</th>
                  <th className={styles.value}>Total Income</th>
                  <th className={styles.value}>Total Expenses</th>
                  <th className={styles.value}>Balance</th>
                </tr>
              </thead>
              <tbody>
                {people.map((p) => {
                  const { totalIncome, totalExpenses, balance } = calculateTotals(p.id);
                  return (
                    <tr key={p.id}>
                      <td className={styles.person}>{p.name}</td>
                      <td className={styles.value}>{totalIncome.toFixed(2)}</td>
                      <td className={styles.value}>{totalExpenses.toFixed(2)}</td>
                      <td className={styles.value}>{balance.toFixed(2)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}

          <h3>Overall Totals</h3>
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.value}>Total Income</th>
                <th className={styles.value}>Total Expenses</th>
                <th className={styles.value}>Overall Balance</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className={styles.value}>{overallTotals.totalIncome.toFixed(2)}</td>
                <td className={styles.value}>{overallTotals.totalExpenses.toFixed(2)}</td>
                <td className={styles.value}>{overallTotals.balance.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default TotalsQuery;
