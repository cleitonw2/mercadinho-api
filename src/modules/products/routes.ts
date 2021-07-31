import { Router } from "express";
import multer from "multer";
import { ensureAdmin } from "../../middlewares/auth/ensureAdmin";
import { ensureAuthenticated } from "../../middlewares/auth/ensureAuthenticated";
import { CreateProductController } from "./controller/CreateProductController";
import { DeleteProductController } from "./controller/DeleteProductController";
import { ReadFileController } from "./controller/ReadFileController";
import { ShowProductByIdController } from "./controller/ShowProductByIdController";
import { ShowProductsController } from "./controller/ShowProductsController";
import { UpdateProductController } from "./controller/UpdateProductController";

const productRouter = Router();
const muletrConfig = multer();

const createProductController = new CreateProductController();
const showProductByIdController = new ShowProductByIdController();
const showProductsController = new ShowProductsController();
const deleteProductController = new DeleteProductController();
const readFileController = new ReadFileController();
const updateProductController = new UpdateProductController()

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

productRouter.post(
    "/file/csv",
    ensureAuthenticated,
    ensureAdmin,
    muletrConfig.single("file"),
    readFileController.handle
);

productRouter.put(
    "/:id",
    ensureAuthenticated,
    ensureAdmin,
    updateProductController.handle
);

export { productRouter };
