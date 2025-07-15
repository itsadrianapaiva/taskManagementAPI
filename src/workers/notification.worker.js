import { Worker } from "bullmq";
import { env } from "../config/env.js";

const connection = {
  host: env.redis.host,
  port: env.redis.port,
};

// Creates a worker that listen to jobs on the "manager_notifications" queue
// Print a simple message as notification
const notificationWorker = new Worker(
  "manager_notifications",
  async (job) => {
    console.log(
      `🔔 Notification: Technician ID ${job.data.techId} performed or updated Task ID ${job.data.taskId} on date ${job.data.date}.`
    );
  },
  { connection }
);

// Logs for monitoring or debugging purposes
notificationWorker.on("completed", (job) => {
  console.log(`✅ Job completed: ${job.id}`);
});

notificationWorker.on("failed", (job, err) => {
  console.error(`❌ Job failed: ${job.id} with error ${err.message}`);
});
