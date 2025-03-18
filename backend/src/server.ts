import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";

dotenv.config(); // Load .env file

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json()); // Middleware to parse JSON requests

// Default route (server test endpoint)
app.get("/", (req, res) => {
  res.send("NexToDo Backend is running! 🚀");
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
