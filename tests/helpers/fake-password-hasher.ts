import { PasswordHasher } from "@domain/auth/services/password-hasher";

export class FakePasswordHasher implements PasswordHasher {
  async hash(password: string): Promise<string> {
    return "hashed_" + password;
  }

  async verify(hash: string, password: string): Promise<boolean> {
    return hash === "hashed_" + password;
  }
}
