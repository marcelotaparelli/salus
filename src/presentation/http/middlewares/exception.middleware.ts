import { Request, Response, NextFunction } from "express";
import { AppError } from "@shared/errors/app-error";
import { DomainError } from "@domain/shared/errors/domain-error";
import { mapDomainErrorToHttp } from "@presentation/http/utils/domain-error.mapper";

export function exceptionMiddleware(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  if (err instanceof DomainError) {
    const statusCode = mapDomainErrorToHttp(err.category);

    return res.status(statusCode).json({
      name: err.name,
      category: err.category,
      message: err.message,
    });
  }

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      message: err.message,
    });
  }

  console.error(`[InternalServerError]: ${err.message}`, err.stack);

  return res.status(500).json({
    message: "Internal Server Error",
  });
}
