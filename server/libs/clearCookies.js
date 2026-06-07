import "dotenv/config.js";

const isProduction = process.env.NODE_ENV === "production";

const clearCookies = (res) => {
  const options = {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "None" : "Lax",
    path: "/",
  };

  res.clearCookie("accessToken", options);
  res.clearCookie("refreshToken", options);
};

export default clearCookies;
