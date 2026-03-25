import request from "supertest";
import { app } from "@presentation/http/server";

describe("Server", () => {
  it("Deve retornar 'Hello, world!' ao acessar '/'", async () => {
    const response = await request(app).get("/");

    expect(response.status).toBe(200);
    expect(response.text).toBe("Hello, world!");
  });
});
