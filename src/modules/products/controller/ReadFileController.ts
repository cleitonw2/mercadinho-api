import { Request, Response } from "express";
import { ReadFileService } from "../service/ReadFileService";


class ReadFileController {

    async handle(
        request: Request,
        response: Response
    ): Promise<Response> {

        const readFileServie = new ReadFileService();
        
        await readFileServie.execute(request.file);

        return response.status(201).json("ok");
    }
}

export { ReadFileController };