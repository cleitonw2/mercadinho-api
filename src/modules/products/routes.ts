import { Router } from "express";
import { ensureAdmin } from "../../middlewares/auth/ensureAdmin";
import { ensureAuthenticated } from "../../middlewares/auth/ensureAuthenticated";
import { CreateProductController } from "./controller/CreateProductController";
import { ShowProductByIdController } from "./controller/ShowProductByIdController";
import { ShowProductsController } from "./controller/ShowProductsController";

const productRouter = Router();

const createProductController = new CreateProductController();
const showProductByIdController = new ShowProductByIdController();
const showProductsController = new ShowProductsController();

productRouter.post(
    "/",
    ensureAuthenticated,
    ensureAdmin, 
    createProductController.handle
);

productRouter.get(
    "/:id",
    ensureAuthenticated,
    showProductByIdController.handle
);


productRouter.get(
    "/",
    ensureAuthenticated,
    showProductsController.handle
);

export { productRouter };
