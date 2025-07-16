import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { env } from "../config/env.js";
import { createUser, getUserByEmail } from "../services/auth.service.js";
import { AppError } from "../utils/appError.js";
import {
  validateSignupInput,
  validateLoginInput,
} from "../utils/user.validation.js";

export async function signup(req, res, next) {
  try {
    const error = validateSignupInput(req.body);
    if (error) {
      return res.status(400).json({ error });
    }

    const user = await createUser(req.body);

    return res.status(201).json({
      ...user, 
      message: "Signup successful",
    });
  } catch (error) {
    console.error("Signup error:", error);
    next(error);
  }
}

export async function login(req, res, next) {
  try {
    const error = validateLoginInput(req.body);
    if (error) {
      return res.status(400).json({ error });
    }
    const { email, password } = req.body;

    const user = await getUserByEmail(email);
    if (!user) {
      throw new AppError("Invalid email", 401);
    }

    const passwordMatch = await bcrypt.compare(password, user.passwordHash);
    if (!passwordMatch) {
      throw new AppError("Invalid password", 401);
    }

    const payload = {
      id: user.id,
      role: user.role,
    };

    const token = jwt.sign(payload, env.jwt.secret, {
      expiresIn: env.jwt.expiresIn,
    });

    res
      .cookie("jwt", token, {
        httpOnly: true,
        secure: false, // Set to true in production with HTTPS
        sameSite: "strict",
        maxAge: 15 * 60 * 1000,
      })
      .status(200)
      .json({
        message: "Login successful",
      });
  } catch (error) {
    next(error);
  }
}
