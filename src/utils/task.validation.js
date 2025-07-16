export function validateTaskInput({ summary, performedAt }) {
  const errors = {};

  if (!summary || typeof summary !== "string" || summary.length > 2500) {
    errors.summary = "Invalid summary";
  }
  if (!performedAt || isNaN(Date.parse(performedAt))) {
    errors.performedAt =
      "performedAt date should be in format YYYY-MM-DD HH:MM:SS";
  }

  return Object.keys(errors).length ? errors : null;
}

export function validateTaskUpdateInput({ summary }) {
  const errors = {};

  if (!summary || typeof summary !== "string" || summary.length > 2500) {
    errors.summary = "Invalid summary";
  }
  return Object.keys(errors).length ? errors : null;
}
