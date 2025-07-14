//import hashPassword and comparePassword from utils later
//import jwt
//import env

//import mysql2 connection
//async findUserByemail
//simulate query
//async createUser
//simulate query with mock response

export function signup(req, res) {
  //Later: Async signup function
  //check if email exists
  //validate role
  // hash password
  //create user
  //return user details
  //catch block pass to error middleware

  const { name, email, password, role } = req.body;

  //Simulate response
  return res.status(201).json({
    id: 1,
    name,
    email,
    role,
    message: "Signup successful (mocked)",
  });
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
