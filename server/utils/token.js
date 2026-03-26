import jwt from "jsonwebtoken";
import "dotenv/config.js";

export const generateAccessToken = (user) => {
  return jwt.sign(
    { sub: user._id, tokenVersion: user.tokenVersion },
    process.env.JWT_ACCESS_SECRET,
    {
      expiresIn: "15m",
    },
  );
};

export const generateRefreshToken = (sessionId, userId) => {
  return jwt.sign({ sessionId, userId }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: "7d",
  });
};

export const verifyAccessToken = (token) => {
  return jwt.verify(token, process.env.JWT_ACCESS_SECRET);
};

export const verifyRefreshToken = (token) => {
  return jwt.verify(token, process.env.JWT_REFRESH_SECRET);
};
