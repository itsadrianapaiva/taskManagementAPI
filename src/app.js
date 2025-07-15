import express from "express";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import taskRoutes from "./routes/task.routes.js";
import { rateLimiter } from "./middlewares/rateLimiter.js";
import { errorHandler } from "./middlewares/errorHandler.js";

const app = express();

//Middleware
app.use(express.json()); // Parse JSON body

app.use(cookieParser()); //Parse cookies from incoming requests
app.use(helmet()); //Security headers
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(rateLimiter);

//Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/tasks", taskRoutes);

//Healthcheck
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
  });
});

//Error Handler
app.use(errorHandler);

export default app;
