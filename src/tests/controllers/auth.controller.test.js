import request from 'supertest';
import app from '../../app.js';

describe("Auth Controller (Mocked)", () => {
  describe("POST /api/v1/auth/signup", () => {
    it("should return 201 and user info", async () => {
      const res = await request(app).post("/api/v1/auth/signup").send({
        name: "Jane",
        email: "jane@example",
        password: "secure123",
        role: "technician",
      });

      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty("name", "Jane");
      expect(res.body).toHaveProperty("email", "jane@example");
      expect(res.body).toHaveProperty("role", "technician");
    });
  });

  describe("POST /api/v1/auth/login", () => {
    it("should set JWT cookie and return 200", async () => {
      const res = await request(app).post("/api/v1/auth/login").send({
        email: "jane@example",
        password: "secure123",
      });

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("message", "Login successful (mocked)");
      expect(res.headers["set-cookie"]).toBeDefined();
    });
  });
});
