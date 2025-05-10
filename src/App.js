import React, { useEffect, useState } from 'react';
//import './App.css';

const API_URL = 'https://task-manager-api-slu7.onrender.com';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTaskName, setNewTaskName] = useState('');

  // Fetch tasks on component mount
  useEffect(() => {
    fetch(API_URL)
      .then(response => response.json())
      .then(data => setTasks(data.tasks));
  }, []);

  // Handle adding a new task
  const addTask = () => {
    fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: newTaskName, done: false }),
    })
    .then(response => response.json())
    .then(task => {
      setTasks([...tasks, task]);
      setNewTaskName('');
    });
  };

  // Handle updating a task's done status
  const toggleDone = (id, name, done) => {
    fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, done: !done }),
    })
    .then(response => response.json())
    .then(updated => {
      setTasks(tasks.map(t => (t.id === id ? updated : t)));
    });
  };

  // Handle deleting a task
  const deleteTask = (id) => {
    fetch(`${API_URL}/${id}`, { method: 'DELETE' })
      .then(() => {
        setTasks(tasks.filter(t => t.id !== id));
      });
  };

  return (
    <div className="App">
      <h1>Task Manager</h1>
      <input
        type="text"
        value={newTaskName}
        onChange={e => setNewTaskName(e.target.value)}
        placeholder="New task"
      />
      <button onClick={addTask}>Add Task</button>

      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            <span
              style={{ textDecoration: task.done ? 'line-through' : 'none', cursor: 'pointer' }}
              onClick={() => toggleDone(task.id, task.name, task.done)}
            >
              {task.name}
            </span>
            <button onClick={() => deleteTask(task.id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
