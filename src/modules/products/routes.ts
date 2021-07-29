import { Router } from "express";
import { ensureAdmin } from "../../middlewares/auth/ensureAdmin";
import { ensureAuthenticated } from "../../middlewares/auth/ensureAuthenticated";
import { CreateProductController } from "./controller/CreateProductController";
import { DeleteProductController } from "./controller/DeleteProductController";
import { ShowProductByIdController } from "./controller/ShowProductByIdController";
import { ShowProductsController } from "./controller/ShowProductsController";

const productRouter = Router();

const createProductController = new CreateProductController();
const showProductByIdController = new ShowProductByIdController();
const showProductsController = new ShowProductsController();
const deleteProductController = new DeleteProductController();

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

productRouter.delete(
    "/:id",
    ensureAuthenticated,
    ensureAdmin,
    deleteProductController.handle
);

export { productRouter };
