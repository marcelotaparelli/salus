import { DomainErrorCategory } from "@domain/shared/errors/domain-error-category.enum";

const httpStatusMap: Record<DomainErrorCategory, number> = {
  VALIDATION: 400,
  BUSINESS_RULE: 422,
  CONFLICT: 409,
  NOT_FOUND: 404,
};

export function mapDomainErrorToHttp(category: DomainErrorCategory): number {
  return httpStatusMap[category] || 500;
}
