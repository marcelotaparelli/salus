import { RefreshToken } from "@domain/auth/entities/refresh-token.entity";

export interface RefreshTokenRepository {
  create(token: RefreshToken): Promise<RefreshToken>;
  findByToken(token: string): Promise<RefreshToken | null>;
  invalidate(token: string): Promise<void>;
}
