import { Router } from "express";
import { PatientController } from "../controllers/patient.controller";
import { makePatientUseCases } from "@infra/factories/patient.factory";

const patientRouter = Router();
const controller = new PatientController(makePatientUseCases());

patientRouter.post("/patients", controller.create.bind(controller));
patientRouter.get("/patients", controller.getAll.bind(controller));
patientRouter.get("/patients/:id", controller.getById.bind(controller));
patientRouter.put("/patients/:id", controller.update.bind(controller));
patientRouter.delete("/patients/:id", controller.delete.bind(controller));

export { patientRouter };
