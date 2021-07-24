import { Request, Response } from "express";
import { CreateProductDto } from "../dtos/CreateProduct.dto";


class CreateProduct {
    async handle(
        request: Request,
        response: Response
    ): Promise<CreateProductDto> {
        return;
    }
}

export { CreateProduct };