import { makePatientUseCases } from "@infra/factories/patient.factory";
import { Request, Response, NextFunction } from "express";
import { Patient } from "@domain/patient/patient.entity";

export class PatientController {
  constructor(private useCases: ReturnType<typeof makePatientUseCases>) {}

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await this.useCases.createUseCase.execute({
        name: req.body.name,
        cpf: req.body.cpf,
        phone: req.body.phone,
        birthDate: new Date(req.body.birthDate),
      });
      res.status(201).json(response);
    } catch (error) {
      next(error);
    }
  }

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await this.useCases.listUseCase.execute();
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params["id"] as string;
      const response = await this.useCases.getUseCase.execute(id);
      if (!response)
        return res.status(404).json({ message: "Paciente não encontrado" });
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params["id"] as string;
      const updatedPatient = new Patient(
        id,
        req.body.name,
        req.body.cpf,
        req.body.phone,
        new Date(req.body.birthDate),
      );
      const response =
        await this.useCases.updateUseCase.execute(updatedPatient);
      res.status(200).json(response);
    } catch (error) {
      if (error instanceof Error && error.message === "Paciente não encontrado")
        return res.status(404).json({ message: error.message });
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params["id"] as string;
      await this.useCases.deleteUseCase.execute(id);
      res.status(200).json({ message: "Paciente removido com sucesso" });
    } catch (error) {
      if (error instanceof Error && error.message === "Paciente não encontrado")
        throw res.status(404).json({ message: error.message });
      next(error);
    }
  }
}
