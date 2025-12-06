import { Request, Response, NextFunction } from "express";

export interface ApiError extends Error {
  code?: number;
  details?: Record<string, string[]>;
}

export function errorHandler(
  err: ApiError,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  const code = err.code || 500;
  const message = err.message || "Internal server error";

  console.error("Error:", err);

  res.status(code).json({
    message,
    errors: err.details,
    status: code,
  });
}

