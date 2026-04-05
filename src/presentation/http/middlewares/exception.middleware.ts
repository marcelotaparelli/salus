import { Request, Response, NextFunction } from "express";
import { DomainError } from "@domain/shared/errors/domain-error";
import { ApplicationError } from "@application/shared/errors/application-error";
import { mapDomainErrorToHttp } from "@presentation/http/utils/domain-error.mapper";
import { mapApplicationErrorToHttp } from "@presentation/http/utils/application-error.mapper";

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

  if (err instanceof ApplicationError) {
    const statusCode = mapApplicationErrorToHttp(err.category);

    return res.status(statusCode).json({
      name: err.name,
      category: err.category,
      message: err.message,
    });
  }

  if (err instanceof Error) {
    return res.json({
      message: err.message,
    });
  }

  return res.status(500).json({
    message: "Internal Server Error",
  });
}
