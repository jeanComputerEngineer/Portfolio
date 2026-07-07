import React, { useContext } from 'react';
import { DataContext } from '../../DataContext';
import { useTheme } from '../../../../Utils/ThemeContext';
import styles from './People.module.css';

function PeopleList({ onPersonEdit }) {
  const { people, deletePerson } = useContext(DataContext);
  const { isDarkMode } = useTheme();
  const themeClass = isDarkMode ? styles.dark : styles.light;

  return (
    <div className={`${styles.peopleList} ${themeClass}`}>
      <h3>People List</h3>
      {people.length === 0 ? (
        <p>No people registered.</p>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.id}>ID</th>
              <th className={styles.name}>Name</th>
              <th className={styles.age}>Age</th>
              <th className={styles.action}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {people.map((person) => (
              <tr key={person.id}>
                <td className={styles.id1}>{person.id}</td>
                <td>{person.name}</td>
                <td>{person.age}</td>
                <td className={styles.action}>
                  <button onClick={() => onPersonEdit(person)} className={styles.btnEdit}>
                    Edit
                  </button>
                  <button onClick={() => deletePerson(person.id)} className={styles.btnDelete}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default PeopleList;
