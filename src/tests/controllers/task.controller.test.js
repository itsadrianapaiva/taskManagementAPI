import request from "supertest";
import app from "../../app.js";

describe("Task Controller", () => {
  let technicianCookie;
  let managerCookie;

  beforeAll(async () => {
    //Login technician
    const technicianLogin = await request(app)
      .post("/api/v1/auth/login")
      .send({ email: "jane.tech@example.com", password: "password123" });
    technicianCookie = technicianLogin.headers["set-cookie"];

    //Login manager
    const managerLogin = await request(app)
      .post("/api/v1/auth/login")
      .send({ email: "john.manager@example.com", password: "password123" });
    managerCookie = managerLogin.headers["set-cookie"];
  });

  describe("POST /api/v1/tasks", () => {
    const baseTask = {
      summary: "Test task for E2E",
      performedAt: "2025-07-15 10:00:00",
    };

    it("should create a task as a technician", async () => {
      const res = await request(app)
        .post("/api/v1/tasks")
        .set("Cookie", technicianCookie)
        .send(baseTask);

      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty("taskId");
      expect(res.body.message).toBe("Task registered successfully");
    });
  });

  describe("GET /api/v1/tasks", () => {
    it("should fetch technician own tasks", async () => {
      const res = await request(app)
        .get("/api/v1/tasks")
        .set("Cookie", technicianCookie);

      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body[0]).toHaveProperty("id");
    });
  });

  describe("PATCH /api/v1/tasks/:id", () => {
    const updatedTask = {
      summary: "Updated test task for E2E",
    };

    it("should update a task as a technician", async () => {
      const getTasks = await request(app)
        .get("/api/v1/tasks")
        .set("Cookie", technicianCookie);

      const taskId = getTasks.body[0]?.id;
      expect(taskId).toBeDefined();

      const res = await request(app)
        .patch(`/api/v1/tasks/${taskId}`)
        .set("Cookie", technicianCookie)
        .send(updatedTask);

      expect(res.statusCode).toBe(200);
      expect(res.body.message).toBe("Task updated successfully");
    });
  });

  describe("DELETE /api/v1/tasks/:id", () => {
    it("should delete a task as a manager", async () => {
      const getTasks = await request(app)
        .get("/api/v1/tasks")
        .set("Cookie", managerCookie);

      const taskId = getTasks.body[0]?.id;
      expect(taskId).toBeDefined();

      const res = await request(app)
        .delete(`/api/v1/tasks/${taskId}`)
        .set("Cookie", managerCookie);

      expect(res.statusCode).toBe(200);
      expect(res.body.message).toBe("Task deleted successfully");
    });
  });
});
