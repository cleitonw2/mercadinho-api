import { Request, Response } from "express";
import { AuthenticateUserDto } from "../dtos/AuthenticateUser.dto";
import { User } from "../entities/User";
import { AuthenticateUserService } from "../services/AuthenticateUserService";


class AuthenticateUserController {
    async handle(
        request: Request,
        response: Response
    ): Promise<Response<User>> {

        const authenticateUserDto: AuthenticateUserDto = request.body;

        const authenticateUserService = new AuthenticateUserService();

        const user  = await authenticateUserService.execute(authenticateUserDto);

        return response.status(201).json({user});
    }
}

export { AuthenticateUserController }