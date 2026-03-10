import request from "supertest";
import { app } from "@infra/http/server";
import { prisma } from "@infra/database/prisma/client";

const TEST_CPF = "933.444.130-58";

let createdPatientId: string;

beforeAll(async () => {
  await prisma.patient.deleteMany({ where: { cpf: TEST_CPF } });
});

afterAll(async () => {
  await prisma.patient.deleteMany({ where: { cpf: TEST_CPF } });
  await prisma.$disconnect();
});

describe("Patient Routes", () => {
  it("POST /patients deve criar um paciente e retornar 201", async () => {
    const response = await request(app)
      .post("/patients")
      .send({
        name: "José Silva",
        cpf: TEST_CPF,
        phone: "1199999999",
        birthDate: "2000-01-01",
      })
      .set("Accept", "application/json");

    expect(response.status).toBe(201);
    expect(response.body.id).toBeDefined();
    expect(response.body.name).toBe("José Silva");

    createdPatientId = response.body.id;
  });

  it("GET /patients deve retornar array com ao menos um paciente", async () => {
    const response = await request(app).get("/patients");
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.length).toBeGreaterThanOrEqual(1);
  });

  it("GET /patients/:id deve retornar o paciente criado", async () => {
    const response = await request(app).get(`/patients/${createdPatientId}`);
    expect(response.status).toBe(200);
    expect(response.body.name).toBe("José Silva");
  });

  it("GET /patients/:id deve retornar 404 para id inexistente", async () => {
    const response = await request(app).get("/patients/id-inexistente");
    expect(response.status).toBe(404);
  });

  it("PUT /patients/:id deve atualizar e retornar 200", async () => {
    const response = await request(app)
      .put(`/patients/${createdPatientId}`)
      .send({
        name: "Marcelo Silva",
        cpf: TEST_CPF,
        phone: "1199999999",
        birthDate: "2000-01-01",
      })
      .set("Accept", "application/json");

    expect(response.status).toBe(200);
  });

  it("PUT /patients/:id deve retornar 404 para id inexistente", async () => {
    const response = await request(app)
      .put("/patients/id-inexistente")
      .send({
        name: "Marcelo Silva",
        cpf: TEST_CPF,
        phone: "1199999999",
        birthDate: "2000-01-01",
      })
      .set("Accept", "application/json");

    expect(response.status).toBe(404);
  });

  it("DELETE /patients/:id deve retornar 200 ao deletar", async () => {
    const response = await request(app).delete(`/patients/${createdPatientId}`);
    expect(response.status).toBe(200);
  });

  it("DELETE /patients/:id deve retornar 404 para id inexistente", async () => {
    const response = await request(app).delete("/patients/id-inexistente");
    expect(response.status).toBe(404);
  });
});
