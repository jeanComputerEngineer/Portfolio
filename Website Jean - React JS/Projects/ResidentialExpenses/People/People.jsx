import React, { useState, useContext } from 'react';
import PersonForm from './PersonForm';
import PeopleList from './PeopleList';
import { DataContext } from '../../DataContext';
import { useTheme } from '../../../../Utils/ThemeContext';
import styles from './People.module.css';

function People() {
  const [showModal, setShowModal] = useState(false);
  const [personToEdit, setPersonToEdit] = useState(null);
  useContext(DataContext);
  const { isDarkMode } = useTheme();
  const themeClass = isDarkMode ? styles.dark : styles.light;

  const openRegisterModal = () => {
    setPersonToEdit(null);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const onPersonChanged = (editedPerson) => {
    setPersonToEdit(editedPerson || null);
    setShowModal(true);
  };

  return (
    <div className={`${styles.peopleContainer} ${themeClass}`}>
      <div className={styles.header}>
        <h2>People</h2>
        <button className={styles.btnAdd} onClick={openRegisterModal}>
          Add Person
        </button>
      </div>
      <PeopleList onPersonEdit={onPersonChanged} />
      {showModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <span className={styles.closeButton} onClick={closeModal}>
              &times;
            </span>
            <PersonForm personToEdit={personToEdit} onPersonSaved={closeModal} />
          </div>
        </div>
      )}
    </div>
  );
}

export default People;
