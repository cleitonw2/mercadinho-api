import { Router } from "express";
import { AuthenticateUserController } from "./controllers/AuthenticateUserController";

import { CreateUserController } from "./controllers/CreateUserController";

const userRouter = Router();

const createUser = new CreateUserController();
const authenitcateUser = new AuthenticateUserController();

userRouter.post(
    "/",
    createUser.handle
);

userRouter.post(
    "/login",
    authenitcateUser.handle
)

export { userRouter };