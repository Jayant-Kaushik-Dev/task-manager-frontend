import React, { useState, useEffect } from "react";
import { API_URL } from "./config";


function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editingTask, setEditingTask] = useState(null);
  const [editName, setEditName] = useState("");
  const [editDone, setEditDone] = useState(false);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = () => {
    fetch(`${API_URL}/tasks`)
      .then((res) => res.json())
      .then((data) => setTasks(data.tasks))
      .catch((err) => console.error("Error fetching tasks:", err));
  };

  const handleAddTask = () => {
    if (!newTask.trim()) return;

    fetch(`${API_URL}/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: newTask }),
    })
      .then((res) => res.json())
      .then(() => {
        setNewTask("");
        fetchTasks();
      });
  };

  const handleDeleteTask = (id) => {
    fetch(`${API_URL}/tasks/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => fetchTasks());
  };

  const startEditing = (task) => {
    setEditingTask(task.id);
    setEditName(task.name);
    setEditDone(task.done);
  };

  const handleUpdateTask = () => {
    fetch(`${API_URL}/tasks/${editingTask}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: editName, done: editDone }),
    })
      .then((res) => res.json())
      .then(() => {
        setEditingTask(null);
        fetchTasks();
      });
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Task Manager</h1>

      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="Enter a task"
      />
      <button onClick={handleAddTask}>Add Task</button>

      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <span>
              {task.name} {task.done ? "(Done)" : ""}
            </span>
            <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
            <button onClick={() => startEditing(task)}>Edit</button>
          </li>
        ))}
      </ul>

      {editingTask && (
        <div>
          <h3>Edit Task</h3>
          <input
            type="text"
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
          />
          <label>
            <input
              type="checkbox"
              checked={editDone}
              onChange={(e) => setEditDone(e.target.checked)}
            />
            Done
          </label>
          <button onClick={handleUpdateTask}>Update</button>
          <button onClick={() => setEditingTask(null)}>Cancel</button>
        </div>
      )}
    </div>
  );
}

export default App;
