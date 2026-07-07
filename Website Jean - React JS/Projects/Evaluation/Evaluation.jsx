import React, { useState, useEffect } from 'react';
import { FaRegStar } from 'react-icons/fa';
import styles from './Evaluation.module.css';
import { useTheme } from '../../Utils/ThemeContext';
import { useNavigate } from 'react-router-dom';

const Evaluation = () => {
  const [ratings, setRatings] = useState({
    overallRating: 0,
    appearanceRating: 0,
    contentRating: 0,
    usabilityRating: 0,
  });
  const [clientIP, setClientIP] = useState('');

  useEffect(() => {
    const fetchIP = async () => {
      const response = await fetch('https://api.ipify.org?format=json');
      const data = await response.json();
      setClientIP(data.ip);
    };
    fetchIP();
  }, []);

  const handleStarClick = (category, value) => {
    setRatings({
      ...ratings,
      [category]: value,
    });
  };

  const navigate = useNavigate();

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (
      ratings.overallRating === 0 ||
      ratings.appearanceRating === 0 ||
      ratings.contentRating === 0 ||
      ratings.usabilityRating === 0
    ) {
      window.alert('Please give at least 1 star in each category before submitting.');
    } else {
      const response = await fetch('https://app.jeanhenrique.site/avaliacao', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`,
        },
        body: JSON.stringify({
          name: e.target.name.value,
          overallRating: ratings.overallRating,
          appearanceRating: ratings.appearanceRating,
          contentRating: ratings.contentRating,
          usabilityRating: ratings.usabilityRating,
          opinion: e.target.opinion.value,
          ip: clientIP,
        }),
      });

      if (response.ok) {
        window.alert('Evaluation submitted successfully');
        navigate('/');
      } else {
        window.alert('Error submitting evaluation');
      }
    }
  };

  const { isDarkMode } = useTheme();
  const theme = isDarkMode ? styles.dark : styles.light;

  return (
    <div className={theme}>
      <div className={styles.container}>
        <h1>Website Evaluation Form</h1>
        <h2>Please explore the entire website before evaluating and be as honest as possible</h2>
        <h2>To explore the website, you need to click on the top menu</h2>
        <h2>To return to this form, go to the "Portfolio" tab and look for "Evaluation"</h2>
        <h3>If you do not wish to identify yourself, the "name" field is optional</h3>
        <form onSubmit={handleFormSubmit} className={styles.form}>
          <label>Name</label>
          <input type="text" name="name" placeholder="Enter your name" />

          <label>From 1 to 10, how would you rate the website overall?</label>
          <div className={styles.starContainer}>
            {[...Array(10)].map((_, index) => (
              <FaRegStar
                key={index}
                className={index < ratings.overallRating ? styles.starSelected : styles.star}
                onClick={() => handleStarClick('overallRating', index + 1)}
              />
            ))}
          </div>

          <label>From 1 to 10, how would you rate the website's appearance?</label>
          <div className={styles.starContainer}>
            {[...Array(10)].map((_, index) => (
              <FaRegStar
                key={index}
                className={index < ratings.appearanceRating ? styles.starSelected : styles.star}
                onClick={() => handleStarClick('appearanceRating', index + 1)}
              />
            ))}
          </div>

          <label>
            From 1 to 10, how would you rate the website's content? Did you find it fun and/or
            useful?
          </label>
          <div className={styles.starContainer}>
            {[...Array(10)].map((_, index) => (
              <FaRegStar
                key={index}
                className={index < ratings.contentRating ? styles.starSelected : styles.star}
                onClick={() => handleStarClick('contentRating', index + 1)}
              />
            ))}
          </div>

          <label>From 1 to 10, how would you rate the website's usability?</label>
          <div className={styles.starContainer}>
            {[...Array(10)].map((_, index) => (
              <FaRegStar
                key={index}
                className={index < ratings.usabilityRating ? styles.starSelected : styles.star}
                onClick={() => handleStarClick('usabilityRating', index + 1)}
              />
            ))}
          </div>

          <label>Did you find any bugs? Any criticism or suggestions? Enter here:</label>
          <textarea name="opinion" placeholder="Enter your opinion" maxLength={1500} />

          <button type="submit">Submit</button>
        </form>
        <h3>Thank you for your answers. Access the interactive content in the "Portfolio" tab</h3>
      </div>
    </div>
  );
};

export default Evaluation;
