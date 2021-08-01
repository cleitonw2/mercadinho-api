import { Request, Response } from "express";
import { CreateProductDto } from "../dtos/CreateProduct.dto";
import { UpdateProductService } from "../service/UpdateProductService";


class UpdateProductController {

    async handle(
        request: Request,
        response: Response
    ): Promise<Response> {

        const { id } = request.params;
        const productData: CreateProductDto = request.body;

        const updateProductService = new UpdateProductService();

        await updateProductService.execute(id, productData);
        
        return response.json();
    }
}

export { UpdateProductController };