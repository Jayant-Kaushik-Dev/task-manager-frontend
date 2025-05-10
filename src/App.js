import React, { useEffect, useState } from "react";
import { API_BASE_URL } from "./config";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTaskName, setNewTaskName] = useState("");

  useEffect(() => {
    fetch(`${API_BASE_URL}/tasks`)
      .then((res) => res.json())
      .then((data) => setTasks(data.tasks));
  }, []);

  const addTask = () => {
    fetch(`${API_BASE_URL}/tasks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newTaskName, done: false }),
    })
      .then((res) => res.json())
      .then((task) => setTasks([...tasks, task]));
  };

  const deleteTask = (id) => {
    fetch(`${API_BASE_URL}/tasks/${id}`, {
      method: "DELETE",
    }).then(() => {
      setTasks(tasks.filter((task) => task.id !== id));
    });
  };

  const toggleTaskDone = (task) => {
    fetch(`${API_BASE_URL}/tasks/${task.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: task.name, done: !task.done }),
    })
      .then((res) => res.json())
      .then((updatedTask) =>
        setTasks(tasks.map((t) => (t.id === task.id ? updatedTask : t)))
      );
  };

  return (
    <div>
      <h1>Task Manager</h1>
      <input
        value={newTaskName}
        onChange={(e) => setNewTaskName(e.target.value)}
        placeholder="Add a new task"
      />
      <button onClick={addTask}>Add</button>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <span
              onClick={() => toggleTaskDone(task)}
              style={{
                textDecoration: task.done ? "line-through" : "none",
                cursor: "pointer",
              }}
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
