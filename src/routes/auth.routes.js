import { Router } from "express";
import { signup, login } from "../controllers/auth.controller.js";
import { validateBody } from "../middlewares/validateBody.js";

const router = Router();

router.post(
  "/signup",
  validateBody(["name", "email", "password", "role"]),
  signup
);
router.post("/login", validateBody(["email", "password"]), login);

export default router;
