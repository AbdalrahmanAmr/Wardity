import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";

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
  if (err instanceof ZodError) {
    const fieldErrors: Record<string, string[]> = {};
    for (const issue of err.issues) {
      const key = issue.path.join(".") || "_root";
      if (!fieldErrors[key]) fieldErrors[key] = [];
      fieldErrors[key].push(issue.message);
    }

    res.status(400).json({
      message: "Validation failed",
      errors: fieldErrors,
      status: 400,
    });
    return;
  }

  const code = err.code && err.code >= 100 && err.code < 600 ? err.code : 500;
  const message = err.message || "Internal server error";

  if (code >= 500) {
    console.error("Error:", err);
  }

  res.status(code).json({
    message,
    errors: err.details,
    status: code,
  });
}
