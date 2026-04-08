import { InMemoryUserRepository } from "./user.repository";
import { User } from "@domain/user/entities/user.entity";

describe("InMemoryUserRepository", () => {
  let repo: InMemoryUserRepository;
  let user: User;

  beforeEach(() => {
    repo = new InMemoryUserRepository();
    user = User.create({
      name: "João Silva",
      email: "joao@email.com",
      passwordHash: "hash-fake",
    });
  });

  it("save deve adicionar e encontrar um usuário em memória", async () => {
    await repo.save(user);
    const response = await repo.findByEmail("joao@email.com");
    expect(response).toEqual(user);
  });

  it("findByEmail deve retornar null quando não encontrar usuário", async () => {
    const response = await repo.findByEmail("naoexiste@email.com");
    expect(response).toBeNull();
  });
});
