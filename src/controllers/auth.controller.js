import { createUser, getUserByEmail } from "../services/auth.service.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { env } from "../config/env.js";

export async function signup(req, res, next) {
  try {
    const user = await createUser(req.body);

    return res.status(201).json({
      ...user, //safer user fields
      message: "Signup successful",
    });
  } catch (error) {
    next(error);
  }
}

export async function login(req, res, next) {
  try {
    const { email, password } = req.body;

    const user = await getUserByEmail(email);
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const passwordMatch = await bcrypt.compare(password, user.passwordHash);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const payload = {
      id: user.id,
      role: user.role,
    };

    const token = jwt.sign(payload, env.jwtsecret, {
      expiresIn: env.jwtexpiresin,
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
