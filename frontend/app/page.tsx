"use client";

import { useState } from "react";

export default function Home() {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState<string[]>([]);

  const addTodo = () => {
    if (task.trim()) {
      setTodos([...todos, task]);
      setTask("");
    }
  };

  return (
    <main className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      <h1 className="text-4xl font-bold text-purple-600 mb-6">NexToDo</h1>

      {/* input form */}
      <div className="flex gap-2 mb-6">
        <input
          type="text"
          placeholder="Enter a task..."
          value={task}
          onChange={(e) => setTask(e.target.value)}
          className="px-4 py-2 rounded border border-gray-300 w-64 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <button
          onClick={addTodo}
          className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-500 transition"
        >
          Add
        </button>
      </div>

      {/* to do list */}
      <ul className="w-80 bg-white rounded shadow p-4">
        {todos.length === 0 ? (
          <li className="text-gray-400 text-center">No tasks yet.</li>
        ) : (
          todos.map((todo, idx) => (
            <li
              key={idx}
              className="border-b border-gray-200 py-2 text-gray-700 last:border-b-0"
            >
              {todo}
            </li>
          ))
        )}
      </ul>
    </main>
  );
}
