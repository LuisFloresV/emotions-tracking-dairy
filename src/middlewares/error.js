const HTTP_STATUS = require('http-status');
const { UniqueViolationError } = require('objection');
const { nodeEnv } = require('../util/env');
const AppError = require('../util/appError');

const handleUniqueFieldError = (error) => {
  const message = `Duplicate field value for colums: ${error.columns}`;
  return new AppError(message, 400);
};

const sendErrorDev = (err, res) => res.status(err.statusCode).json({
  status: err.status,
  error: err,
  message: err.message,
  stack: err.stack,
});

const sendErrorProd = (err, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    // 1) TO-DO Log error

    // 2) Send generic message
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      status: 'error',
      message: 'Something went wrong :(',
    });
  }
};

module.exports = (err, req, res, next) => {
  let error = err;
  error.statusCode = err.statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR;
  error.status = err.status || 'error';

  if (error instanceof UniqueViolationError) {
    error = handleUniqueFieldError(error);
  }

  if (nodeEnv === 'development') {
    sendErrorDev(error, res);
  } else if (nodeEnv === 'production') {
    sendErrorProd(error, res);
  }
};
