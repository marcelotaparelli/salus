import { Router } from "express";
import { UserController } from "@presentation/http/controllers/user.controller";
import { makeUserUseCases } from "@infra/factories/user.factory";

const userRouter = Router();
const controller = new UserController(makeUserUseCases());

userRouter.post("/users/register", controller.register.bind(controller));
userRouter.post("/users/login", controller.login.bind(controller));

export { userRouter };
