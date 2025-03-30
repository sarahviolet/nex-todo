import express from "express";
import { Request, Response } from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";

dotenv.config(); // Load .env file

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json()); // Middleware to parse JSON requests

// Get all todos
app.get("/api/todos", async (req, res) => {
    try {
      const todos = await prisma.todo.findMany(); // Retrieve all todos from the database
      res.json(todos); // Respond with JSON format
    } catch (error) {
      console.error("Error fetching todos:", error);
      res.status(500).json({ error: "Failed to fetch todos" });
    }
});

// Define the expected request body type
interface TodoRequestBody {
    title: string;
    description?: string;
    date: string;
    time?: string;
    period: string;
    priority: string;
    type: string;
    isCompleted?: boolean;
  }

// Create a new todo
app.post("/api/todos", async (req: Request<{}, {}, TodoRequestBody>, res: Response): Promise<any> => {
      try {
      const { title, description, date, time, period, priority, type } = req.body as TodoRequestBody;
  
      if (!title || !date || !period || !priority || !type) {
        return res.status(400).json({ error: "Missing required fields" });
      }
  
      const newTodo = await prisma.todo.create({
        data: {
          title,
          description,
          date: new Date(date),
          time,
          period,
          priority,
          type,
          isCompleted: false,
          position: 0,
        },
      });
  
      res.status(201).json(newTodo);
    } catch (error) {
      console.error("Error creating todo:", error);
      res.status(500).json({ error: "Failed to create todo" });
    }
});

// Toggle the completion status of a todo
app.patch("/api/todos/:id/complete", async (req: Request<{ id: string }>, res: Response): Promise<any> => {
  try {
      const { id } = req.params;

      // Get the current todo item
      const todo = await prisma.todo.findUnique({
          where: { id },
          select: { isCompleted: true } // Only fetch the isCompleted field
      });

      if (!todo) {
          return res.status(404).json({ error: "Todo not found" });
      }

      // Toggle isCompleted (true → false, false → true)
      const updatedTodo = await prisma.todo.update({
          where: { id },
          data: { isCompleted: !todo.isCompleted } // Flip the value
      });

      res.status(200).json(updatedTodo);
  } catch (error) {
      console.error("Error toggling todo completion:", error);
      res.status(500).json({ error: "Failed to toggle completion status" });
  }
});

// 🛠 Update a todo (excluding isCompleted)
app.put("/api/todos/:id", async (req: Request<{ id: string }, {}, Omit<TodoRequestBody, "isCompleted">>, res: Response): Promise<any> => {
  try {
      const { id } = req.params;
      const { title, description, date, time, period, priority, type } = req.body;

      // Validate input
      if (!title || !date || !period || !priority || !type) {
          return res.status(400).json({ error: "Missing required fields" });
      }

      // Update todo (excluding isCompleted)
      const updatedTodo = await prisma.todo.update({
          where: { id },
          data: {
              title,
              description,
              date: new Date(date),
              time,
              period,
              priority,
              type,
          },
      });

      res.status(200).json(updatedTodo);
  } catch (error) {
      console.error("Error updating todo:", error);
      res.status(500).json({ error: "Failed to update todo" });
  }
});

// Delete a todo
app.delete("/api/todos/:id", async (req: Request<{ id: string }>, res: Response): Promise<any> => {
  try {
      const { id } = req.params;

      // Delete todo
      await prisma.todo.delete({
          where: { id },
      });

      res.status(200).json({ message: "Todo successfully deleted" });
  } catch (error) {
      console.error("Error deleting todo:", error);
      res.status(500).json({ error: "Failed to delete todo" });
  }
});

// Default route (server test endpoint)
app.get("/", (req, res) => {
  res.send("NexToDo Backend is running! 🚀");
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});