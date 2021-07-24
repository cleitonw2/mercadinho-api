import { Request, Response } from "express";
import { CreateUserDto } from "../dtos/CreateUser.dto";
import { CreateUserService } from "../services/CreateUserService";


class CreateUserController {
    async handle(
        request: Request,
        response: Response
    ): Promise<Response<object>> {

        const createUserDto: CreateUserDto = request.body;

        const userService = new CreateUserService();

        const user = await userService.execute(createUserDto);

        return response.status(201).json({ user });
    }
}

export { CreateUserController };