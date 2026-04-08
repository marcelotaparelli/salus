import { InMemoryUserRepository } from "../database/in-memory/user/user.repository";
import { User } from "@domain/user/entities/user.entity";
import { JwtTokenGenerator } from "@infra/auth/jwt-token-generator";
import { verify } from "jsonwebtoken";

describe("JwtTokenGenerator", () => {
  const tokenGenerator = new JwtTokenGenerator();
  const repo = new InMemoryUserRepository();
  let user: User | null;

  beforeEach(async () => {
    await repo.save(
      User.create({
        name: "José Silva",
        email: "josesilva@email.com",
        passwordHash: "hashed_password",
      }),
    );

    user = await repo.findByEmail("josesilva@email.com");
  });

  it("deve gerar um token válido", () => {
    if (!user) throw new Error("Usuário não encontrado");
    const token = tokenGenerator.generate({
      userId: user.id,
      email: user.email.value,
    });
    const payload = verify(token, "secret-de-teste-para-ambiente-de-teste") as {
      userId: string;
      email: string;
    };
    expect(payload.userId).toBe(user.id);
    expect(payload.email).toBe(user.email.value);
  });
});
