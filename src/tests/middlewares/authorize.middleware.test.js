import { authorize } from "../../../src/middlewares/authorize.js";

const next = jest.fn();

const res = {
  status: jest.fn(() => res),
  json: jest.fn(),
};

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Authorize Middleware", () => {
  it("should return 403 if user role is not authorized", () => {
    const req = { user: { role: "technician" } };
    const middleware = authorize("manager");

    middleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({ error: "Access denied" });
    expect(next).not.toHaveBeenCalled();
  });

  it("should call next if user role is authorized", () => {
    const req = { user: { role: "manager" } };
    const middleware = authorize("manager");

    middleware(req, res, next);

    expect(next).toHaveBeenCalled();
  });
});
