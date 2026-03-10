import request from "supertest";
import { app } from "@infra/http/server";

describe("Rotas", () => {
  it("POST /patients deve criar um paciente e retornar 201", async () => {
    const response = await request(app)
      .post("/patients")
      .send({
        name: "José Silva",
        cpf: "933.444.130-58",
        phone: "1199999999",
        birthDate: "2000-01-01",
      })
      .set("Accept", "application/json");

    expect(response.status).toBe(201);
    expect(response.body.id).toBeDefined();
    expect(response.body.name).toBe("José Silva");
  });

  it("GET /patients deve retornar todos os pacientes ou array vazio", async () => {
    const response = await request(app).get("/patients");
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  it("GET /patients/:id deve retornar um paciente específico", async () => {
    const patients = await request(app).get("/patients");
    const id = patients.body[0].id;
    const response = await request(app).get(`/patients/${id}`);
    expect(response.status).toBe(200);
    expect(response.body.name).toBe("José Silva");
  });

  it("GET /patients:id deve retornar 404 quando não achar paciente específico", async () => {
    const response = await request(app).get("/patients/id-inexistente");
    expect(response.status).toBe(404);
  });

  it("PUT /patients/:id deve retornar 200 atualizar um paciente", async () => {
    const patients = await request(app).get("/patients");
    const id = patients.body[0].id;
    const response = await request(app)
      .put(`/patients/${id}`)
      .send({
        name: "Marcelo Silva",
        cpf: "933.444.130-58",
        phone: "1199999999",
        birthDate: "2000-01-01",
      })
      .set("Accept", "application/json");

    expect(response.status).toBe(200);
  });

  it("PUT /patients:id deve retornar 404 quando não achar paciente específico", async () => {
    const response = await request(app)
      .put("/patients/id-inexistente")
      .send({
        name: "Marcelo Silva",
        cpf: "933.444.130-58",
        phone: "1199999999",
        birthDate: "2000-01-01",
      })
      .set("Accept", "application/json");

    expect(response.status).toBe(404);
  });

  it("DELETE /patients/:id deve retornar 200 ao deletar um paciente", async () => {
    const patients = await request(app).get("/patients");
    const id = patients.body[0].id;
    const response = await request(app).delete(`/patients/${id}`);

    expect(response.status).toBe(200);
  });

  it("DELETE /patients/:id deve retornar 404 quando não encontrar paciente", async () => {
    const reponse = await request(app).delete("/patients/id-inexistente");

    expect(reponse.status).toBe(404);
  });
});
