import { Worker } from "bullmq";
import { connection } from "../queues/bull.js";

// Creates a worker that listen to jobs on the "manager_notifications" queue
// Print a simple message as notification
const notificationWorker = new Worker(
  "manager_notifications",
  async (job) => {
    console.log(
      `🔔 Notification: Technician ID ${job.data.techId} performed or updated Task ID ${job.data.taskId} on date ${job.data.date}.`
    );
  },
  {
    connection,
    concurrency: 5,
    limiter: { max: 100, duration: 60000 },
  }
);

// Logs for monitoring or debugging
notificationWorker.on("completed", (job) => {
  console.log(`✅ Job completed: ${job.id}`);
});

notificationWorker.on("failed", (job, err) => {
  console.error(`❌ Job failed: ${job.id} with error ${err.message}`);
});

// Catches Redis or BullMQ connection errors
notificationWorker.on("error", (err) => {
  console.error(`❌ Worker error: ${err.message}`);
});

//Confirmation log
console.log('Worker started for "manager_notifications" queue');
