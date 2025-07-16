export function validateSignupInput({ name, email, password, role }) {
  const errors = {};

  if (!name || typeof name !== "string") errors.name = "Invalid name";
  if (!email) errors.email = "Invalid email";
  if (!password || password.length < 8)
    errors.password = "Password must be 8+ characters";
  if (!["manager", "technician"].includes(role)) errors.role = "Invalid role";

  return Object.keys(errors).length ? errors : null;
}

export function validateLoginInput({ email, password }) {
  const errors = {};

  if (!email || typeof email !== "string") errors.email = "Invalid email";
  if (!password || typeof password !== "string") errors.password = "Invalid password";

  return Object.keys(errors).length ? errors : null;
}
