import { protect } from "../../../src/middlewares/protect.js";
import jwt from "jsonwebtoken";

jest.mock("jsonwebtoken"); // Mock jwt for full control

const next = jest.fn();

const res = {
  status: jest.fn(() => res),
  json: jest.fn(),
};

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Protect Middleware", () => {
  it("should return 401 if no token is provided", () => {
    const req = { cookies: {} };

    protect(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: "Authentication required" });
    expect(next).not.toHaveBeenCalled();
  });

  it("should return 401 if token is invalid", () => {
    const req = { cookies: { jwt: "invalid.token.here" } };
    jwt.verify.mockImplementation(() => {
      throw new Error("Invalid token");
    });

    protect(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: "Invalid or expired token" });
    expect(next).not.toHaveBeenCalled();
  });

  it("should call next and populate req.user if token is valid", () => {
    const req = { cookies: { jwt: "valid.token.here" } };
    jwt.verify.mockReturnValue({ id: 1, role: "manager" });

    protect(req, res, next);

    expect(req.user).toEqual({ id: 1, role: "manager" });
    expect(next).toHaveBeenCalled();
  });
});
