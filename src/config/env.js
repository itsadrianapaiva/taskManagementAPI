import dotenv from "dotenv";

// Load .env file only if not in Gitpod
if (!process.env.GITPOD_WORKSPACE_ID) {
  dotenv.config();
}

export const env = {
  port: process.env.PORT || 3000,
  db: {
    host: process.env.DB_HOST || "db",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "password",
    database: process.env.DB_NAME || "task_system",
    port: process.env.DB_PORT || 3306,
  },
  redis: {
    host: process.env.REDIS_HOST || "redis",
    port: process.env.REDIS_PORT || 6379,
  },
  jwt: {
    secret: process.env.JWT_SECRET || "your_jwt_secret",
    expiresIn: process.env.JWT_EXPIRES_IN || "5d",
  },
};
