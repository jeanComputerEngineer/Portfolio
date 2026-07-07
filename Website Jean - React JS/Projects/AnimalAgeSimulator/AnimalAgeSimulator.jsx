import React, { useState, useEffect, useCallback } from 'react';
import styles from './AnimalAgeSimulator.module.css';
import AnimalAgeSimulatorLight from '../../Images/Projects/AnimalAgeSimulator/AnimalAgeSimulatorLight.png';
import AnimalAgeSimulatorDark from '../../Images/Projects/AnimalAgeSimulator/AnimalAgeSimulatorDark.png';
import { useTheme } from '../../Utils/ThemeContext';

export default function AnimalAgeSimulator() {
  const [selectedAnimal, setSelectedAnimal] = useState('select animal');
  const [totalAge, setTotalAge] = useState(0);
  const [showResultFlag, setShowResultFlag] = useState(false);
  const { isDarkMode } = useTheme();
  const theme = isDarkMode ? styles.dark : styles.light;
  const petsImage = isDarkMode ? AnimalAgeSimulatorDark : AnimalAgeSimulatorLight;

  const resetSimulation = useCallback(() => {
    setSelectedAnimal('select animal');
    setTotalAge(0);
    setShowResultFlag(false);
  }, []);

  const renderResult = useCallback(
    (result) => {
      if (result === 0 || !showResultFlag) {
        return <div></div>;
      } else {
        return (
          <div className={styles.result}>
            <h1 id="resultSection">
              The age of the {selectedAnimal} would be equivalent to {Math.round(result)} human
              years.
            </h1>
            <button onClick={resetSimulation}>Simulate Another Age</button>
            <img src={petsImage} alt="Animals" className={styles.image} />
          </div>
        );
      }
    },
    [showResultFlag, selectedAnimal, resetSimulation, petsImage],
  );

  useEffect(() => {
    window.scrollTo(0, 0);
    renderResult(totalAge);
  }, [totalAge, showResultFlag, renderResult]);

  function calculateAge() {
    const years = parseFloat(document.getElementById('years').value) || 0;
    const months = parseFloat(document.getElementById('months').value) || 0;
    const calculatedAge = parseFloat(years + months / 12);
    const animalElement = document.querySelector('select#animal');
    const sizeElement = document.querySelector('select#size');

    if (calculatedAge <= 0 || months < 0 || years < 0) {
      return alert('Please provide positive numbers.');
    } else if (months > 11) {
      return alert('Please provide months within a year.');
    } else if (animalElement.value === 'dog') {
      switch (sizeElement.value) {
        case 'select size':
          alert('Select the Dog Size');
          break;
        case 'small':
          if (calculatedAge <= 1 && calculatedAge > 0) {
            setTotalAge(calculatedAge * 15);
            setShowResultFlag(true);
          } else if (calculatedAge < 2 && calculatedAge > 1) {
            setTotalAge(calculatedAge * 12);
            setShowResultFlag(true);
          } else if (calculatedAge >= 2 && calculatedAge < 20) {
            setTotalAge(16 + calculatedAge * 4);
            setShowResultFlag(true);
          } else {
            return alert(
              'Please provide an age within the life expectancy of the ' +
                animalElement.value +
                '.',
            );
          }
          break;
        case 'medium':
          if (calculatedAge > 0 && calculatedAge <= 1) {
            setTotalAge(calculatedAge * 15);
            setShowResultFlag(true);
          } else if (calculatedAge <= 2 && calculatedAge > 1) {
            setTotalAge(calculatedAge * 12);
            setShowResultFlag(true);
          } else if (calculatedAge <= 5 && calculatedAge > 2) {
            setTotalAge(16 + calculatedAge * 4);
          } else if (calculatedAge <= 6 && calculatedAge > 5) {
            setTotalAge(16 + calculatedAge * 3.4);
            setShowResultFlag(true);
          } else if (calculatedAge > 6 && calculatedAge % 2 !== 0 && calculatedAge < 20) {
            let extra = 0;
            for (let i = 9; i <= calculatedAge; i += 2) {
              extra += 1;
            }
            setTotalAge(19 + calculatedAge * 4 + extra);
            setShowResultFlag(true);
          } else if (calculatedAge > 6 && calculatedAge % 2 === 0 && calculatedAge < 20) {
            let extra = 0;
            for (let i = 10; i <= calculatedAge; i += 2) {
              extra += 1;
            }
            setTotalAge(19 + calculatedAge * 4 + extra);
            setShowResultFlag(true);
          } else {
            return alert(
              'Please provide an age within the life expectancy of the ' +
                animalElement.value +
                '.',
            );
          }
          break;
        case 'large':
          if (calculatedAge <= 1 && calculatedAge > 0) {
            setTotalAge(calculatedAge * 15);
            setShowResultFlag(true);
          } else if (calculatedAge <= 2) {
            setTotalAge(calculatedAge * 12);
            setShowResultFlag(true);
          } else if (calculatedAge <= 5) {
            setTotalAge(16 + calculatedAge * 4);
            setShowResultFlag(true);
          } else if (calculatedAge <= 6) {
            setTotalAge(21 + calculatedAge * 4);
          } else if (calculatedAge <= 8) {
            setTotalAge(15 + calculatedAge * 5);
            setShowResultFlag(true);
          } else if (calculatedAge > 8 && calculatedAge < 18) {
            setTotalAge(11.5 + calculatedAge * 5.5);
            setShowResultFlag(true);
          } else {
            return alert(
              'Please provide an age within the life expectancy of the ' +
                animalElement.value +
                '.',
            );
          }
          break;
        default:
          break;
      }
    } else {
      const conversionTable = {
        cat: [
          15, 24, 32, 36, 40, 44, 48, 52, 56, 60, 64, 68, 72, 76, 80, 84, 88, 92, 96, 100, 104, 108,
          112, 116,
        ],
        horse: [
          6.5, 13, 18, 20.5, 23, 25.5, 28, 30.5, 33, 35.5, 38, 40.5, 43, 45.5, 48, 50.5, 53, 55.5,
          58, 60.5, 63, 65.5, 68, 70.5, 73, 75.5, 78, 80.5, 83, 85.5, 88, 90.5, 93, 95.5, 98, 100.5,
          103, 105.5, 108, 110.5, 113, 115.5,
        ],
        cockatiel: [
          4, 7, 11, 15, 18, 22, 25, 29, 33, 36, 40, 43, 47, 50, 54, 57, 61, 64, 68, 71, 75, 78, 82,
          85, 89, 92, 96, 99, 103, 106, 110, 113, 117,
        ],
        parrot: [
          2, 3, 5, 6, 8, 9, 11, 13, 14, 16, 17, 19, 20, 22, 23, 25, 26, 28, 29, 31, 32, 34, 35, 37,
          38, 40, 41, 43, 44, 46, 47, 49, 50, 52, 53, 55, 56, 58, 59, 61, 62, 64, 65, 67, 68, 70,
          71, 73, 74, 76, 77, 79, 80, 82, 83, 85, 86, 88, 89, 91, 92, 94, 95, 97, 98, 100, 101, 103,
          104, 106, 107, 109, 110, 112, 113, 115, 116, 118, 119, 121, 122,
        ],
        hamster: [41, 63.5, 80, 105],
        rabbit: [21, 27, 33, 39, 45, 51, 57, 63, 69, 75, 81, 87, 93, 99, 105],
        'guinea pig': [30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100],
        turtle: [],
        tiger: [],
        pig: [],
        ox: [],
        chicken: [],
      };

      const humanLifeExpectancy = 110;

      const turtleLife = 150;
      const turtleParts = humanLifeExpectancy / turtleLife;
      const turtleTable = Array.from({ length: turtleLife + 1 }, (_, i) =>
        Math.ceil((i + 1) * turtleParts),
      );
      if (calculatedAge > 0 && calculatedAge <= turtleLife) {
        conversionTable['turtle'] = turtleTable;
      }

      const tigerLife = 20;
      const tigerParts = humanLifeExpectancy / tigerLife;
      const tigerTable = Array.from({ length: tigerLife + 1 }, (_, i) =>
        Math.ceil((i + 1) * tigerParts),
      );
      if (calculatedAge > 0 && calculatedAge <= tigerLife) {
        conversionTable['tiger'] = tigerTable;
      }

      const pigLife = 20;
      const pigParts = humanLifeExpectancy / pigLife;
      const pigTable = Array.from({ length: pigLife + 1 }, (_, i) => Math.ceil((i + 1) * pigParts));
      if (calculatedAge > 0 && calculatedAge <= pigLife) {
        conversionTable['pig'] = pigTable;
      }

      const oxLife = 20;
      const oxParts = humanLifeExpectancy / oxLife;
      const oxTable = Array.from({ length: oxLife + 1 }, (_, i) => Math.ceil((i + 1) * oxParts));
      if (calculatedAge > 0 && calculatedAge <= oxLife) {
        conversionTable['ox'] = oxTable;
      }

      const chickenLife = 10;
      const chickenParts = humanLifeExpectancy / chickenLife;
      const chickenTable = Array.from({ length: chickenLife + 1 }, (_, i) =>
        Math.ceil((i + 1) * chickenParts),
      );
      if (calculatedAge > 0 && calculatedAge <= chickenLife) {
        conversionTable['chicken'] = chickenTable;
      }

      const table = conversionTable[animalElement.value];
      const integerAge = Math.floor(calculatedAge);
      const decimalAge = calculatedAge - integerAge;

      if (integerAge < table.length && calculatedAge >= 1) {
        const equivalentAge =
          table[integerAge - 1] + (table[integerAge] - table[integerAge - 1]) * decimalAge;
        setTotalAge(equivalentAge);
        setShowResultFlag(true);
      } else if (calculatedAge === table.length) {
        const lastIndex = calculatedAge - 1;
        setTotalAge(table[lastIndex]);
        setShowResultFlag(true);
      } else if (calculatedAge < 1 && calculatedAge > 0) {
        setTotalAge(table[0] * calculatedAge);
        setShowResultFlag(true);
      } else {
        return alert(
          'Please provide an age within the life expectancy of the ' + animalElement.value + '.',
        );
      }
    }
  }

  function renderButtons(selectedAnimal) {
    if (selectedAnimal === 'select animal') {
      return <div></div>;
    }
    if (selectedAnimal === 'dog') {
      return (
        <div className={styles.buttons}>
          <label>Select Dog Size</label>
          <select id="size">
            <option value="select size">Select Dog Size</option>
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
          </select>
          <label htmlFor="years">How many years?</label>
          <input type="number" id="years" placeholder="Enter years" />
          <label htmlFor="months">How many months?</label>
          <input type="number" id="months" placeholder="Enter months" />
          <button onClick={calculateAge}>Calculate</button>
        </div>
      );
    } else {
      return (
        <div className={styles.buttons}>
          <label htmlFor="years">How many years?</label>
          <input type="number" id="years" placeholder="Enter years" />
          <label htmlFor="months">How many months?</label>
          <input type="number" id="months" placeholder="Enter months" />
          <button onClick={calculateAge}>Calculate</button>
        </div>
      );
    }
  }

  return (
    <div className={theme}>
      <div className={styles.container}>
        {!showResultFlag && (
          <>
            <h1>Animal Age Simulator</h1>
            <h2>All ages are calculated using variables from the latest studies on this</h2>
            <h3>These are only approximate age predictions, keep that in mind!</h3>
            <select
              id="animal"
              onChange={(e) => setSelectedAnimal(e.target.value)}
              className={styles.animal}
            >
              <option value="select animal">Click Here to Select the Animal</option>
              <option value="dog">Dog</option>
              <option value="cat">Cat</option>
              <option value="horse">Horse</option>
              <option value="cockatiel">Cockatiel</option>
              <option value="parrot">Parrot</option>
              <option value="hamster">Hamster</option>
              <option value="rabbit">Rabbit</option>
              <option value="guinea pig">Guinea Pig</option>
              <option value="turtle">Turtle</option>
              <option value="tiger">Tiger</option>
              <option value="pig">Pig</option>
              <option value="ox">Ox</option>
              <option value="chicken">Chicken</option>
            </select>
            {renderButtons(selectedAnimal)}
          </>
        )}
        {showResultFlag && renderResult(totalAge)}
        {selectedAnimal === 'select animal' && (
          <img src={petsImage} alt="Animals" className={styles.image} />
        )}
      </div>
    </div>
  );
}
