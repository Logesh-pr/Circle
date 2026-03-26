import bcryptjs from "bcryptjs";

export const generateHash = async (token) => {
  return bcryptjs.hash(token, 12);
};

export const verifyHash = async (token, hashed) => {
  return await bcryptjs.compare(token, hashed);
};
