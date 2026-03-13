import { PasswordHasher } from "@domain/auth/password-hasher";
import * as argon2 from "argon2";
import { env } from "@config/env";

export class Argon2PasswordHasher implements PasswordHasher {
  private readonly pepper: string;

  constructor() {
    const pepper: string | undefined = env.ARGON2_PEPPER;
    if (!pepper) throw new Error("ARGON2_PEPPER is not defined");
    this.pepper = pepper;
  }

  async hash(password: string): Promise<string> {
    password += this.pepper;
    return await argon2.hash(password);
  }

  async verify(hash: string, password: string): Promise<boolean> {
    password += this.pepper;
    return await argon2.verify(hash, password);
  }
}
