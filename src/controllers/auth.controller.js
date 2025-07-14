import { createUser } from "../services/auth.service";
//import jwt
//import env

export async function signup(req, res) {
  try {
    const user = await createUser(req.body);

    return res.status(201).json({
      ...user, //safer user fields
      message: "Signup successful",
    });
  } catch (error) {
    next(error);
  }

  //check if email exists
  //validate role
  // hash password
  //create user
  //return user details
  //catch block pass to error middleware
}

export function login(req, res) {
  //Later : Async login function
  //find user
  //verify password
  //generate jwt
  //set jwt cookie
  //success response
  //catch block pass to error middleware

  const { email, password } = req.body;

  //Simulated token (hardcoded for demonstration purposes)
  const fakeToken = "mock.jwt.token";

  res
    .cookie("jwt", fakeToken, {
      httpOnly: true,
      secure: false, // Set to true in production with HTTPS
      sameSite: "strict", // Prevents CSRF attacks
      maxAge: 15 * 60 * 1000, // expires in 15 minutes
    })
    .status(200)
    .json({
      message: "Login successful (mocked)",
      token: fakeToken, // In a real application, we would return a JWT or session ID
    });
}
