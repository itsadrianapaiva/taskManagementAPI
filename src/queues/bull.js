import { Queue } from "bullmq";
import IORedis from "ioredis";
import { env } from "../config/env.js";

// Redis API
const connection = new IORedis({
  host: env.redis.host,
  port: env.redis.port,
  maxRetriesPerRequest: null, //Required to avoid silent hangs in BullMQ
});

// Handle Redis connection errors
connection.on("error", (err) => {
  console.error("Redis connection error:", err);
});

// Ensure the connection is established
connection.on("ready", () => {
  console.log("Redis connection ready (bull.js)");
});

// Factory function for clean queue creation by name
export function createQueue(name) {
  return new Queue(name, {
    connection,
    defaultJobOptions: {
      attempts: 3,
      backoff: { type: "exponential", delay: 1000 },
    },
  });
}

export { connection };
