import { ApplicationErrorCategory } from "@application/shared/errors/application-error-category.enum";

const httpStatusMap: Record<ApplicationErrorCategory, number> = {
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
};

export function mapApplicationErrorToHttp(
  category: ApplicationErrorCategory,
): number {
  return httpStatusMap[category] || 500;
}
