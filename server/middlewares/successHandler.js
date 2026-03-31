const successHandler = (req, res, next) => {
  res.success = (statusCode = 200, message = "Success", data, token) => {
    res.status(statusCode).json({
      status: "success",
      message,
      data,
      token,
    });
  };
  next();
};

export default successHandler;
