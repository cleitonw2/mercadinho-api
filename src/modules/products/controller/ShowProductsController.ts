import { Request, Response } from "express";
import { Product } from "../entities/Product";
import { ShowProcutsService } from "../service/ShowProductsService";


class ShowProductsController {
    async handle(
        request: Request,
        response: Response
    ): Promise<Response<Product[]>> {

        const showProductsService = new ShowProcutsService();

        const products = await showProductsService.execute();

        return response.json(products);
    }
}

export { ShowProductsController };