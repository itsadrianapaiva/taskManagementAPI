import { Queue } from "bullmq";
import { env } from "../config/env.js";
import { createClient } from "redis";

// Redis socket API
const connection = createClient({
  socket: {
    host: env.redis.host,
    port: env.redis.port,
  },
});

// Handle Redis connection errors
connection.on("error", (err) => {
  console.error("Redis connection error:", err);
});

// Ensure the connection is established
await connection.connect();

// Factory function for clean queue creation by name
export function createQueue(name) {
  return new Queue(name, { connection });
}
