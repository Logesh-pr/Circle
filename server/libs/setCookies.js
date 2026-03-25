import "dotenv/config.js";

const isProduction = process.env.NODE_ENV === "production";
const sameSiteValue = isProduction ? "None" : "Lax";
const cookiesOptions = {
  secure: isProduction,
  sameSite: sameSiteValue,
  httpOnly: true,
  path: "/",
};

const setCookies = (res, accessToken, refreshToken) => {
  res.cookie("accessToken", accessToken, {
    ...cookiesOptions,
    maxAge: 15 * 60 * 1000,
  });

  res.cookie("refreshToken", refreshToken, {
    ...cookiesOptions,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
};

export default setCookies;
