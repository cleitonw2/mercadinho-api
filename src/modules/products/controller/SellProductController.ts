import { Request, Response } from "express";
import { SellProductService } from "../service/SellProductService";


class SellProductController {

    async handle(
        request: Request,
        response: Response
    ): Promise<Response> {

        const { id, quantitySold } = request.params;

        const sellProductService = new SellProductService();

        await sellProductService.execute(id, Number(quantitySold));

        return response.status(204).json();
    }
}

export { SellProductController };