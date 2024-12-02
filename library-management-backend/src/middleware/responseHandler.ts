import { Request, Response, NextFunction } from 'express';
import { ApiResponse } from '../interfaces/ApiResponse';

declare global {
  namespace Express {
    interface Response {
      success: <T>(message: string, data: T, statusCode?: number) => void;
      error: (message: string, statusCode?: number) => void;
    }
  }
}

export const responseHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.success = function <T>(message: string, data: T, statusCode: number = 200) {
    const response: ApiResponse<T> = {
      success: true,
      status: statusCode,
      message,
      data
    };
    return this.status(statusCode).json(response);
  };

  res.error = function (message: string, statusCode: number = 500) {
    const response: ApiResponse<null> = {
      success: false,
      status: statusCode,
      message,
      data: null
    };
    return this.status(statusCode).json(response);
  };

  next();
}; 