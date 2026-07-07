import React, { useState, useContext, useEffect } from 'react';
import { DataContext } from '../../DataContext';
import { useTheme } from '../../../../Utils/ThemeContext';
import styles from './Transactions.module.css';

function TransactionForm({ onTransactionRegistered }) {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('income');
  const [person, setPerson] = useState('');
  const [peopleList, setPeopleList] = useState([]);

  const { people, addTransaction } = useContext(DataContext);
  const { isDarkMode } = useTheme();
  const themeClass = isDarkMode ? styles.dark : styles.light;

  useEffect(() => {
    setPeopleList(people);
  }, [people]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!description.trim() || !amount || !type || !person) {
      alert('Please fill out all fields.');
      return;
    }

    if (description.length > 100) {
      alert('The description must have a maximum of 100 characters.');
      return;
    }

    const amountNum = parseFloat(amount);
    if (isNaN(amountNum) || amountNum < 0) {
      alert('Please enter a positive numeric value.');
      return;
    }

    const foundPerson = peopleList.find((p) => p.id === parseInt(person, 10));
    if (!foundPerson) {
      alert('Person not found!');
      return;
    }

    if (foundPerson.age < 18 && type !== 'expense') {
      alert('People under 18 can only register expenses.');
      return;
    }

    const newTransaction = {
      id: Date.now(),
      description: description.trim(),
      value: amountNum,
      type,
      person: foundPerson.id,
    };

    addTransaction(newTransaction);
    setDescription('');
    setAmount('');
    setType('income');
    setPerson('');
    if (onTransactionRegistered) onTransactionRegistered();
  };

  return (
    <div className={`${styles.transactionForm} ${themeClass}`}>
      <h3>Register Transaction</h3>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label>Description:</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            maxLength={100}
            placeholder="Enter description (max 100 characters)"
          />
        </div>
        <div className={styles.sameRow}>
          <div className={styles.formGroup}>
            <label>Amount:</label>
            <input
              type="number"
              step="0.01"
              min="0"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
              placeholder="Enter a positive value"
            />
          </div>
          <div className={styles.formGroupType}>
            <label>Type:</label>
            <select value={type} onChange={(e) => setType(e.target.value)}>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </div>
        </div>
        <div className={styles.formGroup}>
          <label>Person:</label>
          <select value={person} onChange={(e) => setPerson(e.target.value)} required>
            <option value="">Select a person</option>
            {peopleList.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name} (ID: {p.id})
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className={styles.btnSave}>
          Register
        </button>
      </form>
    </div>
  );
}

export default TransactionForm;
