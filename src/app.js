import express from "express";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import { env } from "./config/env.js";

const app = express();

//Middleware
app.use(express.json()); // Parse JSON body
app.use(cookieParser()); //Parse cookies from incoming requests
app.use(helmet()); //Security headers

//Healthcheck
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
  });
});

//Placeholder for routes
// app.use("api/v1/auth", authRoutes);
// app.use("api/v1/users", userRoutes);
// app.use("api/v1/tasks", taskRoutes);

//Error handling middleware
//app.use(errorMiddleware);

export default app;
