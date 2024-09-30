import React, { useState } from "react";
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [editValue, setEditValue] = useState("");

  // Function to add a new task
  const addTask = () => {
    if (newTask.trim() !== "") {
      setTasks([...tasks, { text: newTask, done: false }]);
      setNewTask("");
    }
  };

  // Function to delete a task
  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  // Function to toggle task as done/undone
  const toggleDone = (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, done: !task.done } : task
    );
    setTasks(updatedTasks);
  };

  // Start editing a task
  const startEdit = (index, text) => {
    setEditIndex(index);
    setEditValue(text);
  };

  // Save edited task
  const saveEdit = () => {
    const updatedTasks = tasks.map((task, i) =>
      i === editIndex ? { ...task, text: editValue } : task
    );
    setTasks(updatedTasks);
    setEditIndex(null);
    setEditValue("");
  };

  return (
    <div className="App">
      <h1>My Todo List</h1>

      {/* Input to add new tasks */}
      <input
        type="text"
        placeholder="Add a new task..."
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
      />
      <button className="button" onClick={addTask}>Add Task</button>
 
      {/* Display list of tasks */}
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            {/* Task item container */}
            <div className="task-item">
              {/* Checkbox to mark task as done */}
              <input
                type="checkbox"
                checked={task.done}
                onChange={() => toggleDone(index)}
              />

              {/* Task text or editable input */}
              {editIndex === index ? (
                <input
                  type="text"
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                />
              ) : (
                <span className={`task-text ${task.done ? "done-task" : ""}`}>
                  {task.text}
                </span>
              )}
            </div>

            {/* Edit, Save, and Delete buttons */}
            <div className="task-buttons">
              {editIndex === index ? (
                <button className="button save-button" onClick={saveEdit}>
                  Save
                </button>
              ) : (
                <button
                  className="button edit-button"
                  onClick={() => startEdit(index, task.text)}
                >
                  Edit
                </button>
              )}
              <button className="button delete-button" onClick={() => deleteTask(index)}>
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
