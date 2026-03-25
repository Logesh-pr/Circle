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
      errorMessage: "Password is required",
    },
    isLength: {
      options: { min: 6 },
      errorMessage: "Password must be alteast 6 characters",
    },
  },
});

export const resendOTPValidation = checkSchema({
  email: {
    isEmail: {
      errorMessage: "Invalid email",
    },
    normalizeEmail: true,
  },
});

export const verifyOTPValidation = checkSchema({
  email: {
    isEmail: {
      errorMessage: "Invalid email",
    },
    normalizeEmail: true,
  },
  otp: {
    matches: {
      options: [/^\d{6}$/],
      errorMessage: "OTP must be exactly 6 digits",
    },
    trim: true,
  },
});

export const loginValidation = checkSchema({
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
      errorMessage: "Password is required",
    },
    isLength: {
      options: { min: 6 },
      errorMessage: "Password must be alteast 6 characters",
    },
  },
});
