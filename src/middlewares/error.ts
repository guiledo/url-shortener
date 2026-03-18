import { Request, Response, NextFunction } from 'express';

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errorMessage = err.message || 'Unknown Error';
  console.error('CRITICAL ERROR:', errorMessage);

  res.status(500).json({
    status: 'error',
    message: errorMessage,
    error_detail: String(err)
  });
};
