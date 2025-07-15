export function validateTaskInput({ summary, performedAt }) {
  if (!summary || typeof summary !== "string" || summary.length > 2500) {
    return "Invalid summary";
  }
  if (!performedAt || isNaN(Date.parse(performedAt))) {
    return "performedAt date should be in format YYYY-MM-DD HH:MM:SS";
  }

  return null;
}

export function validateTaskUpdateInput({ summary }) {
  if (!summary || typeof summary !== "string" || summary.length > 2500) {
    return "Invalid summary";
  }
  return null;
}
