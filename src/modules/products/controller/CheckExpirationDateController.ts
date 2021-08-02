import { Request, Response } from "express";
import { CheckExpirationDateService } from "../service/CheckExpirationDateService";


class CheckExpirationDateController {

    async handle(
        request: Request,
        response: Response
    ): Promise<Response<object | undefined>> {

        const message = await new CheckExpirationDateService()
            .execute();

        return response.json(message);
    }
}

export { CheckExpirationDateController };