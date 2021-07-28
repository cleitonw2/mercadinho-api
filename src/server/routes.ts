import { Router } from "express";
import { productRouter } from "../modules/products/routes";
import { userRouter } from "../modules/users/routes";

const routes = Router();

routes.use("/v1/products", productRouter);

routes.use("/v1/users", userRouter);

export { routes };