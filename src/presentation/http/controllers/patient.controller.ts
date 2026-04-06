import { makePatientUseCases } from "@infra/factories/patient.factory";
import { Request, Response, NextFunction } from "express";

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
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const updatedPatient = {
        id: req.params["id"] as string,
        name: req.body.name,
        phone: req.body.phone,
        birthDate: req.body.birthDate,
      };

      const response =
        await this.useCases.updateUseCase.execute(updatedPatient);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params["id"] as string;
      await this.useCases.deleteUseCase.execute(id);
      res.status(200).json({ message: "Paciente removido com sucesso" });
    } catch (error) {
      next(error);
    }
  }
}
