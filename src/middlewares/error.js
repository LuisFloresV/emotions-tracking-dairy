/* eslint-disable no-param-reassign */
const HTTP_STATUS = require('http-status');
const { UniqueViolationError, ValidationError } = require('objection');
const { nodeEnv } = require('../util/env');
const AppError = require('../util/appError');

const handleUniqueFieldError = (error) => {
  const message = `Duplicate field value for colums: ${error.columns}`;
  return new AppError(message, 400);
};

const handleValidationError = (error) => {
  const message = `${error.message}`;
  return new AppError(message, 400);
};

const sendErrorDev = (err, res) => res.status(err.statusCode).json({
  status: err.status,
  error: err,
  message: err.message,
  stack: err.stack,
});

const sendErrorTest = (err, res) => res.status(err.statusCode).json({
  status: err.status,
  error: err,
  message: err.message,
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

// eslint-disable-next-line no-unused-vars
module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR;
  err.status = err.status || 'error';

  if (err instanceof UniqueViolationError) {
    err = handleUniqueFieldError(err);
  }
  if (err instanceof ValidationError) {
    err = handleValidationError(err);
  }

  if (nodeEnv === 'development') {
    sendErrorDev(err, res);
  } else if (nodeEnv === 'test') {
    sendErrorTest(err, res);
  } else if (nodeEnv === 'production') {
    sendErrorProd(err, res);
  }
};
