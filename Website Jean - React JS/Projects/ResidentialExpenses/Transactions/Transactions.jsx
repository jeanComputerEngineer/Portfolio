import React, { useState } from 'react';
import TransactionForm from './TransactionForm';
import TransactionList from './TransactionList';
import { useTheme } from '../../../../Utils/ThemeContext';
import styles from './Transactions.module.css';

function Transactions() {
  const [showModal, setShowModal] = useState(false);
  const { isDarkMode } = useTheme();
  const themeClass = isDarkMode ? styles.dark : styles.light;

  const openFormModal = () => {
    setShowModal(true);
  };

  const closeFormModal = () => {
    setShowModal(false);
  };

  return (
    <div className={`${styles.transactionsContainer} ${themeClass}`}>
      <div className={styles.header}>
        <h2>Transactions</h2>
        <button className={styles.btnAdd} onClick={openFormModal}>
          Add Transaction
        </button>
      </div>
      <TransactionList />
      {showModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <span className={styles.closeButton} onClick={closeFormModal}>
              &times;
            </span>
            <TransactionForm onTransactionRegistered={closeFormModal} />
          </div>
        </div>
      )}
    </div>
  );
}

export default Transactions;
