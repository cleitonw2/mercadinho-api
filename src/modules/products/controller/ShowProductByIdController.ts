import { Request, Response } from "express";
import { Product } from "../entities/Product";
import { ShowProductByIdService } from "../service/ShowProductByIdService";


class ShowProductByIdController {
    async handle(
        request: Request,
        response: Response
    ): Promise<Response<Product>> {

        const showProductByIdService = new ShowProductByIdService()

        const { id } = request.params
        const product = await showProductByIdService
            .execute(id);

        return response.json(product);
    }
}

export { ShowProductByIdController };