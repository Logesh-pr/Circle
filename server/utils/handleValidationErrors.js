import { validationResult } from "express-validator";
import AppError from "./AppError.js";

const handleValidationError = (req, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const message = errors
      .array()
      .map((e) => e.msg)
      .join(", ");

    next(new AppError(message, 400));
  }

  return null;
};

export default handleValidationError;
