import { makeUserUseCases } from "@infra/factories/user.factory";
import { Request, Response, NextFunction } from "express";

export class UserController {
  constructor(private useCases: ReturnType<typeof makeUserUseCases>) {}

  async register(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const response = await this.useCases.registerUseCase.execute({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      });

      res.status(201).json(response);
    } catch (error) {
      next(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const response = await this.useCases.loginUseCase.execute({
        email: req.body.email,
        password: req.body.password,
      });
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }
}
