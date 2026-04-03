const successHandler = (req, res, next) => {
  res.success = (statusCode = 200, message = "Success", data) => {
    res.status(statusCode).json({
      status: "success",
      message,
      data,
    });
  };
  next();
};

export default successHandler;
