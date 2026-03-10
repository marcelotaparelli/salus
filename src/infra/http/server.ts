import express from "express";
import { Request, Response } from "express";
import { patientRouter } from "@infra/http/routes/patient.routes";

export const app = express();

app.use(express.json());
app.use(patientRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, world!");
});
