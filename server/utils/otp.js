import crypto from "crypto";
import bcryptjs from "bcryptjs";

export const generateOTP = () => {
  return crypto.randomInt(100000, 999999).toString();
};

export const hashOTP = async (otp) => {
  return await bcryptjs.hash(otp, 12);
};

export const verifyHashedOTP = async (otp, hashedOTP) => {
  return await bcryptjs.compare(otp, hashedOTP);
};
