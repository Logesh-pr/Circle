import { checkSchema } from "express-validator";

export const usernameValidation = checkSchema({
  username: {
    isString: true,
    notEmpty: {
      errorMessage: "username is required",
    },
    trim: true,
    isLength: {
      options: { min: 5, max: 15 },
      errorMessage: "username must be 5 t0 15 characters only allowed",
    },
  },
});

export const signupValidation = checkSchema({
  email: {
    isEmail: {
      errorMessage: "Invalid email",
    },
    normalizeEmail: true,
  },
  password: {
    notEmpty: {
      errorMessage: "Please enter the password field",
    },
    isString: {
      errorMessage: "Password must be a string",
    },
    isLength: {
      options: { min: 6 },
      errorMessage: "Password must be alteast 6 characters",
    },
  },
});
