import { checkSchema } from "express-validator";

export const postValidation = checkSchema({
  content: {
    isString: true,
    isLength: {
      options: { min: 5, max: 2000 },
      errorMessage: "content must be 5 t0 2000 characters only allowed",
    },
  },
});
