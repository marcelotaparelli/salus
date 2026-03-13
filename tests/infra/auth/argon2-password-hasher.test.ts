import { Argon2PasswordHasher } from "@infra/auth/argon2-password-hasher";

describe("Argon2PasswordHasher", () => {
  let hasher: Argon2PasswordHasher;

  beforeEach(() => {
    hasher = new Argon2PasswordHasher();
  });

  it("deve retornar um hash diferente da senha original", async () => {
    const hash = await hasher.hash("senha123");
    expect(hash).not.toBe("senha123");
  });

  it("deve retornar true quando a senha bate com o hash", async () => {
    const hash = await hasher.hash("senha123");
    const result = await hasher.verify(hash, "senha123");
    expect(result).toBe(true);
  });

  it("deve retornar false quando a senha não bate com o hash", async () => {
    const hash = await hasher.hash("senha123");
    const result = await hasher.verify(hash, "senha-errada");
    expect(result).toBe(false);
  });
});
