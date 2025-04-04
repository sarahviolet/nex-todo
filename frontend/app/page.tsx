"use client";

import { useEffect, useState } from "react";
import { getTodos, createTodo, updateTodo, deleteTodo } from "@/lib/api";

// Toggle completion API
async function toggleTodoComplete(id: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/${id}/complete`,
    {
      method: "PATCH",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to toggle todo completion");
  }

  return res.json();
}

// Todo type definition
type Todo = {
  id: string;
  title: string;
  description?: string;
  date: string;
  time?: string;
  period: string;
  priority: string;
  type: string;
  isCompleted: boolean;
  position: number;
  createdAt: string;
  updatedAt: string;
};

// TodoItem component with checkbox
const TodoItem = ({
  todo,
  onToggle,
  onEdit,
  onDelete,
}: {
  todo: Todo;
  onToggle: (id: string) => void;
  onEdit: (todo: Todo) => void;
  onDelete: (id: string) => void;
}) => {
  return (
    <li className="border-b border-gray-200 py-2 text-gray-700 last:border-b-0 flex justify-between items-center">
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          checked={todo.isCompleted}
          onChange={() => onToggle(todo.id)}
          className="w-4 h-4"
        />
        <span className={todo.isCompleted ? "line-through text-gray-400" : ""}>
          {todo.title}
        </span>
      </div>
      <div className="space-x-2">
        <button
          onClick={() => onEdit(todo)}
          className="text-white bg-blue-500 hover:bg-blue-600 px-2 py-1 rounded text-sm"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(todo.id)}
          className="text-white bg-red-500 hover:bg-red-600 px-2 py-1 rounded text-sm"
        >
          Delete
        </button>
      </div>
    </li>
  );
};

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);

  const [formData, setFormData] = useState({
    title: "",
    date: "",
    period: "morning",
    priority: "medium",
    type: "task",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    const { title, date, period, priority, type } = formData;
    if (!title || !date || !period || !priority || !type) return;

    try {
      const newTodo = await createTodo(formData);
      setTodos((prev) => [...prev, newTodo]);
      setFormData({
        title: "",
        date: "",
        period: "morning",
        priority: "medium",
        type: "task",
      });
    } catch (err) {
      console.error("Failed to create todo:", err);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteTodo(id);
      setTodos((prev) => prev.filter((todo) => todo.id !== id));
    } catch (err) {
      console.error("Failed to delete todo:", err);
    }
  };

  const handleUpdate = async (todo: Todo) => {
    const newTitle = prompt("Title", todo.title);
    const newDate = prompt("Date (yyyy-mm-dd)", todo.date.slice(0, 10));
    const newPeriod = prompt("Period (morning, afternoon, evening)", todo.period);
    const newPriority = prompt("Priority (high, medium, low)", todo.priority);
    const newType = prompt("Type (task, routine, event)", todo.type);

    if (!newTitle || !newDate || !newPeriod || !newPriority || !newType) {
      return alert("Update cancelled or missing fields");
    }

    try {
      const updated = await updateTodo(todo.id, {
        title: newTitle,
        date: newDate,
        period: newPeriod,
        priority: newPriority,
        type: newType,
      });

      setTodos((prev) =>
        prev.map((t) => (t.id === todo.id ? { ...t, ...updated } : t))
      );
    } catch (err) {
      console.error("Failed to update todo:", err);
    }
  };

  // Handle checkbox toggle
  const handleToggleComplete = async (id: string) => {
    try {
      await toggleTodoComplete(id);
      setTodos((prev) =>
        prev.map((todo) =>
          todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
        )
      );
    } catch (err) {
      console.error("Failed to toggle complete:", err);
    }
  };

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const data = await getTodos();
        setTodos(data);
      } catch (err) {
        console.error("Failed to load todos:", err);
      }
    };
    fetchTodos();
  }, []);

  return (
    <main className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      <h1 className="text-4xl font-bold text-purple-500 mb-6">NexToDo</h1>

        {/* input form */}
        <div className="bg-white p-4 rounded shadow w-80 mb-6">
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={formData.title}
            onChange={handleInputChange}
            className="w-full mb-2 px-3 py-2 border rounded"
          />
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleInputChange}
            className="w-full mb-2 px-3 py-2 border rounded"
          />
          <select
            name="period"
            value={formData.period}
            onChange={handleInputChange}
            className="w-full mb-2 px-3 py-2 border rounded"
          >
            <option value="morning">Morning</option>
            <option value="afternoon">Afternoon</option>
            <option value="evening">Evening</option>
          </select>
          <select
            name="priority"
            value={formData.priority}
            onChange={handleInputChange}
            className="w-full mb-2 px-3 py-2 border rounded"
          >
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
          <select
            name="type"
            value={formData.type}
            onChange={handleInputChange}
            className="w-full mb-2 px-3 py-2 border rounded"
          >
            <option value="task">Task</option>
            <option value="routine">Routine</option>
            <option value="event">Event</option>
          </select>
          <button
            onClick={handleSubmit}
            className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-500 transition"
          >
            Add Todo
          </button>
        </div>

      {/* Todo list */}
      <ul className="w-80 bg-white rounded shadow p-4">
        {todos.length === 0 ? (
          <li className="text-gray-400 text-center">No tasks yet.</li>
        ) : (
          todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={handleToggleComplete}
              onEdit={handleUpdate}
              onDelete={handleDelete}
            />
          ))
        )}
      </ul>
    </main>
  );
}