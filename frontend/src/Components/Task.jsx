import React, { useState, useEffect } from 'react';

const API = "http://localhost:3000/task";

const Task = () => {

  const [text, setText] = useState("");
  const [tasks, setTasks] = useState([]);

  // Load Tasks
  const loadTasks = async () => {
    try {
      const res = await fetch(API);
      const data = await res.json();
      setTasks(data);
    } catch (err) {
      console.error("Error loading tasks:", err);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  // Add Task
  const addTask = async (e) => {
    e.preventDefault();

    if (!text.trim()) return;

    await fetch(API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ text })
    });

    setText("");
    loadTasks();
  };

  // Delete
  const deleteTask = async (id) => {
    await fetch(`${API}/${id}`, { method: "DELETE" });
    loadTasks();
  };

  // Toggle Complete
  const toggleTask = async (task) => {
    await fetch(`${API}/${task.id}`, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ completed: !task.completed })
    });
    loadTasks();
  };

  return (
    <div className="max-w-xl mx-auto">

      <h1 className='text-center mt-12 text-3xl font-bold'>
        Task Manager
      </h1>

      <form onSubmit={addTask} className='bg-blue-200 flex flex-col items-center p-4 rounded-lg mt-6'>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          className='bg-white rounded-2xl px-6 py-2 m-2 w-full'
          type="text"
          placeholder='Enter your Task'
        />

        <button className='bg-red-500 px-6 py-2 rounded-3xl hover:bg-green-500 duration-300 hover:text-white font-semibold'>
          Add
        </button>
      </form>

      {/* Task List */}
      <div className="mt-6">
        {tasks.map((item) => (
          <div key={item.id} className='border p-4 mb-3 rounded-lg shadow'>
            <p className={item.completed ? "line-through text-gray-500" : ""}>
              {item.text}
            </p>

            <div className="mt-2">
              <button
                onClick={() => toggleTask(item)}
                className='mr-3 bg-green-400 px-3 py-1 rounded'
              >
                {item.completed ? "Undo" : "Complete"}
              </button>

              <button
                onClick={() => deleteTask(item.id)}
                className='bg-red-400 px-3 py-1 rounded'
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default Task;