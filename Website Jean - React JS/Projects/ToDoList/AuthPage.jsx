import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './AuthPage.module.css';
import { useTheme } from '../../Utils/ThemeContext';

function AuthPage() {
  const { isDarkMode } = useTheme();
  const theme = isDarkMode ? styles.dark : styles.light;

  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    return re.test(email);
  };

  const validatePassword = (password) => {
    return password.length > 6 && password.length <= 30;
  };

  const validateUsername = (username) => {
    const re = /^[a-zA-Z0-9 _-]{3,30}$/;
    return re.test(username);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      alert('Please enter a valid email.');
      return;
    }

    if (!validatePassword(password)) {
      alert('The password must be between 7 and 30 characters.');
      return;
    }

    if (!isLogin && !validateUsername(username)) {
      alert('The username must be between 3 and 30 characters and may contain spaces.');
      return;
    }

    try {
      if (isLogin) {
        const response = await axios.post(
          'https://app.jeanhenrique.site/Projects/To-Do-List/login',
          { email, password },
        );
        localStorage.setItem('token', response.data.token);
        navigate('/Projects/To-Do-List');
      } else {
        await axios.post('https://app.jeanhenrique.site/Projects/To-Do-List/register', {
          username,
          password,
          email,
        });
        alert('Registration successful. Please log in.');
        setIsLogin(true);
      }
    } catch (error) {
      console.error(`Error while ${isLogin ? 'logging in' : 'registering'}:`, error);
      alert(
        `Error while ${isLogin ? 'logging in' : 'registering'}. Please check your credentials.`,
      );
    }
  };

  return (
    <div className={`${styles.container} ${theme}`}>
      <div className={styles.formContainer}>
        <div className={styles.form}>
          <h1>To-Do List</h1>
          <h2>{isLogin ? 'Login' : 'User Registration'}</h2>
          <form onSubmit={handleSubmit}>
            <div className={styles.column}>
              {!isLogin && (
                <input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              )}
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button type="submit">{isLogin ? 'Login' : 'Register'}</button>
            </div>
          </form>
          <p>
            {isLogin ? "Don't have an account?" : ''}
            <button className={styles.toggleButton} onClick={toggleForm}>
              {isLogin ? 'Register your user' : 'I already have an account'}
            </button>
          </p>
        </div>
        <div className={styles.sideContainer}>
          <h2>Welcome</h2>
          <h2>Please read the following notices before creating your account:</h2>
          <ul>
            <li>
              If you have not created your account, click "Register your user" below the "Login"
              button.
            </li>
            <li>If you do not log in to your account again within 7 days, it will be deleted.</li>
            <li>
              There is a limit of only 1 account per IP every 7 days, so be careful when entering
              your data.
            </li>
            <li>
              Your username and password will be sent to your email. Because of this, there will be
              no "Forgot Password" option. If you forget your password, check your email or create
              another account.
            </li>
            <li>
              If you go more than 7 days without accessing your account, you may create a new
              account on the same IP, as your IP will be removed from the registry after 7 days.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default AuthPage;
