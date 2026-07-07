import React, { useState, useContext, useEffect } from 'react';
import { DataContext } from '../../DataContext';
import { useTheme } from '../../../../Utils/ThemeContext';
import styles from './People.module.css';

function PersonForm({ personToEdit, onPersonSaved }) {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const { addPerson, updatePerson } = useContext(DataContext);
  const { isDarkMode } = useTheme();
  const themeClass = isDarkMode ? styles.dark : styles.light;

  useEffect(() => {
    if (personToEdit) {
      setName(personToEdit.name);
      setAge(personToEdit.age);
    }
  }, [personToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const nameTrimmed = name.trim();
    if (!nameTrimmed) {
      alert('The Name field is required.');
      return;
    }
    if (nameTrimmed.length < 2) {
      alert('The name must be at least 2 characters long.');
      return;
    }
    if (nameTrimmed.length > 50) {
      alert('The name must be at most 50 characters long.');
      return;
    }

    const ageNum = parseInt(age, 10);
    if (isNaN(ageNum)) {
      alert('Please enter a valid numeric value for age.');
      return;
    }
    if (ageNum <= -1) {
      alert('Age must be a number equal to or greater than zero.');
      return;
    }
    if (ageNum > 120) {
      alert('Please enter a valid age (120 or less).');
      return;
    }

    if (personToEdit) {
      updatePerson({ id: personToEdit.id, name: nameTrimmed, age: ageNum });
    } else {
      addPerson({ name: nameTrimmed, age: ageNum });
    }

    setName('');
    setAge('');
    if (onPersonSaved) onPersonSaved();
  };

  return (
    <div className={`${styles.personForm} ${themeClass}`}>
      <h3>{personToEdit ? 'Edit Person' : 'Register Person'}</h3>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="Enter the name (3-50 characters)"
          />
        </div>
        <div className={styles.formGroup}>
          <label>Age:</label>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            required
            placeholder="Enter the age"
            min="0"
            max="120"
          />
        </div>
        <button type="submit" className={styles.btnSave}>
          {personToEdit ? 'Update' : 'Register'}
        </button>
      </form>
    </div>
  );
}

export default PersonForm;
