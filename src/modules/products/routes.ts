import { Router } from "express";
import { ensureAdmin } from "../../middlewares/auth/ensureAdmin";
import { ensureAuthenticated } from "../../middlewares/auth/ensureAuthenticated";
import { CreateProductController } from "./controller/CreateProductController";

const productRouter = Router();

const createProductController = new CreateProductController();

productRouter.post(
    "/",
    ensureAuthenticated,
    ensureAdmin, 
    createProductController.handle
);

export { productRouter };
