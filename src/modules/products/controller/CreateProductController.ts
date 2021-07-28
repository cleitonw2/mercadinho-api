import { Request, Response } from "express";
import { CreateProductDto } from "../dtos/CreateProduct.dto";
import { CreateProductService } from "../service/CreateProductService";


class CreateProductController {
    async handle(
        request: Request,
        response: Response
    ): Promise<Response<CreateProductDto>> {

        const productData: CreateProductDto = request.body;

        const createProductService = new CreateProductService();

        const product = await createProductService
            .execute(productData);


        return response.status(201).json(product);
    }
}

export { CreateProductController };