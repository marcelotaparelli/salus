import express from "express";
import { Request, Response } from "express";
import { patientRouter } from "@presentation/http/routes/patient.routes";
import { userRouter } from "@presentation/http/routes/user.routes";
import { authMiddleware } from "@presentation/http/middlewares/auth.middleware";
import { exceptionMiddleware } from "@presentation/http/middlewares/exception.middleware";

export const app = express();

app.use(express.json());
app.use(userRouter);
app.get("/", (req: Request, res: Response) => {
  res.send("Hello, world!");
});
app.use(authMiddleware);
app.use(patientRouter);
app.use(exceptionMiddleware);
