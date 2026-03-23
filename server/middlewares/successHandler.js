const successHandler = (req, res, next) => {
  res.success = (data, message = "Success", statusCode = 200) => {
    res.status(statusCode).json({
      status: "success",
      message,
      data,
    });
  };
  next();
};

export default successHandler;
