import request from "supertest";
import { app } from "@presentation/http/server";
import { prisma } from "@infra/database/prisma/client";

let token: string;

beforeAll(async () => {
  await request(app)
    .post("/users/register")
    .send({
      name: "carlos",
      email: "carlos@email.com",
      password: "password",
    })
    .set("Accept", "application/json");

  const loginResponse = await request(app)
    .post("/users/login")
    .send({
      email: "carlos@email.com",
      password: "password",
    })
    .set("Accept", "application/json");

  token = loginResponse.body.token;
});

afterAll(async () => {
  await prisma.user.deleteMany({ where: { email: "carlos@email.com" } });
});

describe("authMiddleware", () => {
  it("Requisição sem token deve retonar 401", async () => {
    const response = await request(app).get("/patients");
    expect(response.status).toEqual(401);
  });

  it("Requisição com token inválido deve retornar 401", async () => {
    const response = await request(app)
      .get("/patients")
      .set("Authorization", "Bearer false-token");
    expect(response.status).toEqual(401);
  });

  it("Requisição com token válido deve retornar 200", async () => {
    const response = await request(app)
      .get("/patients")
      .set("Authorization", "Bearer " + token);
    expect(response.status).toEqual(200);
  });
});
