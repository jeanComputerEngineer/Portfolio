import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './ToDoList.module.css';
import { useTheme } from '../../Utils/ThemeContext';

function ToDoList() {
  const [tasks, setTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();
  const theme = isDarkMode ? styles.dark : styles.light;
  const [username, setUsername] = useState('');

  useEffect(() => {
    const fetchTasks = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/Projects/To-Do-List/auth');
        return;
      }
      try {
        const response = await axios.get(
          'https://app.jeanhenrique.site/Projects/To-Do-List/todos',
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );
        setTasks(response.data.todos);
        setUsername(response.data.username);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          localStorage.removeItem('token');
          navigate('/Projects/To-Do-List/auth');
        }
      }
    };
    fetchTasks();
    return () => {
      localStorage.removeItem('token');
    };
  }, [navigate]);

  const addTask = async (text, priority, date) => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.post(
        'https://app.jeanhenrique.site/Projects/To-Do-List/todos',
        {
          text,
          priority,
          date,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      setTasks([...tasks, response.data.task]);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        localStorage.removeItem('token');
        navigate('/Projects/To-Do-List/auth');
      }
    }
  };

  const deleteTask = async (id) => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`https://app.jeanhenrique.site/Projects/To-Do-List/todos/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(tasks.filter((task) => task.id !== id));
    } catch (error) {
      if (error.response && error.response.status === 401) {
        localStorage.removeItem('token');
        navigate('/Projects/To-Do-List/auth');
      }
    }
  };

  const toggleCompleteTask = async (id) => {
    const token = localStorage.getItem('token');
    const task = tasks.find((task) => task.id === id);
    if (!task) return;
    try {
      await axios.put(
        `https://app.jeanhenrique.site/Projects/To-Do-List/todos/${id}`,
        {
          ...task,
          isCompleted: !task.isCompleted,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      setTasks(
        tasks.map((task) => (task.id === id ? { ...task, isCompleted: !task.isCompleted } : task)),
      );
    } catch (error) {
      if (error.response && error.response.status === 401) {
        localStorage.removeItem('token');
        navigate('/Projects/To-Do-List/auth');
      }
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  return (
    <div className={theme}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1>{username}'s To-Do List</h1>
          <ToDoSearch searchValue={searchTerm} setSearchValue={setSearchTerm} />
        </div>
        <div className={styles.grid}>
          {tasks
            .filter(
              (task) => task.text && task.text.toLowerCase().includes(searchTerm.toLowerCase()),
            )
            .map((task) => (
              <ToDo
                key={task.id}
                task={task}
                deleteTask={deleteTask}
                toggleCompleteTask={toggleCompleteTask}
                formatDate={formatDate}
              />
            ))}
        </div>
        <ToDoForm addTask={addTask} />
      </div>
    </div>
  );
}

function ToDoForm({ addTask }) {
  const [value, setValue] = useState('');
  const [priority, setPriority] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value || !priority || !date) return;
    addTask(value, priority, date);
    setValue('');
    setPriority('');
    setDate('');
  };

  return (
    <div className={styles.createTask}>
      <h2>Create Task</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Task"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="" disabled>
            Priority
          </option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        <button type="submit">Create</button>
      </form>
    </div>
  );
}

function ToDo({ task, deleteTask, toggleCompleteTask, formatDate }) {
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High':
        return '#F96959';
      case 'Medium':
        return '#aac3fe';
      case 'Low':
        return '#A0FAA6';
      default:
        return 'white';
    }
  };

  return (
    <div
      className={styles.taskCard}
      style={{ textDecoration: task.isCompleted ? 'line-through' : 'none' }}
    >
      <h1>{task.text}</h1>
      <h2 className={styles.priorityTag} style={{ background: getPriorityColor(task.priority) }}>
        {task.priority}
      </h2>
      <h3>{formatDate(task.date)}</h3>
      <div className={styles.buttons}>
        <button className={styles.completeButton} onClick={() => toggleCompleteTask(task.id)}>
          Complete
        </button>
        <button className={styles.deleteButton} onClick={() => deleteTask(task.id)}>
          Remove
        </button>
      </div>
    </div>
  );
}

function ToDoSearch({ searchValue, setSearchValue }) {
  return (
    <div className={styles.searchBox}>
      <input
        type="text"
        placeholder="Search by title..."
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
    </div>
  );
}

export default ToDoList;
