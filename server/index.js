const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const {connectToDatabase} = require("./config/connect");
const userRoutes = require("./routers/user");
const bookRoutes = require("./routers/bookRoutes");
const mocktestRoutes = require("./routers/mocktest");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    credentials: true, 
    origin: ["http://localhost:3000", "http://localhost:5000", "https://khojo-college.vercel.app"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use("/auth", userRoutes);
app.use("/mock", mocktestRoutes);
app.use("/material", bookRoutes);

connectToDatabase()
  .then(() => {
    console.log("MongoDB Connected. Now starting server...");
    app.listen(8000, () => {
      console.log("Server is running on http://localhost:8000");
    });
  })
  .catch((error) => {
    console.error("Failed to connect to database:", error);
    process.exit(1);
  });
