import { Router } from "express";
import { signup, login } from "../controllers/auth.controller.js";
import { validateBody } from "../middlewares/validateBody.js";
import { protect } from "../middlewares/protect.js";

const router = Router();

router.post(
  "/signup",
  validateBody(["name", "email", "password", "role"]),
  signup
);

router.post("/login", validateBody(["email", "password"]), login);

router.get("/profile", protect, (req, res) => {
  res.status(200).json({
    id: req.user.id,
    role: req.user.role,
  });
});

export default router;
