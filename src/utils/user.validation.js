export function validateSignupInput({ name, email, password, role }) {
  if (!name || typeof name !== "string") return "Invalid name";
  if (!email) return "Required valid email";
  if (!password || password.length < 8) return "Password must be 8+ characters";
  if (!["manager", "technician"].includes(role)) return "Invalid role";
  return null;
}

export function validateLoginInput({ email, password }) {
  if (!email || typeof email !== "string") return "Invalid email";
  if (!password || typeof password !== "string") return "Invalid password";
  return null;
}
