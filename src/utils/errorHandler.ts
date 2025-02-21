import { NextFunction, Request, Response } from 'express';
import { AppError } from './appResponse';
import logger from './logger';

const errorHandler = (err: AppError, req: Request, res: Response, _next: NextFunction) => {
  err.statusCode = err.statusCode || 500;

  logger.error(`${err.statusCode} :${req.path}-${err.message}`);
  res.setHeader('Content-Type', 'application/json'); // 確保回傳 JSON
  if (process.env.NODE_ENV === 'dev') {
    return res.status(err.statusCode).json({
      message: err.message,
      error: err,
      stack: err.stack,
    });
  } else {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  }
};

export default errorHandler;
