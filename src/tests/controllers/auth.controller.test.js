import request from "supertest";
import app from "../../app.js";

describe("Auth Controller (Mocked)", () => {
  describe("POST /api/v1/auth/signup", () => {
    const baseUser = {
      name: "Jane",
      email: "jane@example.com",
      password: "secure123",
      role: "technician",
    };

    it("should return 201 and user info on first signup", async () => {
      const res = await request(app).post("/api/v1/auth/signup").send(baseUser);

      expect(res.statusCode).toBe(201);
      expect(res.body).toMatchObject({
        name: baseUser.name,
        email: baseUser.email,
        role: baseUser.role,
        message: "Signup successful",
      });
    });

    it("should return 409 on duplicate signup", async () => {
      const res = await request(app).post("/api/v1/auth/signup").send(baseUser);

      expect(res.statusCode).toBe(409);
      expect(res.body).toEqual({ error: "Email already exists" });
    });

    if (
      ("should return 400 if required fields are missing",
      async () => {
        const res = await request(app)
          .post("/api/v1/auth/signup")
          .send({ email: "only@email.com" });

        expect(res.statusCode).toBe(400);
        expect(res.body.error).toMatch(/Missing required field/);
      })
    );
  });

  describe("POST /api/v1/auth/login", () => {
    const validUser = {
      email: "jane@example.com",
      password: "secure123",
    };

    it("should return 200 and set cookie for valid login", async () => {
      const res = await request(app).post("/api/v1/auth/login").send(validUser);

      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual({ message: "Login successful" });
      expect(res.headers["set-cookie"]).toBeDefined();
    });

    it("should return 401 for incorrect password", async () => {
      const res = await request(app)
        .post("/api/v1/auth/login")
        .send({ email: validUser.email, password: "wrongpassword" });

      expect(res.statusCode).toBe(401);
      expect(res.body).toEqual({ error: "Invalid email or password" });
    });

    it("should return 401 for non-existent email", async () => {
      const res = await request(app)
        .post("/api/v1/auth/login")
        .send({ email: "ghost@example.com", password: "whatever" });

      expect(res.statusCode).toBe(401);
      expect(res.body).toEqual({ error: "Invalid email or password" });
    });
  });
});
