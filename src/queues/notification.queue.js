import { createQueue } from "./bull.js";

// First-class citizen
export const notificationQueue = createQueue("manager_notifications");