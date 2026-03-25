import { RefreshToken } from "@domain/auth/entities/refresh-token.entity";
import { RefreshTokenRepository } from "@domain/auth/repositories/refresh-token.repository";

export class InMemoryRefreshTokenRepository implements RefreshTokenRepository {
  private repo: Map<string, RefreshToken>;

  constructor() {
    this.repo = new Map<string, RefreshToken>();
  }

  create(refreshToken: RefreshToken): Promise<RefreshToken> {
    this.repo.set(refreshToken.token, refreshToken);
    return Promise.resolve(refreshToken);
  }

  findByToken(token: string): Promise<RefreshToken | null> {
    const tokenExists = this.repo.get(token);
    if (!tokenExists) return Promise.resolve(null);
    return Promise.resolve(tokenExists);
  }

  invalidate(token: string): Promise<void> {
    this.repo.delete(token);
    return Promise.resolve();
  }
}
