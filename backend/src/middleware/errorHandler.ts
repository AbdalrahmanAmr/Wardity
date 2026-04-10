import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";

export interface ApiError extends Error {
  code?: number | string;
  statusCode?: number;
  status?: number;
  details?: Record<string, string[]>;
}

function resolveHttpStatus(err: ApiError): number {
  if (typeof err.statusCode === "number" && err.statusCode >= 100 && err.statusCode < 600) {
    return err.statusCode;
  }
  if (typeof err.status === "number" && err.status >= 100 && err.status < 600) {
    return err.status;
  }
  if (typeof err.code === "number" && err.code >= 100 && err.code < 600) {
    return err.code;
  }
  return 500;
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

  const code = resolveHttpStatus(err);
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
