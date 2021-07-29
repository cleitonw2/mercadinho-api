import { Request, Response } from "express";
import { DeleteProductService } from "../service/DeleteProductService";


class DeleteProductController {

    async handle(
        request: Request,
        response: Response
    ): Promise<Response> {

        const { id } = request.params;

        const deleteProductService = new DeleteProductService();

        await deleteProductService.execute(id);
        
        return response.status(202).json();
    }
}

export { DeleteProductController };