import { Router } from "express";

import { CreateUserController } from "./controllers/CreateUserController";

const userRouter = Router();

const createUser = new CreateUserController();

userRouter.post(
    "/",
    createUser.handle
)

export { userRouter };