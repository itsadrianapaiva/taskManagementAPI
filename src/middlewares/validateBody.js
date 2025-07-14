export function validateBody(requiredFields = []) {
  return function (req, res, next) {
    const missing = requiredFields.filter((field) => !req.body?.[field]); 

    if (missing.length > 0) {
      return res.status(400).json({
        error: `Missing required fields: ${missing.join(", ")}`,
      });
    }

    next();
  };
}
