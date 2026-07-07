import React, { createContext, useState, useEffect } from 'react';

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [people, setPeople] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [lastPersonId, setLastPersonId] = useState(0);

  useEffect(() => {
    const savedPeople = JSON.parse(localStorage.getItem('people')) || [];
    const savedTransactions = JSON.parse(localStorage.getItem('transactions')) || [];
    const lastId = parseInt(localStorage.getItem('lastPersonId')) || 0;
    setPeople(savedPeople);
    setTransactions(savedTransactions);
    setLastPersonId(lastId);
  }, []);

  const addPerson = (newPerson) => {
    const newId = lastPersonId + 1;
    const personWithId = { ...newPerson, id: newId };
    const updatedPeople = [...people, personWithId];
    setPeople(updatedPeople);
    setLastPersonId(newId);
    localStorage.setItem('people', JSON.stringify(updatedPeople));
    localStorage.setItem('lastPersonId', newId);
  };

  const updatePerson = (updatedPerson) => {
    const updatedPeople = people.map((p) => (p.id === updatedPerson.id ? updatedPerson : p));
    setPeople(updatedPeople);
    localStorage.setItem('people', JSON.stringify(updatedPeople));
  };

  const deletePerson = (id) => {
    const updatedPeople = people.filter((p) => p.id !== id);
    setPeople(updatedPeople);
    localStorage.setItem('people', JSON.stringify(updatedPeople));

    const updatedTransactions = transactions.filter((t) => t.person !== id);
    setTransactions(updatedTransactions);
    localStorage.setItem('transactions', JSON.stringify(updatedTransactions));
  };

  const addTransaction = (newTransaction) => {
    const updatedTransactions = [...transactions, newTransaction];
    setTransactions(updatedTransactions);
    localStorage.setItem('transactions', JSON.stringify(updatedTransactions));
  };

  return (
    <DataContext.Provider
      value={{
        people,
        transactions,
        addPerson,
        updatePerson,
        deletePerson,
        addTransaction,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
