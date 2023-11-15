const AppError = require("../utils/appError");

const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}.`;
  return new AppError(message, 400);
};

const sendError = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  let errorDeepCopy = JSON.parse(JSON.stringify(err));

  if (errorDeepCopy.name == "CastError") {
    errorDeepCopy = handleCastErrorDB(errorDeepCopy);
  }
  sendError(errorDeepCopy, res);
};
