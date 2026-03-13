import { TokenGenerator } from "@domain/auth/token-generator";
import { sign } from "jsonwebtoken";
import { env } from "@config/env";

export class JwtTokenGenerator implements TokenGenerator {
  generate(data: { userId: string; email: string }): string {
    return sign(data, env.JWT_SECRET, { expiresIn: "7d" });
  }
}
