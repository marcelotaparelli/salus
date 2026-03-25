import request from "supertest";
import { app } from "@presentation/http/server";
import { prisma } from "@infra/database/prisma/client";

beforeAll(async () => {
  await prisma.user.deleteMany({ where: { email: "jose@email.com" } });
});

afterAll(async () => {
  await prisma.user.deleteMany({ where: { email: "jose@email.com" } });
  await prisma.$disconnect();
});

describe("UserRoutes", () => {
  it("POST /users/register deve registar um novo usuário com sucesso e retornar os dados", async () => {
    const response = await request(app)
      .post("/users/register")
      .send({
        name: "josé",
        email: "jose@email.com",
        password: "password",
      })
      .set("Accept", "application/json");
    console.log(response.status, response.text);
    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.status).toEqual(201);
    expect(response.body.id).toBeDefined();
    expect(response.body.name).toBe("josé");
    expect(response.body.email).toBe("jose@email.com");
  });

  it("POST /users/login deve autenticar email e senha e retornar token", async () => {
    const response = await request(app)
      .post("/users/login")
      .send({
        email: "jose@email.com",
        password: "password",
      })
      .set("Accept", "application/json");
    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.status).toEqual(200);
    expect(response.body.token).toBeDefined();
  });
});
