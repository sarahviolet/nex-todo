import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/todos";

// Fetch all todos
export const getTodos = async () => {
  const response = await axios.get(API_BASE_URL);
  console.log("✅ GET /todos response:", response.data);
  return response.data;
};

// Create a new todo
export const createTodo = async (todo: {
  title: string;
  description?: string;
  date: string;
  time?: string;
  period: string;
  priority: string;
  type: string;
}) => {
  const response = await axios.post(API_BASE_URL, todo);
  return response.data;
};

// Update a todo (excluding isCompleted)
export const updateTodo = async (id: string, updatedData: {
    title: string;
    description?: string;
    date: string;
    time?: string;
    period: string;
    priority: string;
    type: string;
  }) => {
    const response = await axios.put(`${API_BASE_URL}/${id}`, updatedData);
    return response.data;
  };
  
// Delete a todo
export const deleteTodo = async (id: string) => {
  const response = await axios.delete(`${API_BASE_URL}/${id}`);
  return response.data;
};

// Toggle the completion status
export const toggleTodoCompletion = async (id: string) => {
  const response = await axios.patch(`${API_BASE_URL}/${id}/complete`);
  return response.data;
};
