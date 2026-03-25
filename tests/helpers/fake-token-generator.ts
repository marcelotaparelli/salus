import { TokenGenerator } from "@domain/auth/services/token-generator";

export class FakeTokenGenerator implements TokenGenerator {
  generate(): string {
    return "fake-token";
  }
}
