import { Request, Response } from "express";
import { Product } from "../entities/Product";
import { CheckExpirationDateService } from "../service/CheckExpirationDateService";


class CheckExpirationDateController {

    async handle(
        request: Request,
        response: Response
    ): Promise<Response<Product[]>> {

        const products = await new CheckExpirationDateService()
            .execute();

        return response.json(products);
    }
}

export { CheckExpirationDateController };